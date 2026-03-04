# Google Indexing Checklist (Rubble Tech)

If your site does not appear on Google yet, this is usually an indexing setup issue, not a coding bug.

## 1) Set your real domain in SEO files

Before deploying, update:

- `robots.txt` → `Sitemap: https://YOUR-DOMAIN.com/sitemap.xml`
- `sitemap.xml` → `<loc>https://YOUR-DOMAIN.com/</loc>`

Use your real production domain (custom domain or your Netlify domain).

## 2) Deploy and verify these URLs are public

After deploy, open:

- `https://YOUR-DOMAIN.com/robots.txt`
- `https://YOUR-DOMAIN.com/sitemap.xml`

Both must load in a browser without authentication.

## 3) Submit site to Google Search Console

1. Open Google Search Console
2. Add your domain property
3. Verify ownership (DNS recommended)
4. Go to **Sitemaps** and submit:
   - `https://YOUR-DOMAIN.com/sitemap.xml`

## 4) Request indexing for homepage

In Search Console, use **URL Inspection** for:

- `https://YOUR-DOMAIN.com/`

Then click **Request Indexing**.

## 5) Improve chances to rank for "Rubble Tech"

- Keep website name consistent as "Rubble Tech" across homepage, metadata, and social profiles.
- Create/optimize a Google Business Profile if applicable.
- Add links to your site from LinkedIn, Instagram, Facebook, and any directories.
- Keep the site live and stable (no downtime).

## Notes

- New sites can take days to a few weeks to appear.
- For a brand query like "rubble tech", strong brand consistency and Search Console submission usually helps quickly.
