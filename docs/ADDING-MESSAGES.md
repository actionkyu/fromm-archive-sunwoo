# Adding messages

The only file you normally edit is:

```text
data/messages.json
```

## Text

```json
{
  "id": "20260803-011",
  "date": "2026-08-03",
  "time": "16:02",
  "type": "text",
  "text": "새 메시지 💙"
}
```

## Reply to a fan

```json
{
  "id": "20260803-012",
  "date": "2026-08-03",
  "time": "16:05",
  "type": "text",
  "quote": {
    "label": "Replying to a fan",
    "text": "팬 메시지"
  },
  "text": "답장"
}
```

## Photo

```json
{
  "id": "20260803-013",
  "date": "2026-08-03",
  "time": "16:07",
  "type": "image",
  "text": "사진",
  "media": {
    "src": "media/photos/2026-08-03/photo-001.jpg",
    "alt": "Short description"
  }
}
```

## Video

```json
{
  "id": "20260803-014",
  "date": "2026-08-03",
  "time": "16:09",
  "type": "video",
  "text": "영상",
  "media": {
    "src": "media/videos/2026-08-03/video-001.mp4",
    "poster": "media/photos/2026-08-03/video-001-poster.jpg"
  }
}
```

## Audio

```json
{
  "id": "20260803-015",
  "date": "2026-08-03",
  "time": "16:11",
  "type": "audio",
  "text": "음성 메시지",
  "media": {
    "src": "media/audio/2026-08-03/voice-001.m4a"
  }
}
```

## Rules

- Every `id` must be unique.
- Use `YYYY-MM-DD` for dates.
- Use `HH:MM` for time.
- Keep all files inside the repository.
- Emoji and line breaks work normally.
- Run `python scripts/validate_messages.py` before publishing.
