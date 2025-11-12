/**
 * Options for date formatting
 */
export interface FormatDateOptions {
  /**
   * Locale for formatting
   * @default 'en-US'
   */
  locale?: string;

  /**
   * Date style
   * @default 'medium'
   */
  dateStyle?: 'full' | 'long' | 'medium' | 'short';

  /**
   * Time style
   * @default undefined (no time)
   */
  timeStyle?: 'full' | 'long' | 'medium' | 'short';
}

/**
 * Formats a date using Intl.DateTimeFormat
 *
 * @param date - The date to format
 * @param options - Formatting options
 * @returns Formatted date string
 *
 * @example
 * ```ts
 * formatDate(new Date('2024-03-15')) // 'Mar 15, 2024'
 * formatDate(new Date('2024-03-15'), { dateStyle: 'full' }) // 'Friday, March 15, 2024'
 * formatDate(new Date('2024-03-15'), { dateStyle: 'short' }) // '3/15/24'
 * formatDate(new Date('2024-03-15T14:30:00'), { dateStyle: 'medium', timeStyle: 'short' }) // 'Mar 15, 2024, 2:30 PM'
 * formatDate(new Date('2024-03-15'), { locale: 'de-DE' }) // '15.03.2024'
 * ```
 */
export function formatDate(date: Date | string | number, options: FormatDateOptions = {}): string {
  const { locale = 'en-US', dateStyle = 'medium', timeStyle } = options;

  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;

  return new Intl.DateTimeFormat(locale, {
    dateStyle,
    timeStyle,
  }).format(dateObj);
}

/**
 * Formats a date as relative time (e.g., "2 hours ago", "in 3 days")
 *
 * @param date - The date to format
 * @param options - Formatting options
 * @returns Relative time string
 *
 * @example
 * ```ts
 * formatRelative(new Date(Date.now() - 1000 * 60 * 5)) // '5 minutes ago'
 * formatRelative(new Date(Date.now() - 1000 * 60 * 60 * 2)) // '2 hours ago'
 * formatRelative(new Date(Date.now() - 1000 * 60 * 60 * 24)) // 'yesterday'
 * formatRelative(new Date(Date.now() + 1000 * 60 * 60 * 24)) // 'tomorrow'
 * formatRelative(new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)) // '7 days ago'
 * ```
 */
export function formatRelative(
  date: Date | string | number,
  options: { locale?: string } = {}
): string {
  const { locale = 'en-US' } = options;

  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  const absDiff = Math.abs(diffInSeconds);

  // Determine the appropriate unit
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  let value: number;
  let unit: Intl.RelativeTimeFormatUnit;

  if (absDiff < minute) {
    value = -diffInSeconds;
    unit = 'second';
  } else if (absDiff < hour) {
    value = -Math.floor(diffInSeconds / minute);
    unit = 'minute';
  } else if (absDiff < day) {
    value = -Math.floor(diffInSeconds / hour);
    unit = 'hour';
  } else if (absDiff < week) {
    value = -Math.floor(diffInSeconds / day);
    unit = 'day';
  } else if (absDiff < month) {
    value = -Math.floor(diffInSeconds / week);
    unit = 'week';
  } else if (absDiff < year) {
    value = -Math.floor(diffInSeconds / month);
    unit = 'month';
  } else {
    value = -Math.floor(diffInSeconds / year);
    unit = 'year';
  }

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  return rtf.format(value, unit);
}

/**
 * Formats a duration in milliseconds into human-readable format
 *
 * @param ms - Duration in milliseconds
 * @returns Formatted duration string
 *
 * @example
 * ```ts
 * formatDuration(1000) // '1s'
 * formatDuration(65000) // '1m 5s'
 * formatDuration(3665000) // '1h 1m 5s'
 * formatDuration(90000000) // '1d 1h'
 * formatDuration(500) // '500ms'
 * ```
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) {
    return `${ms}ms`;
  }

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const parts: string[] = [];

  if (days > 0) parts.push(`${days}d`);
  if (hours % 24 > 0) parts.push(`${hours % 24}h`);
  if (minutes % 60 > 0) parts.push(`${minutes % 60}m`);
  if (seconds % 60 > 0 && days === 0) parts.push(`${seconds % 60}s`);

  return parts.join(' ') || '0s';
}

/**
 * Checks if a date is valid
 *
 * @param date - The date to validate
 * @returns True if valid date
 *
 * @example
 * ```ts
 * isValidDate(new Date()) // true
 * isValidDate(new Date('2024-03-15')) // true
 * isValidDate(new Date('invalid')) // false
 * isValidDate('2024-03-15') // true
 * isValidDate('invalid') // false
 * ```
 */
export function isValidDate(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;

  return dateObj instanceof Date && !isNaN(dateObj.getTime());
}
