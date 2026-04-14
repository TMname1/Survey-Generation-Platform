# PROJECT KNOWLEDGE BASE

**Generated:** 2026-04-14
**Commit:** ee17304
**Branch:** main

## OVERVIEW

Frontend Vue 3 SPA built with Vite, TypeScript, Pinia, Vue Router, Tailwind CSS, and Element Plus.

## STRUCTURE

```
./
├── src/           # Application source code
│   ├── assets/    # Static assets (base.css)
│   ├── components/ # Reusable UI components
│   ├── router/    # Vue Router configuration
│   ├── stores/    # Pinia state stores
│   └── views/     # Route components (lazy-loaded)
├── .husky/        # Git hooks (non-standard: contains many unused templates in _)
└── index.html     # HTML entry point (loads /src/main.ts)
```

## WHERE TO LOOK

| Task               | Location              | Notes                                                             |
| ------------------ | --------------------- | ----------------------------------------------------------------- |
| Route definitions  | `src/router/index.ts` | Lazy-loads views from `src/views/`                                |
| Client bootstrap   | `src/main.ts`         | Creates Vue app, installs plugins (Pinia, Router, ElementPlus)    |
| Formatting rules   | `.prettierrc.json`    | Prettier is authoritative; tailwind plugin enabled                |
| Linting config     | `eslint.config.ts`    | Combines Vue, TS, and oxlint rules; formatting conflicts disabled |
| Vite configuration | `vite.config.ts`      | Aliases `@` to `./src`                                            |

## CONVENTIONS

- **Linting & Formatting**:
  - Formatting is exclusively handled by Prettier (`.prettierrc.json`) and `.editorconfig`.
  - Linting uses a flat ESLint config (`eslint.config.ts`) integrating Vue/TS rules and Oxlint (`.oxlintrc.json`).
  - Run linters via `pnpm lint`, `pnpm lint:eslint`, or `pnpm lint:oxlint`.
- **Pre-commit**: Husky is used, though `.husky/_` contains many unused templates. Commits trigger `lint-staged` (ESLint fix and Prettier format).
- **Paths**: The `@` alias always resolves to the `./src` directory.

## ANTI-PATTERNS (THIS PROJECT)

- **Do not commit `.eslintcache`**: Currently present in root, but should ideally be ignored.
- **Do not mix formatters**: ESLint formatting rules are disabled intentionally to avoid conflicts with Prettier.

## UNIQUE STYLES

- The project includes auto-generated declaration files (`auto-imports.d.ts` and `components.d.ts`) in the root directory (via unplugin tools).
- `package.json` specifies Vue Router v5 (`^5.0.4`), which is irregular for a Vue 3 app typically using v4 API. Be cautious of version mismatches during dependency updates.

## COMMANDS

```bash
# Development server
pnpm dev

# Linting
pnpm lint
pnpm lint:eslint
pnpm lint:oxlint
```

## NOTES

- No server-side or backend entry exists in this repo.
