import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

// Put your photo in /public with one of these names. The first one found is used.
const CANDIDATES = ["joshua.jpg", "joshua.jpeg", "joshua.png", "joshua.webp"];
const photo = CANDIDATES.find((f) => existsSync(path.join(process.cwd(), "public", f)));

type Props = { name: string; status: string };

export default function Portrait({ name, status }: Props) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <figure className="portrait">
      <div className="portrait-frame">
        {photo ? (
          <Image
            src={`/${photo}`}
            alt={`Portrait of ${name}`}
            fill
            priority
            sizes="(max-width: 900px) 70vw, 340px"
            className="portrait-img"
          />
        ) : (
          <div className="portrait-empty" aria-label="Photo placeholder">
            <span>{initials}</span>
            <small>add public/joshua.jpg</small>
          </div>
        )}
        <span className="corner tl" aria-hidden="true" />
        <span className="corner tr" aria-hidden="true" />
        <span className="corner bl" aria-hidden="true" />
        <span className="corner br" aria-hidden="true" />
        <span className="portrait-status">
          <i aria-hidden="true" /> {status}
        </span>
      </div>
    </figure>
  );
}
