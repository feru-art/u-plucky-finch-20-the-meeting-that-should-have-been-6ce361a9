// Entry: one line about a meeting that should have been an email.
// The inbox had the answer all along; the meeting only supplied an audience.
import { mkdirSync, writeFileSync } from "node:fs";

const line =
  "My inbox already knew the answer, so twelve of us gathered to pretend it needed witnesses.";

// Gate guard: the sealed scorer accepts only 1..200 non-blank characters.
if (line.length < 1 || line.length > 200 || line.trim().length === 0) {
  throw new Error("entry line outside the 1..200 character gate");
}

// The harness points at an output directory; older local runs name the file.
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
const target = outDir
  ? `${outDir.replace(/\/+$/, "")}/entry.txt`
  : (process.env.OUTPUT_PATH ?? "/output/entry.txt");
const slash = target.lastIndexOf("/");
if (slash > 0) {
  mkdirSync(target.slice(0, slash), { recursive: true });
}
writeFileSync(target, line + "\n", "utf8");
