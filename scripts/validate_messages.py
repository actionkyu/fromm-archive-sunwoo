#!/usr/bin/env python3
from __future__ import annotations

import json
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / "data" / "messages.json"

ALLOWED_TYPES = {"text", "image", "video", "audio"}
MEDIA_TYPES = {"image", "video", "audio"}

def fail(message: str) -> None:
    print(f"ERROR: {message}")
    raise SystemExit(1)

def main() -> None:
    if not DATA_FILE.exists():
        fail("data/messages.json does not exist.")

    try:
        data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        fail(f"Invalid JSON: {exc}")

    if not isinstance(data, dict):
        fail("Root JSON value must be an object.")

    messages = data.get("messages")
    if not isinstance(messages, list):
        fail('"messages" must be an array.')

    ids: set[str] = set()
    errors: list[str] = []

    for index, message in enumerate(messages, start=1):
        prefix = f"Message #{index}"

        if not isinstance(message, dict):
            errors.append(f"{prefix}: must be an object.")
            continue

        msg_id = str(message.get("id", "")).strip()
        date = str(message.get("date", "")).strip()
        time = str(message.get("time", "")).strip()
        msg_type = str(message.get("type", "")).strip()

        if not msg_id:
            errors.append(f"{prefix}: missing id.")
        elif msg_id in ids:
            errors.append(f"{prefix}: duplicate id '{msg_id}'.")
        else:
            ids.add(msg_id)

        try:
            datetime.strptime(date, "%Y-%m-%d")
        except ValueError:
            errors.append(f"{prefix}: date must use YYYY-MM-DD.")

        try:
            datetime.strptime(time, "%H:%M")
        except ValueError:
            errors.append(f"{prefix}: time must use HH:MM.")

        if msg_type not in ALLOWED_TYPES:
            errors.append(f"{prefix}: unsupported type '{msg_type}'.")

        if msg_type in MEDIA_TYPES:
            media = message.get("media")
            if not isinstance(media, dict):
                errors.append(f"{prefix}: media object is required.")
            else:
                src = str(media.get("src", "")).strip()
                if not src:
                    errors.append(f"{prefix}: media.src is required.")
                else:
                    media_path = ROOT / src
                    if not media_path.exists():
                        errors.append(f"{prefix}: media file not found: {src}")

        quote = message.get("quote")
        if isinstance(quote, dict) and not str(quote.get("text", "")).strip():
            errors.append(f"{prefix}: quote.text cannot be empty.")

    if errors:
        print("\n".join(f"ERROR: {error}" for error in errors))
        raise SystemExit(1)

    print(f"OK: validated {len(messages)} messages.")
    print(f"OK: all IDs are unique.")
    print(f"OK: referenced media files exist.")

if __name__ == "__main__":
    main()
