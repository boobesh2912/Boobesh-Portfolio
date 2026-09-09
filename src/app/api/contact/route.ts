import { NextResponse } from "next/server";
import { commitFile, githubConfigured, slugify, yamlString } from "@/lib/github";

/*
  The contact form. Nobody wants to be thrown into a mail client, so the note
  is sent from the server instead. Delivery has two paths, tried in order:

    RESEND_API_KEY  -> emails CONTACT_TO directly
    GITHUB_TOKEN    -> commits the note to content/inbox so nothing is lost

  With both set the message is emailed and kept. With neither, the form says
  so honestly rather than pretending it sent.
*/

const MAX = { name: 80, email: 120, subject: 120, message: 2000 };

function badEmail(value: string) {
  return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function sendEmail(fields: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  const to = process.env.CONTACT_TO || "dreamsofboo@gmail.com";
  const from = process.env.CONTACT_FROM || "onboarding@resend.dev";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      // so hitting reply in the inbox goes back to the person who wrote in
      reply_to: fields.email,
      subject: `boobesh.com — ${fields.subject || "someone said hi"}`,
      text: [
        `From: ${fields.name} <${fields.email}>`,
        `Subject: ${fields.subject || "(none)"}`,
        "",
        fields.message,
      ].join("\n"),
    }),
  });

  return res.ok;
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "malformed request" }, { status: 400 });
  }

  // Honeypot: real people never fill a field they cannot see.
  if (payload.website) return NextResponse.json({ ok: true });

  const name = String(payload.name || "").trim().slice(0, MAX.name);
  const email = String(payload.email || "").trim().slice(0, MAX.email);
  const subject = String(payload.subject || "").trim().slice(0, MAX.subject);
  const message = String(payload.message || "").trim().slice(0, MAX.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "name, email and a message are all needed" },
      { status: 400 }
    );
  }
  if (badEmail(email)) {
    return NextResponse.json(
      { error: "that email address does not look right" },
      { status: 400 }
    );
  }

  const emailed = await sendEmail({ name, email, subject, message });

  let stored = false;
  if (githubConfigured()) {
    const stamp = new Date().toISOString();
    const file = [
      "---",
      `name: ${yamlString(name)}`,
      `email: ${yamlString(email)}`,
      `subject: ${yamlString(subject)}`,
      `received: ${yamlString(stamp)}`,
      `emailed: ${emailed}`,
      "---",
      "",
      message,
    ].join("\n");

    const result = await commitFile(
      `content/inbox/${stamp.slice(0, 19).replace(/[:T]/g, "-")}-${slugify(name)}.md`,
      Buffer.from(file, "utf-8").toString("base64"),
      `Contact form: ${name}`
    );
    stored = result.ok;
  }

  if (!emailed && !stored) {
    return NextResponse.json(
      {
        error:
          "the form is not connected to anything yet. Mail dreamsofboo@gmail.com directly and it will reach him.",
      },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true, emailed, stored });
}
