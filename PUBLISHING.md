# Publishing notes (GitHub + GitHub Pages)

The website lives in `docs/` (plain HTML/CSS/JS, no build step). `docs/.nojekyll` tells GitHub Pages to serve the files as they are.

## 1. Create the repository
1. Go to https://github.com/new
2. Repository name: `Yekta_Journal_ai-video-editing-toolkit`
3. Visibility: **Public** (free GitHub Pages needs a public repo)
4. Do **not** add a README, .gitignore or license (they already exist here)
5. Click **Create repository**

## 2. Push this folder
```bash
cd ~/Desktop/ai-video-editing-toolkit
git remote add origin https://github.com/yektajournal/Yekta_Journal_ai-video-editing-toolkit.git
git push -u origin main
```

GitHub will ask you to sign in in the browser the first time.

## 3. Turn on GitHub Pages
1. On the repo page: **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main`, folder: `/docs` → **Save**
4. After a minute or two the site is live at https://yektajournal.github.io/Yekta_Journal_ai-video-editing-toolkit/

## 4. After it's live
- Optional: in the repo's **About** box (gear icon), paste the Pages URL as the website.

## Preview locally
```bash
cd ~/Desktop/ai-video-editing-toolkit/docs
python3 -m http.server 8000
```
Then open http://localhost:8000
