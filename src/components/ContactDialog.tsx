"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";

/*
  Lives in the root layout and opens on a window event, so any button
  anywhere can call openContact() without threading props through the page.
  Opening a mail client was the old behaviour and half of people do not have
  one wired up, so the note is posted to the server instead.
*/
export const CONTACT_EVENT = "boobesh:open-contact";

export function openContact() {
  window.dispatchEvent(new CustomEvent(CONTACT_EVENT));
}

type State = "idle" | "sending" | "sent" | "error";

export default function ContactDialog() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(CONTACT_EVENT, onOpen);
    return () => window.removeEventListener(CONTACT_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    // stop the page behind from scrolling under the dialog
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstField.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setState("sending");
    setError("");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        subject: form.get("subject"),
        message: form.get("message"),
        website: form.get("website"),
      }),
    });

    if (res.ok) {
      setState("sent");
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.4 },
        colors: ["#c0563a", "#d9a441", "#5e6b47", "#7c5a6b", "#c98b7a"],
      });
      return;
    }

    const data = await res.json().catch(() => ({ error: "something broke" }));
    setError(data.error || "something broke, try mailing me instead");
    setState("error");
  };

  const close = () => {
    setOpen(false);
    // reset only after the exit animation, so the panel does not flicker
    setTimeout(() => {
      setState("idle");
      setError("");
    }, 300);
  };

  const field =
    "mt-1 w-full rounded-xl border border-line bg-cream px-4 py-2.5 font-body text-[15px] text-ink outline-none transition-colors focus:border-coral";
  const label =
    "block font-body text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="say hi"
        >
          <div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={close}
          />

          <motion.div
            initial={{ y: 22, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 14, scale: 0.98 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-line bg-paper p-7 shadow-[0_24px_70px_rgba(23,20,15,0.28)] sm:p-9"
          >
            <button
              onClick={close}
              aria-label="close"
              className="absolute right-5 top-5 font-body text-sm text-ink-soft transition-colors hover:text-coral"
            >
              close
            </button>

            {state === "sent" ? (
              <div className="py-8 text-center">
                <p className="font-hand text-3xl text-coral-deep">
                  got it, thank you
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
                  It landed in my inbox.
                </h2>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-ink-soft">
                  I read everything myself and usually reply within a day or
                  two. If it is urgent, poke me on LinkedIn.
                </p>
                <button
                  onClick={close}
                  className="mt-7 rounded-full bg-ink px-6 py-3 font-body text-sm font-semibold text-cream"
                >
                  back to the site
                </button>
              </div>
            ) : (
              <>
                <p className="font-hand text-2xl text-coral-deep">say hi</p>
                <h2 className="mt-1 font-display text-2xl font-semibold leading-snug text-ink">
                  Tell me what you are building.
                </h2>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                  No form filling ritual. Four fields, then I read it.
                </p>

                <form onSubmit={submit} className="mt-6 space-y-4">
                  {/* honeypot, hidden from people and not from bots */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="pointer-events-none absolute h-0 w-0 opacity-0"
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={label} htmlFor="c-name">
                        your name
                      </label>
                      <input
                        ref={firstField}
                        id="c-name"
                        name="name"
                        required
                        maxLength={80}
                        className={field}
                      />
                    </div>
                    <div>
                      <label className={label} htmlFor="c-email">
                        email
                      </label>
                      <input
                        id="c-email"
                        name="email"
                        type="email"
                        required
                        maxLength={120}
                        className={field}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={label} htmlFor="c-subject">
                      what is this about
                    </label>
                    <input
                      id="c-subject"
                      name="subject"
                      maxLength={120}
                      placeholder="content, a website, or just saying hi"
                      className={field}
                    />
                  </div>

                  <div>
                    <label className={label} htmlFor="c-message">
                      the message
                    </label>
                    <textarea
                      id="c-message"
                      name="message"
                      required
                      rows={5}
                      maxLength={2000}
                      className={`${field} resize-y`}
                    />
                  </div>

                  {error && (
                    <p className="rounded-xl border border-coral/40 bg-coral/10 px-4 py-3 font-body text-sm text-coral-deep">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="w-full rounded-full bg-ink px-6 py-3.5 font-body text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {state === "sending" ? "sending..." : "send it"}
                  </button>

                  <p className="text-center font-body text-xs text-ink-soft">
                    or mail{" "}
                    <a
                      href="mailto:dreamsofboo@gmail.com"
                      className="underline hover:text-coral"
                    >
                      dreamsofboo@gmail.com
                    </a>{" "}
                    the old fashioned way
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
