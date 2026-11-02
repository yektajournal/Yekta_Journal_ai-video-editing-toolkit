# Publishing notes (GitHub + GitHub Pages)

The guide is `README.md`. Its previews live in `docs/previews/`.

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

## 3. Share it
The README is the main page: share https://github.com/yektajournal/Yekta_Journal_ai-video-editing-toolkit

GitHub Pages is not used. The optional site in `docs/` stays in the repo but is not published.

## Preview locally
```bash
cd ~/Desktop/ai-video-editing-toolkit/docs
python3 -m http.server 8000
```
Then open http://localhost:8000
