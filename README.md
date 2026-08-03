# Sunwoo Fromm Archive

A complete, static, mobile-first Fromm-style archive designed for GitHub Pages.

This is the final release package combining all six parts.

## Features

- dark Fromm-inspired interface;
- rounded chat bubbles with avatar, sender name and timestamp;
- highlighted fan-message replies;
- text and emoji support;
- photos, videos and voice messages inside chat bubbles;
- full-text search with phrase highlighting;
- filtering by year, month and exact date;
- working Previous day and Next day navigation;
- separate photo/video gallery;
- separate audio gallery;
- full-screen media lightbox;
- in-browser video and audio playback;
- monthly and total archive statistics;
- Random Message;
- monthly message counter;
- Deep Links;
- Copy Link;
- Sticky Date;
- Back to Top;
- image Lazy Loading;
- progressive loading for large archives;
- responsive phone and desktop layouts;
- automated JSON validation;
- optional GitHub Pages deployment workflow.

## Quick start

Run locally:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

Do not open `index.html` directly, because browsers may block loading
`data/messages.json` from a local file URL.

## The only file you normally edit

```text
data/messages.json
```

Add media files to:

```text
media/photos/
media/videos/
media/audio/
```

See:

- `docs/ADDING-MESSAGES.md`
- `MESSAGE-SCHEMA.md`

## Replace the avatar

Update:

```json
"profile": {
  "displayName": "SUNWOO",
  "avatar": "assets/avatar/your-avatar.jpg"
}
```

inside `data/messages.json`.

## Validate before publishing

```bash
python scripts/validate_messages.py
```

The validator checks:

- valid JSON;
- unique message IDs;
- valid dates and times;
- supported message types;
- required media fields;
- whether referenced media files exist.

## Optional command-line helper

Example:

```bash
python scripts/add_message.py   --id 20260803-016   --date 2026-08-03   --time 16:20   --type text   --text "새 메시지 💙"
```

You can still edit JSON manually.

## GitHub Pages

A ready workflow is included:

```text
.github/workflows/pages.yml
```

Detailed instructions:

```text
docs/GITHUB-PAGES.md
```

## Configuration

Optional performance settings are in:

```text
data/config.json
```

```json
{
  "archive": {
    "progressiveDays": 30,
    "progressiveStep": 30
  }
}
```

## Important publishing note

This is a fan-made technical template. Before making the archive public, review
the platform's terms, copyright considerations, the artist's privacy, and your
own policy for distributing subscriber-only content.

## Project pages

- Main archive: `index.html`
- Media gallery: `pages/media.html`
- Audio gallery: `pages/audio.html`
- Statistics: `pages/statistics.html`
- About: `pages/about.html`

## License

The source code is provided under the MIT License. Media, artist images,
messages and third-party trademarks are not covered by that software license.
