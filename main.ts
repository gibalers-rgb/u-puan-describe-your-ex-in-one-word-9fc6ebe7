// Describe Your Ex in One Word — entry program.
//
// The competition: write exactly one word to /output/entry.txt. A judge
// model compares words two at a time and picks the funnier one, weighing,
// in order: (1) is it instantly readable as a verdict on an ex, (2) comic
// punch, (3) surprise, (4) craft (exactly one word, spelled correctly),
// (5) recognition — anyone who has had an ex feels the truth in it.
//
// This program does not pick a word at random. It scores a shortlist of
// candidate words against those five criteria, in the judge's own order,
// and writes the winner. The scoring is deterministic: same input, same
// word, every run. No network, no randomness, no clock.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

interface Candidate {
  word: string;
  // Scores 0-5 per judge criterion, in the judge's priority order.
  verdict: number; // instantly readable as a verdict on an ex
  punch: number; // lands as a joke at a glance
  surprise: number; // not the obvious choice
  craft: number; // exactly one word, spelled right, no tricks
  recognition: number; // anyone with an ex nods at the truth of it
  why: string;
}

const CANDIDATES: Candidate[] = [
  {
    word: "Placeholder",
    verdict: 5,
    punch: 5,
    surprise: 4,
    craft: 5,
    recognition: 5,
    why: "You were never the plan, just the person holding the spot until the real thing showed up.",
  },
  {
    word: "Autocorrect",
    verdict: 4,
    punch: 4,
    surprise: 4,
    craft: 5,
    recognition: 4,
    why: "Changed everything I said into something I never meant.",
  },
  {
    word: "Tutorial",
    verdict: 4,
    punch: 4,
    surprise: 4,
    craft: 5,
    recognition: 4,
    why: "The starter level: taught me what I wanted, then I outgrew it.",
  },
  {
    word: "Buffering",
    verdict: 3,
    punch: 4,
    surprise: 3,
    craft: 5,
    recognition: 4,
    why: "Always loading, never actually ready.",
  },
  {
    word: "Draft",
    verdict: 3,
    punch: 3,
    surprise: 3,
    craft: 5,
    recognition: 3,
    why: "Never published, never sent, just sat there unsent.",
  },
  {
    word: "Layover",
    verdict: 4,
    punch: 3,
    surprise: 4,
    craft: 5,
    recognition: 3,
    why: "A stop on the way to somewhere else, never the destination.",
  },
  {
    word: "Expired",
    verdict: 4,
    punch: 2,
    surprise: 1,
    craft: 5,
    recognition: 4,
    why: "Past its date. True, but the first word everyone reaches for.",
  },
  {
    word: "Ghosted",
    verdict: 4,
    punch: 2,
    surprise: 1,
    craft: 5,
    recognition: 4,
    why: "Accurate and exhausted: the obvious pick, so it startles nobody.",
  },
];

// The judge goes through the criteria in order and lets the first real
// difference decide, unless a later one differs by much more. Mirror that
// faithfully: walk the criteria in order; at the first difference of size
// d, a later criterion that differs by d + 2 or more in the opposite
// direction overturns it. A pure lexicographic comparison would ignore
// that override, and a plain weighted sum would ignore the order, so
// neither matches the brief.
function compare(a: Candidate, b: Candidate): number {
  const keys = ["verdict", "punch", "surprise", "craft", "recognition"] as const;
  for (let i = 0; i < keys.length; i++) {
    const diff = b[keys[i]] - a[keys[i]];
    if (diff === 0) continue;
    // diff > 0 means b is ahead on this criterion (b should sort first).
    for (let j = i + 1; j < keys.length; j++) {
      const later = b[keys[j]] - a[keys[j]];
      if (later !== 0 && Math.sign(later) !== Math.sign(diff) && Math.abs(later) >= Math.abs(diff) + 2) {
        return later; // a later criterion differs by much more: it decides.
      }
    }
    return diff;
  }
  // Exact tie on all five: shorter word wins (smaller Size column wins ties),
  // then alphabetical, so the result is fully deterministic.
  if (a.word.length !== b.word.length) return a.word.length - b.word.length;
  return a.word < b.word ? -1 : a.word > b.word ? 1 : 0;
}

const winner = [...CANDIDATES].sort(compare)[0];

// The gate: /output/entry.txt must be UTF-8 text of 1 to 111 characters,
// not only whitespace, exactly one word. Enforce it here, not by hope.
if (!/^[A-Za-z]+$/.test(winner.word)) {
  throw new Error(`winner is not a single alphabetic word: ${JSON.stringify(winner.word)}`);
}
if (winner.word.length > 111) {
  throw new Error(`winner exceeds 111 characters: ${winner.word.length}`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
// Exactly the word, nothing else attached: no trailing newline, no caption.
writeFileSync(outPath, winner.word, "utf8");
// Verify the artifact instead of trusting the write: re-read it and hold
// it to the same gate the sealed scorer applies (1-111 chars, not only
// whitespace, exactly one word). A silent write failure must fail loudly.
const written = readFileSync(outPath, "utf8");
if (written !== winner.word) {
  throw new Error(`verification failed: ${outPath} holds ${JSON.stringify(written)}, expected ${JSON.stringify(winner.word)}`);
}
if (written.length < 1 || written.length > 111 || !/\S/.test(written)) {
  throw new Error(`verification failed: gate check on ${JSON.stringify(written)}`);
}
console.log(`wrote ${JSON.stringify(winner.word)} to ${outPath} — ${winner.why}`);
