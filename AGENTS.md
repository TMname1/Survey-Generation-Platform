# PROJECT KNOWLEDGE BASE

**Generated:** 2026-04-20
**Commit:** a9a6cff
**Branch:** 8-实现问卷保存保存后更新分享pdf本地保存

## OVERVIEW

Frontend Vue 3 SPA built with Vite, TypeScript, Pinia, Vue Router, Tailwind CSS, and Element Plus.

## STRUCTURE

`./
├── src/           # Application source code
│   ├── apis/      # API wrappers
│   ├── assets/    # Static assets (base.css, svg)
│   ├── components/ # Reusable UI components & editors
│   ├── router/    # Vue Router configuration
│   ├── stores/    # Pinia state stores & factory stores
│   ├── utils/     # Utility functions
│   └── views/     # Route components (lazy-loaded)
├── .husky/        # Git hooks (non-standard: contains many unused templates in _)
└── index.html     # HTML entry point (loads /src/main.ts)`

## WHERE TO LOOK

| Task               | Location            | Notes                                                             |
| ------------------ | ------------------- | ----------------------------------------------------------------- |
| Route definitions  | src/router/index.ts | Lazy-loads views from src/views/                                  |
| Client bootstrap   | src/main.ts         | Creates Vue app, installs plugins (Pinia, Router, ElementPlus)    |
| Formatting rules   | .prettierrc.json    | Prettier is authoritative; tailwind plugin enabled                |
| Linting config     | eslint.config.ts    | Combines Vue, TS, and oxlint rules; formatting conflicts disabled |
| Vite configuration | ite.config.ts       | Aliases @ to ./src                                                |

## ARCHITECTURE & DEEP PATTERNS

- **Store Factory Pattern**: The project uses "store factories" instead of standard Pinia stores for survey items.
  - Locations: src/stores/{choice,advanced,input,remarks}/create\*.ts.
  - Pattern: Functions returning reactive objects (
    efs) representing item state.
- **Dynamic Component System**:
  - Components in src/components/{choice,advanced,input,remarks}/ consume a data prop which is the reactive state from a factory.
  - **Edit Panels**: Driven by an editComponents string array returned by each store factory. The UI maps these strings to components in src/components/editor/.
- **State Injection**: Editor components (e.g., RadioOption.vue) use inject('activeStore') to access and mutate the currently selected item's state directly.
- **Survey Data Structure (`databaseSurveyType`)**: A survey is represented as an array where all elements _except the last_ are survey components (`SurveyItem`), and the _final element_ is always the metadata (`surveyInfoType` containing `uuid`, `surveyTitle`, etc.).
- **Component Classification**: Not all items in the survey array are questions. Remark types (e.g., `备注标题`, `备注段落`) are layout/informational components and must be excluded when calculating question counts.

## CONVENTIONS

- **Bilingual Mapping**: UI state often uses Chinese strings (e.g., '左对齐', '加粗') which are mapped to CSS values in the view components.
- **Strict Prop Naming**: Survey components almost exclusively use a single data prop for their state.
- **Pathing**: Deep modules follow a mirrored structure: src/stores/xyz/createX.ts <-> src/components/xyz/X.vue.
- **Linting & Formatting**:
  - Formatting is exclusively handled by Prettier (.prettierrc.json) and .editorconfig.
  - Linting uses a flat ESLint config (eslint.config.ts) integrating Vue/TS rules and Oxlint (.oxlintrc.json).
  - Run linters via pnpm lint, pnpm lint:eslint, or pnpm lint:oxlint.
- **Pre-commit**: Husky is used, though .husky/\_ contains many unused templates. Commits trigger lint-staged (ESLint fix and Prettier format).
- **Paths**: The @ alias always resolves to the ./src directory.

## ANTI-PATTERNS (THIS PROJECT)

- **Do not commit .eslintcache**: Currently present in root, but should ideally be ignored.
- **Do not mix formatters**: ESLint formatting rules are disabled intentionally to avoid conflicts with Prettier.

## UNIQUE STYLES

- The project includes auto-generated declaration files (uto-imports.d.ts and components.d.ts) in the root directory (via unplugin tools).
- package.json specifies Vue Router v5 (^5.0.4), which is irregular for a Vue 3 app typically using v4 API. Be cautious of version mismatches during dependency updates.
- **Manual ElementPlus Styles**: main.ts manually imports Element Plus MessageBox CSS due to resolver limitations.

## COMMANDS

`ash

# Development server

pnpm dev

# Linting

pnpm lint
pnpm lint:eslint
pnpm lint:oxlint
`

## NOTES

- No server-side or backend entry exists in this repo.
