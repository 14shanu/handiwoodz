---
inclusion: always
---

# Never Read Secret Files

## Rule (ABSOLUTE — NO EXCEPTIONS)

NEVER read, open, display, or access any of the following files:

- `.env`, `.env.local`, `.env.development.local`, `.env.test.local`, `.env.production.local`
- Any file matching `.env*`
- `*.pem`, `*.key`
- Any file containing API keys, tokens, secrets, or credentials

## What To Do Instead
- Reference `.env.example` files for structure
- Ask the user to confirm their key is set — never read it
- Use placeholder values like `<your_api_key>` in examples
