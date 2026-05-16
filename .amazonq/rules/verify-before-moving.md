# HARD RULE: Always Verify Before Moving Forward

## Rule (ABSOLUTE — NO EXCEPTIONS)

**NEVER move to the next step without verifying and testing the current step first.**

## Process (Every Step)
1. **Write code** for the current step
2. **Verify** — run the code, import it, or execute tests to confirm it works
3. **Fix** — if anything fails, fix it before proceeding
4. **Confirm** — show proof that it works (output, test pass, no errors)
5. **Only then** — move to the next step

## What Counts as Verification
- Models: Import all models, confirm no errors, confirm tables registered
- API routes: Start the server, hit endpoints, confirm responses
- AI pipeline: Run each step with real input, confirm output shape
- Frontend: Run dev server, confirm pages render without errors
- Integration: End-to-end test of the full flow

## What Does NOT Count
- "It should work" — not acceptable
- "The code looks correct" — not acceptable
- Only writing code without running it — not acceptable

## Why
Untested code compounds errors. One broken step breaks everything downstream. Verify early = fix cheap.
