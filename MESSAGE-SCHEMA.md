# Message schema

Required fields:

- `id` — unique ID without spaces;
- `date` — `YYYY-MM-DD`;
- `time` — `HH:MM`;
- `type` — `text`, `image`, `video`, or `audio`.

Optional fields:

- `text` — message text; emoji and line breaks are supported;
- `quote` — string or object with `label` and `text`;
- `media.src` — relative media path;
- `media.alt` — image alt text;
- `media.poster` — video poster image.

The final HTML anchor becomes `#msg-ID`.
