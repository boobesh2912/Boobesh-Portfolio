# Setup guide

Everything you need to finish, in the order I would do it. Nothing here
needs code changes, only files and settings.

---

## 1. Drop in the images

Every image on the site is a slot. If the file is missing you see a dotted
box naming the file. Add the file, and it appears. No code change.

Put these in `public/shots/`:

| File | What it is |
| --- | --- |
| `boobesh.jpg` | Your photo, hero section. Square-ish or portrait works best. |
| `tribe-fortis.png` | Screenshot of tribefortis.com homepage |
| `ycs.png` | Screenshot of youtube.com/@yourcollegesenior |
| `proof.png` | Screenshot of proof.zeromaintenanceengineer.in |
| `teacher-rahul.jpg` | Rahul M, square |
| `teacher-hormozi.jpg` | Alex Hormozi, square |
| `teacher-ali.jpg` | Ali Abdaal, square |
| `teacher-surendar.jpg` | G Surendar Thina, square |
| `oh-my-kadavule.jpg` | Movie poster, portrait, personal page |
| `meme-1.jpg` | Any meme you like, personal page |

To take a website screenshot: open the site, press `Cmd/Ctrl + Shift + 4`
(Mac) or use Windows Snipping Tool, or just use a full page screenshot
browser extension.

I could not take these myself. The sandbox I run in blocks all outside
websites, so tribefortis.com, YouTube and Google were all unreachable from
my side.

---

## 2. Add the music (optional)

The personal page already plays music. It is a soft ambient pad I generate
in the browser, so it works with no file at all.

If you want the real Kadhaippoma instrumental instead, drop an mp3 at:

```
public/kadhaippoma-instrumental.mp3
```

The site checks for that file first and uses it if it is there. That is
your call to make, since it is a commercial track and putting it on a
public site is your decision, not mine.

---

## 3. Fill in the two blanks

Open `src/content/education.ts` and replace:

- `"Add your school name"`
- `"Add your college name"`

You never told me those, so I left them as visible placeholders rather
than inventing them.

---

## 4. Blog admin login

The `/admin` page lets you write and publish blog posts without touching
code. It needs four environment variables. None of them go in the code.

### Where to put them

Vercel dashboard → your project → **Settings** → **Environment
Variables** → add each one → **Redeploy**.

### What to add

**`ADMIN_USERNAME`**
Whatever you want to log in with.

**`ADMIN_PASSWORD`**
Your login password. Important: pick a **new** one. The password you sent
me in chat should be considered burned, it is sitting in a chat log now.

**`ADMIN_SESSION_SECRET`**
A long random string used to sign your login cookie. Generate one:

- Mac or Linux terminal: `openssl rand -hex 32`
- Or just mash 40+ random characters. It only has to be random and secret.

**`GITHUB_TOKEN`**
This is what lets the admin page save a new blog post into this repo.

How to create it:

1. Go to GitHub → click your avatar → **Settings**
2. Scroll down the left sidebar → **Developer settings**
3. **Personal access tokens** → **Fine-grained tokens** → **Generate new token**
4. Fill it in:
   - **Token name**: `boobesh-site-blog`
   - **Expiration**: 1 year
   - **Repository access**: Only select repositories → pick
     `boobesh2912/Boobesh-Portfolio`
   - **Permissions** → Repository permissions → find **Contents** → set to
     **Read and write**
5. **Generate token**, then copy it. GitHub shows it once only.
6. Paste it into Vercel as `GITHUB_TOKEN`.

Optional, only if you rename things later:
`GITHUB_OWNER` (default `boobesh2912`) and `GITHUB_REPO` (default
`Boobesh-Portfolio`).

### Then

Go to `boobesh.com/admin`, log in, write a post, hit publish. It commits a
markdown file to `content/blog/`, Vercel redeploys, and the post is live in
about a minute.

---

## 5. Custom domain

Vercel → project → Settings → Domains → add `boobesh.com`, then point your
domain's nameservers or A record wherever Vercel tells you to.

---

## Where things live

| What | File |
| --- | --- |
| Experience timeline | `src/content/experience.ts` |
| School, college, teachers | `src/content/education.ts` |
| Personal page story | `src/content/story.ts` |
| Speaking events | `src/content/speaking.ts` |
| Blog posts | `content/blog/*.md` |
| Colours | `src/app/globals.css` (top of file) |
