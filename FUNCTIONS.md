# Current Functions Available

## 0.0.11

- [fixedRepeater](https://github.com/thainanluiz/TSSuper/blob/main/examples/delay/fixedRepeater.ts) ({ callback: Function, ms: number, times: number })

  Calls a function a fixed number of times, with a fixed delay between each call.

  ### Parameters

  - `callback`: Function to be repeated.
  - `ms`: Delay in milliseconds between each call (positive, at most `2147483647`).
  - `times`: Number of times to call the function (positive integer).

  ### Returns

  Returns an object `{ promise, cancel }`:

  - `promise`: resolves with the number of calls made once all repetitions are done (or when `cancel` is called). If the callback throws, the repetitions stop and the promise rejects with that error.
  - `cancel`: stops the repetitions and resolves the promise immediately.

  <br>

## 0.0.10

- [fixedDelay](https://github.com/thainanluiz/TSSuper/blob/main/examples/delay/fixedDelay.ts) ({ ms: number, breakAt?: number, returnElapsed?: boolean })

  Creates a cancellable delay of a fixed amount of time.

  ### Parameters

  - `ms`: Time in milliseconds to wait (positive, at most `2147483647`).
  - `breakAt` (optional): Time in milliseconds after which the delay resolves early.
  - `returnElapsed` (optional): If `true`, the promise resolves with the elapsed time.

  ### Returns

  Returns an object `{ promise, cancel }`:

  - `promise`: resolves when the delay ends (after `ms`, after `breakAt`, or when `cancel` is called) — with the elapsed time in milliseconds if `returnElapsed` is `true`, otherwise with `undefined`.
  - `cancel`: ends the delay and resolves the promise immediately.

  <br>

## 0.0.6

- [formatNumber](https://github.com/thainanluiz/TSSuper/blob/main/examples/math/formatNumber.ts) ({ number: number, decimalPlaces: number })

  Rounds a number to a specified number of decimal places (halves are rounded away from zero, so `1.005` becomes `1.01`).

  ### Parameters

  - `number`: The number to be formatted (must be finite).
  - `decimalPlaces`: Number of decimal places to round to (integer from `0` to `100`).

  ### Returns

  Returns the formatted number.

  <br>

## 0.0.1

- [randomInt](https://github.com/thainanluiz/TSSuper/blob/main/examples/math/randomInt.ts) ({ min?: number, max?: number })

  Generates a random integer between the specified minimum and maximum values.

  ### Parameters

  - `min`: Minimum value (inclusive).
  - `max`: Maximum value (inclusive).

  ### Returns

  Returns a random integer between `min` and `max`.

  ### Default Range

  Default values for `min` and `max` are `{ min: 0, max: 10 }`, so `randomInt()` returns an integer from 0 to 10.

  <br>
