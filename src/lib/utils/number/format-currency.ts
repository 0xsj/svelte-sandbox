/**
 * Options for currency formatting
 */
export interface FormatCurrencyOptions {
  /**
   * Currency code (ISO 4217)
   * @default 'USD'
   */
  currency?: string;

  /**
   * Locale for formatting
   * @default 'en-US'
   */
  locale?: string;

  /**
   * Number of decimal places
   * @default undefined (uses currency default)
   */
  minimumFractionDigits?: number;

  /**
   * Maximum number of decimal places
   * @default undefined (uses currency default)
   */
  maximumFractionDigits?: number;
}

/**
 * Formats a number as currency using Intl.NumberFormat
 *
 * @param amount - The number to format
 * @param options - Formatting options
 * @returns Formatted currency string
 *
 * @example
 * ```ts
 * formatCurrency(1234.56) // '$1,234.56'
 * formatCurrency(1234.56, { currency: 'EUR' }) // '€1,234.56'
 * formatCurrency(1234.56, { locale: 'de-DE', currency: 'EUR' }) // '1.234,56 €'
 * formatCurrency(1234, { minimumFractionDigits: 2 }) // '$1,234.00'
 * formatCurrency(1234.567, { maximumFractionDigits: 2 }) // '$1,234.57'
 * ```
 */
export function formatCurrency(amount: number, options: FormatCurrencyOptions = {}): string {
  const {
    currency = 'USD',
    locale = 'en-US',
    minimumFractionDigits,
    maximumFractionDigits,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}

/**
 * Formats a number as compact currency (K, M, B)
 *
 * @param amount - The number to format
 * @param options - Formatting options
 * @returns Compact formatted currency string
 *
 * @example
 * ```ts
 * formatCompactCurrency(1234) // '$1.2K'
 * formatCompactCurrency(1234567) // '$1.2M'
 * formatCompactCurrency(1234567890) // '$1.2B'
 * formatCompactCurrency(1234, { maximumFractionDigits: 0 }) // '$1K'
 * ```
 */
export function formatCompactCurrency(amount: number, options: FormatCurrencyOptions = {}): string {
  const {
    currency = 'USD',
    locale = 'en-US',
    minimumFractionDigits,
    maximumFractionDigits = 1,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}
