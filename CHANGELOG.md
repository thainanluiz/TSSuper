# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
While the version is below 1.0.0, a breaking change bumps the minor version (see the [versioning policy](https://github.com/thainanluiz/TSSuper/blob/main/docs/versioning.md)).

## [Unreleased]

This release contains breaking changes. They are marked **Breaking** below.

### Changed

- **Breaking:** the `exports` map only exposes the package root and `./package.json`. Deep imports such as `@thainanluiz/tssuper/dist/index.js` no longer resolve; import from `@thainanluiz/tssuper` instead. Node.js ESM consumers now get the ESM build and its matching type declarations.
- **Breaking:** `math.formatNumber` rounds half away from zero based on the decimal value, so the result changes for some inputs whose binary representation is inexact: `formatNumber({ number: 1.005, decimalPlaces: 2 })` now returns `1.01` (previously `1`). It never returns `-0` (`-0.001` with 2 decimal places now returns `0`). `decimalPlaces` above `100` now throws `Error: decimalPlaces must be at most 100` instead of a `RangeError` from `toFixed`.
- **Breaking:** stricter input validation. These inputs used to be accepted and now throw:
  - `delay.fixedDelay`: `ms` or `breakAt` set to `NaN` or above `2147483647`. Such an `ms`, or a `breakAt` above the limit, used to end the delay after ~1 ms; a `NaN` `breakAt` was ignored.
  - `delay.fixedRepeater`: `ms` set to `NaN` or above `2147483647`, and `times` that is not a positive integer (`NaN` used to repeat forever, `2.5` ran 3 times).
- **Breaking:** error messages changed:
  - `ms must be a positive number` is now `ms must be a positive number (at most 2147483647)` (`fixedDelay` and `fixedRepeater`).
  - `breakAt must be a positive number if defined` is now `breakAt must be a positive number if defined (at most 2147483647)` (`fixedDelay`).
  - `times must be a positive number` is now `times must be a positive integer` (`fixedRepeater`).
- The license changed from GPL-3.0-only to MIT. Versions 0.0.12 and earlier were released under GPL-3.0-only.
- `delay.fixedRepeater` types its promise as `Promise<number>` (previously `Promise<number | void>`).
- The package contents are now declared with the `files` field: the `dist` folder plus the files npm always includes, such as `README.md` and `LICENSE`.

### Removed

- The unused `ulid` runtime dependency. The package has no runtime dependencies.

### Fixed

- `math.randomInt`: the documented default range `{ min: 0, max: 10 }` now works. `randomInt()` and `randomInt({})` used to throw; `min` and `max` are now optional in `RandomIntProps`.
- `delay.fixedDelay`: the pending `breakAt` timer is cleared when the delay ends, so it no longer keeps a Node.js process running.
- `delay.fixedRepeater`: if the callback throws, the repetitions stop and the promise rejects with that error. Previously the interval kept running and the promise never settled.

## [0.0.12] - 2024-07-10

This version was published to npm without a version commit or a changelog entry. This entry was reconstructed from the published package, which matches commit `c4dd5bc`.

### Added

- `delay.fixedRepeater`: calls a callback a fixed number of times (`times`), waiting `ms` milliseconds before each call. It returns `{ promise, cancel }`, and the promise resolves with the number of calls made.
- Source maps in the published package.

### Changed

- `math.randomInt` checks that `min` and `max` are finite and throws `min and max must be finite numbers` otherwise.
- `math.formatNumber` checks that `number` is finite (`number must be a finite number`) and that `decimalPlaces` is not negative (`decimalPlaces must be non-negative`).

## [0.0.11] - 2024-07-10

The changes in this version were not recorded. Earlier editions of this changelog listed `fixedRepeater` under this version, but it first shipped in 0.0.12.

## [0.0.10] - 2024-07-10

### Added

- `delay` module with `delay.fixedDelay`: waits a fixed number of milliseconds (`ms`) and returns `{ promise, cancel }`. The optional `breakAt` ends the delay early, and `returnElapsed: true` makes the promise resolve with the elapsed time.

## [0.0.9] - 2024-07-10

The changes in this version were not recorded.

## [0.0.8] - 2024-07-10

The changes in this version were not recorded.

## [0.0.7] - 2024-06-15

The changes in this version were not recorded.

## [0.0.6] - 2024-06-15

### Added

- `math.formatNumber`: formats a number to a specified number of decimal places.

## [0.0.5] - 2024-06-15

The changes in this version were not recorded.

## [0.0.4] - 2024-06-15

The changes in this version were not recorded.

## [0.0.3] - 2024-06-15

The changes in this version were not recorded.

## [0.0.2] - 2024-06-15

### Changed

- The package was renamed from `TSSuper` to `@thainanluiz/tssuper`.

## [0.0.1] - 2024-06-15

### Added

- `math.randomInt`: generates a random integer within a specified range.

[Unreleased]: https://github.com/thainanluiz/TSSuper/compare/c4dd5bc8b63ec3ee19c77fb1012c36d0de2d3142...HEAD
[0.0.12]: https://www.npmjs.com/package/@thainanluiz/tssuper/v/0.0.12
[0.0.11]: https://www.npmjs.com/package/@thainanluiz/tssuper/v/0.0.11
[0.0.10]: https://www.npmjs.com/package/@thainanluiz/tssuper/v/0.0.10
[0.0.9]: https://www.npmjs.com/package/@thainanluiz/tssuper/v/0.0.9
[0.0.8]: https://www.npmjs.com/package/@thainanluiz/tssuper/v/0.0.8
[0.0.7]: https://www.npmjs.com/package/@thainanluiz/tssuper/v/0.0.7
[0.0.6]: https://www.npmjs.com/package/@thainanluiz/tssuper/v/0.0.6
[0.0.5]: https://www.npmjs.com/package/@thainanluiz/tssuper/v/0.0.5
[0.0.4]: https://www.npmjs.com/package/@thainanluiz/tssuper/v/0.0.4
[0.0.3]: https://www.npmjs.com/package/@thainanluiz/tssuper/v/0.0.3
[0.0.2]: https://www.npmjs.com/package/@thainanluiz/tssuper/v/0.0.2
[0.0.1]: https://www.npmjs.com/package/@thainanluiz/tssuper/v/0.0.1
