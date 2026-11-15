# Versioning policy

TSSuper follows [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html). This page explains how version numbers change and what counts as a breaking change.

## How the version number changes

### Before 1.0.0

While the major version is `0`:

| Change | Version bump | Example |
| --- | --- | --- |
| Breaking change | Minor | `0.1.3` → `0.2.0` |
| Anything else (new features, fixes) | Patch | `0.1.3` → `0.1.4` |

A release that contains a breaking change may contain new features and fixes as well.

With npm's default caret ranges, `^0.1.3` accepts `0.1.4` but not `0.2.0`, so a breaking release is never installed by an automatic update.

### From 1.0.0

Strict Semantic Versioning:

| Change | Version bump | Example |
| --- | --- | --- |
| Breaking change | Major | `1.4.2` → `2.0.0` |
| New backward-compatible feature | Minor | `1.4.2` → `1.5.0` |
| Backward-compatible fix | Patch | `1.4.2` → `1.4.3` |

## Public API

The public API is the contract that the rules above protect. It includes:

- **Exported names and signatures**: the namespaces (`math`, `delay`), the functions in them, their parameters and the shape of what they return.
- **Exported types**, such as `math.RandomIntProps` and `delay.FixedDelayProps`.
- **Documented behavior**: what the functions are documented to do in the README, `FUNCTIONS.md` and the JSDoc, including the value they return for an accepted input.
- **Errors**: the class of each error thrown (currently `Error`) and the exact text of its message.
- **Accepted inputs**: the values each parameter accepts.

The package root (`@thainanluiz/tssuper`) and `@thainanluiz/tssuper/package.json` are the only supported import paths. Files inside `dist/` cannot be imported directly.

## What counts as a breaking change

Any change that can make existing code stop compiling, throw where it did not, or produce a different result. For example:

- Removing or renaming an exported namespace, function or type.
- Adding a required parameter, or changing the type of an existing one in an incompatible way.
- Changing the return type or the shape of a returned object in an incompatible way.
- Changing the value returned for an accepted input, even when the change fixes a bug. Example: `math.formatNumber` returning `1.01` instead of `1` for `{ number: 1.005, decimalPlaces: 2 }`.
- Changing the class of a thrown error or the text of its message.
- Stricter validation: rejecting an input that used to be accepted. Example: `delay.fixedRepeater` throwing for `times: 2.5`, which used to run 3 times.

These changes are not breaking:

- Adding a new namespace, function, exported type or optional parameter.
- Accepting an input that used to throw.
- Changes to internal code that keep the public API intact.

## How changes are announced

Every release is listed in [`CHANGELOG.md`](https://github.com/thainanluiz/TSSuper/blob/main/CHANGELOG.md), following [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Breaking changes are marked **Breaking** and describe what changed and what to do about it.
