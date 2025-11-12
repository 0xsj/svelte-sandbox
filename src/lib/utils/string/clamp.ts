/**
 * Clamps a number within the inclusive range specified by min and max
 *
 * @param value - The number to clamp
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns The clamped value
 *
 * @example
 * ```ts
 * clamp(5, 0, 10) // 5
 * clamp(-5, 0, 10) // 0
 * clamp(15, 0, 10) // 10
 * clamp(5, 10, 20) // 10
 * clamp(25, 10, 20) // 20
 * clamp(15, 10, 20) // 15
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new Error('Min value cannot be greater than max value');
  }

  return Math.min(Math.max(value, min), max);
}

/**
 * Clamps a number to be at least the specified minimum
 *
 * @param value - The number to clamp
 * @param min - The minimum value
 * @returns The clamped value
 *
 * @example
 * ```ts
 * clampMin(5, 10) // 10
 * clampMin(15, 10) // 15
 * clampMin(-5, 0) // 0
 * ```
 */
export function clampMin(value: number, min: number): number {
  return Math.max(value, min);
}

/**
 * Clamps a number to be at most the specified maximum
 *
 * @param value - The number to clamp
 * @param max - The maximum value
 * @returns The clamped value
 *
 * @example
 * ```ts
 * clampMax(5, 10) // 5
 * clampMax(15, 10) // 10
 * clampMax(-5, 0) // -5
 * ```
 */
export function clampMax(value: number, max: number): number {
  return Math.min(value, max);
}
