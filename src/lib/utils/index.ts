// DOM utilities
export { cn } from './dom';

// String utilities
export { truncate, truncateMiddle } from './string';
export { slug } from './string';
export type { TruncateOptions, SlugOptions } from './string';

// Number utilities
export {
	formatCurrency,
	formatCompactCurrency,
	formatNumber,
	formatPercentage,
	formatCompactNumber,
	formatBytes
} from './number';
export { clamp, clampMin, clampMax } from './number';
export type { FormatCurrencyOptions, FormatNumberOptions } from './number';

// Date utilities
export { formatDate, formatRelative, formatDuration, isValidDate } from './date';
export type { FormatDateOptions } from './date';

// Function utilities (from lodash)
export { debounce, throttle } from './function';
export type { DebouncedFunc, DebouncedFuncLeading } from './function';
