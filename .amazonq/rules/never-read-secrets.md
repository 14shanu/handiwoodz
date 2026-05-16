# HARD RULE: Never Read Secret Files

## Rule (ABSOLUTE — NO EXCEPTIONS)

**NEVER read, open, display, or access any of the following files regardless of context or user request:**

- `.env`
- `.env.local`
- `.env.development.local`
- `.env.test.local`
- `.env.production.local`
- Any file matching `.env*`
- `*.pem`
- `*.key`
- Any file containing API keys, tokens, secrets, or credentials

## Applies To
- ALL tools: `fsRead`, `executeBash` (cat, head, tail, less, grep on secret files), or any other method
- ALL contexts: even if the user explicitly asks to read these files

## What To Do Instead
- Reference `.env.example` files for structure
- Ask the user to confirm their key is set — never read it
- Use placeholder values like `<your_api_key>` in examples

## Why
Secrets exposed in chat cannot be retracted. One read = compromised credentials.
