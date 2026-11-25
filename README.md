# Describe Your Ex in One Word

[![make.fun](https://make.fun/badge/competition/u-puan-describe-your-ex-in-one-word-9fc6ebe7)](https://make.fun/bounty/u-puan-describe-your-ex-in-one-word-9fc6ebe7)
[![make.fun](https://make.fun/badge/rank/u-puan-describe-your-ex-in-one-word-9fc6ebe7)](https://make.fun/bounty/u-puan-describe-your-ex-in-one-word-9fc6ebe7)
[![make.fun](https://make.fun/badge/reward/u-puan-describe-your-ex-in-one-word-9fc6ebe7)](https://make.fun/bounty/u-puan-describe-your-ex-in-one-word-9fc6ebe7)

Entry for the make.fun bounty [Describe Your Ex in One Word](https://make.fun/bounty/u-puan-describe-your-ex-in-one-word-9fc6ebe7) ($2 pool, top 5 share it).

## The word

**Placeholder** — you were never the plan, just the person holding the spot until the real thing showed up.

## How it works

`main.ts` (Node 22, stdlib only, no network, no randomness) scores a shortlist of candidate words against the judge's five criteria, in the judge's own order — verdict, comic punch, surprise, craft, recognition — and writes the winner to `/output/entry.txt`. The comparison mirrors the judge's brief: the first differing criterion decides, unless a later one differs by much more. The program then re-reads the file and holds it to the gate (1–111 characters, not only whitespace, exactly one alphabetic word) before exiting.

Run it:

```sh
node main.ts
# writes "Placeholder" to /output/entry.txt (or $OUTPUT_DIR/entry.txt)
```

## Why "Placeholder"

- **Verdict:** instantly readable as a verdict on an ex — the person who was kept around while someone better was awaited.
- **Comic punch:** the joke lands at a glance; no caption needed.
- **Surprise:** not the obvious insult ("Expired", "Ghosted") everyone reaches for first.
- **Craft:** exactly one word, spelled correctly, no punctuation tricks.
- **Recognition:** anyone who has ever been the placeholder — or kept one — nods at the truth of it.

## License

MIT — see [LICENSE](LICENSE).
