/**
 * Options for number formatting
 */
export interface FormatNumberOptions {
  /**
   * Locale for formatting
   * @default 'en-US'
   */
  locale?: string;

  /**
   * Minimum number of fraction digits
   * @default undefined
   */
  minimumFractionDigits?: number;

  /**
   * Maximum number of fraction digits
   * @default undefined
   */
  maximumFractionDigits?: number;

  /**
   * Whether to use grouping separators (commas)
   * @default true
   */
  useGrouping?: boolean;
}

/**
 * Formats a number with locale-specific thousands separators and decimals
 *
 * @param value - The number to format
 * @param options - Formatting options
 * @returns Formatted number string
 *
 * @example
 * ```ts
 * formatNumber(1234.56) // '1,234.56'
 * formatNumber(1234.56, { minimumFractionDigits: 2 }) // '1,234.56'
 * formatNumber(1234, { minimumFractionDigits: 2 }) // '1,234.00'
 * formatNumber(1234.567, { maximumFractionDigits: 2 }) // '1,234.57'
 * formatNumber(1234.56, { locale: 'de-DE' }) // '1.234,56'
 * formatNumber(1234.56, { useGrouping: false }) // '1234.56'
 * ```
 */
export function formatNumber(value: number, options: FormatNumberOptions = {}): string {
  const {
    locale = 'en-US',
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping = true,
  } = options;

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping,
  }).format(value);
}

/**
 * Formats a number as a percentage
 *
 * @param value - The number to format (0.15 = 15%)
 * @param options - Formatting options
 * @returns Formatted percentage string
 *
 * @example
 * ```ts
 * formatPercentage(0.1545) // '15%'
 * formatPercentage(0.1545, { minimumFractionDigits: 1 }) // '15.5%'
 * formatPercentage(0.1545, { maximumFractionDigits: 2 }) // '15.45%'
 * formatPercentage(0.5) // '50%'
 * ```
 */
export function formatPercentage(value: number, options: FormatNumberOptions = {}): string {
  const { locale = 'en-US', minimumFractionDigits = 0, maximumFractionDigits = 0 } = options;

  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

/**
 * Formats a number in compact notation (K, M, B, T)
 *
 * @param value - The number to format
 * @param options - Formatting options
 * @returns Compact formatted number string
 *
 * @example
 * ```ts
 * formatCompactNumber(1234) // '1.2K'
 * formatCompactNumber(1234567) // '1.2M'
 * formatCompactNumber(1234567890) // '1.2B'
 * formatCompactNumber(1234, { maximumFractionDigits: 0 }) // '1K'
 * formatCompactNumber(1234, { locale: 'de-DE' }) // '1,2 Tsd.'
 * ```
 */
export function formatCompactNumber(value: number, options: FormatNumberOptions = {}): string {
  const { locale = 'en-US', minimumFractionDigits, maximumFractionDigits = 1 } = options;

  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

/**
 * Formats bytes into human-readable file size
 *
 * @param bytes - The number of bytes
 * @param decimals - Number of decimal places
 * @returns Formatted file size string
 *
 * @example
 * ```ts
 * formatBytes(1024) // '1 KB'
 * formatBytes(1536) // '1.5 KB'
 * formatBytes(1048576) // '1 MB'
 * formatBytes(1073741824) // '1 GB'
 * formatBytes(1536, 0) // '2 KB'
 * formatBytes(0) // '0 Bytes'
 * ```
 */
export function formatBytes(bytes: number, decimals: number = 1): string {
  if (bytes === 0) return '0 Bytes';
  if (bytes < 0) return '-' + formatBytes(-bytes, decimals);

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);

  return `${value.toFixed(decimals)} ${sizes[i]}`;
}
