// One Line to Your Younger Self — make.fun bounty entry.
//
// Writes a single line — the one line the writer would send back to
// their younger self — to /output/entry.txt (UTF-8, one line, 1-200 chars).
// No trailing newline: the gate counts characters, and the file must hold
// exactly the line, byte for byte. Run: node main.ts (Node 22.18+).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "Don't sell the comic books to impress her — she leaves anyway, and at forty you'll rebuy every issue at ten times the price.";

const OUT = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

function main(): void {
  const chars = [...LINE].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`line is ${chars} characters, must be 1-200`);
  }
  if (LINE.trim() !== LINE || /\n/.test(LINE)) {
    throw new Error("line must be a single non-blank line");
  }
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, LINE, "utf8");
  const back = readFileSync(OUT, "utf8");
  if (back !== LINE) throw new Error("read-back mismatch");
  if (back.endsWith("\n")) throw new Error("unexpected trailing newline");
  console.log(`wrote ${chars} characters (${Buffer.byteLength(back, "utf8")} bytes) to ${OUT}`);
}

main();
