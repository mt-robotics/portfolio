# Milestones — Portfolio Site (monireach.com)

| Milestone | Completed | Tests |
|-----------|-----------|-------|
| Site built and deployed | 2026-03-03 | — |
| Domain DNS configured | 2026-03-03 | — |
| GitHub Pages + Cloudflare TLS Setup & Fix | 2026-06-18 | — |
| Favicon replaced | 2026-06-18 | — |

---

## ✅ Site built and deployed (2026-03-03)

**Why this task existed:** Needed a personal portfolio site to replace the Google Sites page. Static HTML/CSS with dark glassmorphism theme covering Hero, About, Projects, Skills, Services, and Contact sections.

- ✅ `index.html` — single-page portfolio with all sections
- ✅ `style.css` — dark glassmorphism theme
- ✅ `cv/Monireach_Tang_CV.html` — printable CV
- ✅ `.github/workflows/` — GitHub Actions deploy to GitHub Pages on push to `main`

**Final state:** Site deployed and serving from GitHub Pages.

---

## ✅ Domain DNS configured (2026-03-03)

**Why this task existed:** Custom domain `monireach.com` needed to point to GitHub Pages instead of Google Sites. Cloudflare manages DNS.

- ✅ `CNAME` file in repo root: `monireach.com`
- ✅ Cloudflare DNS: 4 A records → GitHub Pages IPs (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`)

**Final state:** Domain resolving to GitHub Pages.

---

## ✅ GitHub Pages + Cloudflare TLS Setup & Fix (2026-06-18)

**Why this task existed:** After migrating the portfolio site from Google Sites to GitHub Pages and pushing to `main`, visitors saw a Cloudflare 526 "Invalid SSL certificate" error on `https://monireach.com`. HTTP (port 80) worked — traffic reached GitHub Pages and returned content — but HTTPS failed because the TLS handshake between Cloudflare's edge and GitHub's origin could not complete.

**Non-obvious problem — orange cloud blocks ACME HTTP-01 challenge:** GitHub Pages provisions TLS certificates via Let's Encrypt's HTTP-01 challenge: it places a file at `http://monireach.com/.well-known/acme-challenge/...` and Let's Encrypt fetches it to verify domain ownership. But when Cloudflare's orange cloud (proxy) is enabled, Cloudflare intercepts every HTTP request — the challenge file never reaches GitHub's server. GitHub retries, fails silently, and never issues a certificate. Without a valid origin cert, Cloudflare's SSL mode Full (Strict) rejects the second TLS leg and returns 526.

**Non-obvious decision — temporary gray cloud vs. Flexible SSL mode:** Two ways to create a window for the ACME challenge: (1) gray-cloud the DNS records so Cloudflare stops proxying, or (2) set SSL mode to Flexible so Cloudflare connects to the origin over plain HTTP. Gray cloud is simpler and leaves no security gap — DNS-only mode means GitHub's Let's Encrypt cert handles all TLS directly. Flexible mode keeps the proxy but downgrades the origin leg to HTTP, risking plaintext traffic between Cloudflare and GitHub. Chose gray cloud: one-step, no security downgrade, and cert provisioning is a one-time event.

- ✅ Cloudflare DNS: changed 4 A records from orange cloud (proxy) to gray cloud (DNS only), confirmed they resolve to GitHub Pages IPs (`185.199.108.153`, etc.)
- ✅ GitHub Pages: waited for TLS certificate to provision (refreshed Settings → Pages until "TLS certificate is being provisioned" disappeared)
- ✅ Verified HTTPS working directly (gray cloud → GitHub's cert, `server: GitHub.com` header)
- ✅ Cloudflare DNS: re-enabled orange cloud on all 4 A records; set SSL/TLS encryption mode to Full (Strict)
- ✅ Verified end-to-end: `curl -sI https://monireach.com` returns 200, Cloudflare edge cert on browser→CF leg, GitHub's Let's Encrypt cert on CF→origin leg

**Final state:** Site live, HTTPS working, both Cloudflare proxy and GitHub Pages TLS operational. Renewal is automatic via Let's Encrypt (GitHub auto-renews ~30 days before expiry). If 526 recurs, the same root cause applies: ACME challenge blocked. Diagnose by checking whether Cloudflare is intercepting `.well-known/acme-challenge/` — temporarily gray-cloud to re-provision.

---

## ✅ Favicon replaced (2026-06-18)

**Why this task existed:** After migrating from Google Sites, the browser still showed Google Sites' favicon. No favicon was defined in the portfolio's HTML, so the browser fell back to the cached old one.

- ✅ `favicon.svg` — "MT" ligature in purple-to-blue gradient (`#7c6ff7` → `#5eadf7`) on dark background (`#07070f`), matching site's `--accent` and `--bg` theme variables
- ✅ `index.html` — added `<link rel="icon" type="image/svg+xml" href="favicon.svg">`

**Final state:** Favicon serving from GitHub Pages. Cloudflare cache may still hold the old Google Sites favicon for some visitors — purge `monireach.com/favicon.svg` in Cloudflare if needed.
