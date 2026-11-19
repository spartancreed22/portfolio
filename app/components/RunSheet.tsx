"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Status = "OK" | "NOT FOUND" | "ERROR";
type Row = { id: number; code: string; status: Status; detail: string };

// Demo numbers: this is an illustration, not real production data.
const TOTAL = 1200;
const FOUND = 1104;
const VISIBLE_ROWS = 5;

const DETAILS: Record<Status, string[]> = {
  OK: ["value read from PDF preview", "ID matches PDF", "found on page 2"],
  "NOT FOUND": ["no document in the portal", "not listed by the portal"],
  ERROR: ["portal timeout · retried"],
};

// What the log looks like once the run ends: mostly green, but the misses stay visible with their reason.
const FINAL_ROWS: Row[] = [
  { id: -1, code: "B71C", status: "OK", detail: "ID matches PDF" },
  { id: -2, code: "5E0A", status: "NOT FOUND", detail: "no document in the portal" },
  { id: -3, code: "C3D9", status: "OK", detail: "value read from PDF preview" },
  { id: -4, code: "9F42", status: "ERROR", detail: "portal timeout · retried" },
  { id: -5, code: "2AE6", status: "OK", detail: "found on page 2" },
];

function makeRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

const chipClass = (s: Status) => (s === "OK" ? "chip-ok" : s === "ERROR" ? "chip-er" : "chip-nf");

export default function RunSheet() {
  const rng = useRef(makeRng(11));
  const nextId = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const makeRow = (): Row => {
    const r = rng.current();
    const status: Status = r < 0.88 ? "OK" : r < 0.97 ? "NOT FOUND" : "ERROR";
    const options = DETAILS[status];
    const code = Math.floor(4096 + rng.current() * 61439)
      .toString(16)
      .toUpperCase()
      .padStart(4, "0");
    return { id: nextId.current++, code, status, detail: options[Math.floor(rng.current() * options.length)] };
  };

  const [rows, setRows] = useState<Row[]>(() => Array.from({ length: VISIBLE_ROWS }, makeRow));
  const [done, setDone] = useState(0);

  const run = useCallback(() => {
    clearTimeout(timer.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(TOTAL);
      setRows(FINAL_ROWS);
      return;
    }
    let current = 0;
    setDone(0);
    const tick = () => {
      current = Math.min(TOTAL, current + Math.ceil(TOTAL / 60));
      setDone(current);
      if (current < TOTAL) {
        setRows((prev) => [makeRow(), ...prev].slice(0, VISIBLE_ROWS));
        timer.current = setTimeout(tick, 90);
      } else {
        setRows(FINAL_ROWS);
      }
    };
    timer.current = setTimeout(tick, 400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    run();
    return () => clearTimeout(timer.current);
  }, [run]);

  const finished = done >= TOTAL;

  return (
    <figure className="sheet" aria-label="Illustration of an automation run log">
      <div className="sheet-bar">
        <span className={`sheet-dot${finished ? " is-done" : ""}`} />
        <span>records_lookup · demo run</span>
        {finished ? (
          <button type="button" className="sheet-replay" onClick={run}>
            ↻ replay
          </button>
        ) : (
          <span className="sheet-state">running</span>
        )}
      </div>
      <div className="sheet-count">
        <div className="sheet-big">
          {(finished ? FOUND : done).toLocaleString("en-US")}
          <small> / {TOTAL.toLocaleString("en-US")}</small>
        </div>
        <div className="sheet-meter" aria-hidden="true">
          <i style={{ width: `${(done / TOTAL) * 100}%` }} />
        </div>
        <p className="sheet-sub">
          {finished
            ? "Done. Every miss has a reason in the log."
            : "Looking up records on a third-party portal…"}
        </p>
      </div>
      <div className="sheet-rows" role="table" aria-label="Last processed rows">
        {rows.map((row) => (
          <div className="sheet-row" role="row" key={row.id}>
            <span role="cell">{row.code}</span>
            <span role="cell" className={`chip ${chipClass(row.status)}`}>
              {row.status}
            </span>
            <span role="cell" className="sheet-detail">
              {row.detail}
            </span>
          </div>
        ))}
      </div>
      <figcaption className="sheet-note">Illustration with made-up numbers and codes. No real data is shown.</figcaption>
    </figure>
  );
}
