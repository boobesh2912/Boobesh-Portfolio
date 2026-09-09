/*
  One place that knows how to write a file into the repo. Everything the admin
  desk publishes goes through here, so the token handling and the error shape
  are the same whether it is a blog post, an event or an uploaded image.
*/

type CommitResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

function config() {
  return {
    token: process.env.GITHUB_TOKEN,
    owner: process.env.GITHUB_OWNER || "boobesh2912",
    repo: process.env.GITHUB_REPO || "Boobesh-Portfolio",
    branch: process.env.GITHUB_BRANCH || "main",
  };
}

export function githubConfigured() {
  return Boolean(process.env.GITHUB_TOKEN);
}

/** Existing file sha, or undefined when the path is new. */
async function currentSha(
  filePath: string
): Promise<string | undefined> {
  const { token, owner, repo, branch } = config();
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    }
  );
  if (!res.ok) return undefined;
  const json = (await res.json()) as { sha?: string };
  return json.sha;
}

/** Writes base64 content to filePath, creating or updating it. */
export async function commitFile(
  filePath: string,
  base64Content: string,
  message: string
): Promise<CommitResult> {
  const { token, owner, repo, branch } = config();

  if (!token) {
    return {
      ok: false,
      status: 501,
      error:
        "GITHUB_TOKEN is not set on the server, so publishing is switched off. Add it in the deployment environment.",
    };
  }

  // Updating an existing path needs its sha, creating one must not send it.
  const sha = await currentSha(filePath);

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        message,
        content: base64Content,
        branch,
        ...(sha ? { sha } : {}),
      }),
    }
  );

  if (!res.ok) {
    return { ok: false, status: 502, error: `GitHub API: ${await res.text()}` };
  }
  return { ok: true };
}

export function slugify(title: string) {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 70) || "untitled"
  );
}

/** Frontmatter value escaping, so a quote in a title cannot break the file. */
export function yamlString(value: string) {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}
