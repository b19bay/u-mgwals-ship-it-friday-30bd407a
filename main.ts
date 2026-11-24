import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "ship: merged my own PR and approved it myself, it's Friday and I'm efficient";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 159) {
  console.error(`line must be 1-159 characters, got ${LINE.length}`);
  process.exit(1);
}
const byteLen = Buffer.byteLength(LINE, "utf8");
if (byteLen > 159) {
  console.error(`line must be at most 159 bytes, got ${byteLen}`);
  process.exit(1);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  console.error("line must be a single non-blank line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");
const back = readFileSync(target, "utf8");
if (back !== LINE) {
  console.error("read-back mismatch");
  process.exit(1);
}
