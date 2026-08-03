#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / "data" / "messages.json"

def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Append a message to data/messages.json")
    parser.add_argument("--id", required=True)
    parser.add_argument("--date", required=True, help="YYYY-MM-DD")
    parser.add_argument("--time", required=True, help="HH:MM")
    parser.add_argument("--type", choices=["text", "image", "video", "audio"], default="text")
    parser.add_argument("--text", default="")
    parser.add_argument("--quote", default="")
    parser.add_argument("--media", default="")
    parser.add_argument("--alt", default="")
    parser.add_argument("--poster", default="")
    return parser.parse_args()

def main() -> None:
    args = parse_args()
    data = json.loads(DATA_FILE.read_text(encoding="utf-8"))

    message = {
        "id": args.id,
        "date": args.date,
        "time": args.time,
        "type": args.type,
    }

    if args.text:
        message["text"] = args.text

    if args.quote:
        message["quote"] = {
            "label": "Replying to a fan",
            "text": args.quote,
        }

    if args.type != "text":
        if not args.media:
            raise SystemExit("--media is required for image, video and audio messages.")
        message["media"] = {"src": args.media}
        if args.alt:
            message["media"]["alt"] = args.alt
        if args.poster:
            message["media"]["poster"] = args.poster

    data["messages"].append(message)
    DATA_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Added message {args.id}")

if __name__ == "__main__":
    main()
