# GitHub Pages deployment

## Option A: GitHub Actions

This repository includes:

```text
.github/workflows/pages.yml
```

1. Create a new GitHub repository.
2. Upload all files from this folder.
3. Push to the `main` branch.
4. In **Settings → Pages**, choose **GitHub Actions** as the source.
5. The workflow validates `messages.json` and deploys the site.

## Option B: Deploy from branch

1. Open **Settings → Pages**.
2. Choose **Deploy from a branch**.
3. Select `main` and `/ (root)`.
4. Save.

## Repository paths

All paths are relative, so the archive works both on a user site and on a
project site such as:

```text
username.github.io/repository-name/
```

## Custom domain

Add a `CNAME` file to the repository root containing only your domain:

```text
archive.example.com
```
