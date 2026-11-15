# Contributing to TSSuper

Thanks for helping improve TSSuper. This guide covers the local setup, the project layout and the conventions every function follows.

## Setup

You need npm and Node.js 22, 24 or 26 (the versions CI tests).

```sh
git clone https://github.com/thainanluiz/TSSuper.git
cd TSSuper
npm ci
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run typecheck` | Type-checks `src/` on its own, without Node.js or DOM typings (see [Runtime-agnostic code](#runtime-agnostic-code)), then type-checks `src/`, `tests/` and `examples/` together. |
| `npm test` | Runs the Jest test suite in `tests/`. |
| `npm run build` | Builds `dist/` with tsup: CommonJS, ESM and type declarations. |
| `npm run check:package` | Builds the package, then checks it with publint and Are the Types Wrong (`@arethetypeswrong/cli`). |

Before opening a pull request, run `npm run typecheck`, `npm test` and `npm run check:package`. CI runs the same checks on Node.js 22, 24 and 26, plus test coverage and an audit of runtime dependencies.

`prepublishOnly` runs automatically before `npm publish`; you don't need to call it.

To run an example, see [`examples/README.md`](examples/README.md).

## Project structure

```text
src/
  index.ts                  exports each module as a namespace (math, delay)
  globals.d.ts              the only runtime globals src/ may use (timers)
  <module>/
    index.ts                re-exports the module's functions and types
    functions/
      <fn>.ts               one public function per file
      index.ts              barrel
    types/
      <fn>Props.ts          the props type of each function
      index.ts              barrel
    utils/                  internal helpers, not exported
tests/
  <module>/<fn>.test.ts     tests for each function
  helpers/                  shared test utilities
examples/
  <module>/<fn>.ts          one runnable example per function
docs/                       guides and policies
```

## API conventions

- **One props object.** Each function takes a single object argument, typed as `<Fn>Props` (for example `RandomIntProps`) and exported from the module's `types/` folder.
- **Validate first.** Check every prop at the start of the function, before any side effect such as starting a timer.
- **Clear errors.** Throw an `Error` whose message names the prop and the rule, for example `ms must be a positive number (at most 2147483647)`. The class and the text of error messages are part of the public API: changing them is a breaking change.
- **Document in JSDoc.** Describe each prop in the props type (meaning, limits, default value) and list every error message with `@throws` on the function.
- **Cancellable work returns `{ promise, cancel }`.** Functions that schedule work, like `delay.fixedDelay` and `delay.fixedRepeater`, return a promise and a `cancel` function. Calling `cancel()` clears every pending timer and resolves the promise right away.
- **No runtime dependencies.** The package has none, and new ones need maintainer approval. Development tools go in `devDependencies`.

See the [versioning policy](docs/versioning.md) for everything that counts as public API.

## Runtime-agnostic code

Code in `src/` must run on any JavaScript runtime: Node.js, Bun, Deno and browsers.

- Use only the ECMAScript standard library (ES2020) and the four timer functions declared in `src/globals.d.ts`: `setTimeout`, `clearTimeout`, `setInterval` and `clearInterval`.
- Don't use Node.js-only APIs (`fs`, `process`, `Buffer`, `NodeJS.*` types) or browser-only APIs (`window`, `document`).
- Keep timer handles in local variables typed as `ReturnType<typeof setTimeout>` (or `ReturnType<typeof setInterval>`), and never expose them in the public API: their type differs between runtimes.
- Only add a global to `src/globals.d.ts` if it exists in every one of these runtimes.

`npm run typecheck` enforces this: `src/tsconfig.json` checks `src/` with no Node.js or DOM typings, so any API outside that set fails to compile. Tests and examples run on Node.js and may use Node.js and Jest APIs.

## Checklist for a new function

1. Implement it in `src/<module>/functions/<fn>.ts`, with input validation and JSDoc (`@throws` for every error message).
2. Add its props type in `src/<module>/types/<fn>Props.ts`, with JSDoc on each prop.
3. Export both from the barrels: `functions/index.ts` and `types/index.ts`. For a new module, also export it as a namespace in `src/index.ts`.
4. Write tests in `tests/<module>/<fn>.test.ts` that use the public API (the namespaces), not internal files. Cover valid inputs, edge cases and every error message.
5. Add an example in `examples/<module>/<fn>.ts` that imports from `@thainanluiz/tssuper`. Run it and make sure its `Example output` comment matches what it prints.
6. Document the function in `FUNCTIONS.md`.
7. Add an entry under `[Unreleased]` in `CHANGELOG.md`. Mark it **Breaking** if the [versioning policy](docs/versioning.md) says so.
8. Run `npm run typecheck`, `npm test` and `npm run check:package`.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
