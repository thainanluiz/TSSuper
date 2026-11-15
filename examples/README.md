# Examples

Each file shows one function and ends with an `Example output` comment. A `~` in the output marks a value that varies slightly between runs, such as an elapsed time.

| Example | Function |
| --- | --- |
| [`math/randomInt.ts`](math/randomInt.ts) | `math.randomInt` |
| [`math/formatNumber.ts`](math/formatNumber.ts) | `math.formatNumber` |
| [`delay/fixedDelay.ts`](delay/fixedDelay.ts) | `delay.fixedDelay` |
| [`delay/fixedRepeater.ts`](delay/fixedRepeater.ts) | `delay.fixedRepeater` |

## Running an example

The examples import the package by its name, `@thainanluiz/tssuper`, just like your code would. Inside this repository, Node.js resolves that name to the local build in `dist/` (a package can import itself by name through its `exports` field), so build the package first.

From the repository root, install and build once:

```sh
npm ci
npm run build
```

Then pass an example to Node.js on standard input, as a TypeScript ES module.

In Bash, zsh or the Windows Command Prompt:

```sh
node --input-type=module-typescript < examples/math/formatNumber.ts
```

In PowerShell:

```powershell
Get-Content examples/math/formatNumber.ts -Raw | node --input-type=module-typescript
```

Node.js strips the type annotations itself, so no extra tool is required. This needs Node.js 22.18 or later.

Notes:

- Run the command from the repository root. Node.js resolves the package name from the current directory.
- `node examples/math/formatNumber.ts` does not work here. The repository's `package.json` sets `"type": "commonjs"`, so Node.js would load the file as CommonJS and reject its `import` statement.
- Run `npm run build` again after changing anything in `src/`, because the examples use the built package, not the source files.

## Type checking

`npm run typecheck` also type-checks the examples. For that check, `tsconfig.json` maps `@thainanluiz/tssuper` to `src/`, so the examples are checked against the current source without a build.
