/**
 * Options for truncating text
 */
export interface TruncateOptions {
	/**
	 * Maximum length of the string (including ellipsis)
	 * @default 100
	 */
	length?: number;

	/**
	 * String to append when truncated
	 * @default '...'
	 */
	ellipsis?: string;

	/**
	 * Whether to break at word boundaries
	 * @default true
	 */
	breakWord?: boolean;
}

/**
 * Truncates a string to a specified length, optionally breaking at word boundaries
 *
 * @param str - The string to truncate
 * @param options - Truncation options
 * @returns Truncated string
 *
 * @example
 * ```ts
 * truncate('Hello world', { length: 8 }) // 'Hello...'
 * truncate('Hello world', { length: 8, breakWord: false }) // 'Hello...'
 * truncate('Hello world', { length: 20 }) // 'Hello world' (no truncation)
 * truncate('Hello world', { length: 8, ellipsis: '…' }) // 'Hello w…'
 * truncate('The quick brown fox', { length: 15, breakWord: false }) // 'The quick...'
 * ```
 */
export function truncate(str: string, options: TruncateOptions = {}): string {
	const { length = 100, ellipsis = '...', breakWord = true } = options;

	if (!str || str.length <= length) {
		return str;
	}

	const maxLength = length - ellipsis.length;

	if (maxLength <= 0) {
		return ellipsis;
	}

	let truncated = str.slice(0, maxLength);

	// Break at word boundary if requested
	if (!breakWord) {
		const lastSpace = truncated.lastIndexOf(' ');
		if (lastSpace > 0) {
			truncated = truncated.slice(0, lastSpace);
		}
	}

	return truncated.trim() + ellipsis;
}

/**
 * Truncates text in the middle, preserving start and end
 * Useful for file names, paths, or IDs
 *
 * @param str - The string to truncate
 * @param options - Truncation options (length applies to total including ellipsis)
 * @returns Truncated string with middle removed
 *
 * @example
 * ```ts
 * truncateMiddle('very-long-filename.pdf', { length: 15 }) // 'very-l...me.pdf'
 * truncateMiddle('a1b2c3d4e5f6g7h8', { length: 12 }) // 'a1b2...g7h8'
 * truncateMiddle('/path/to/very/long/file.txt', { length: 20 }) // '/path/to...file.txt'
 * ```
 */
export function truncateMiddle(str: string, options: TruncateOptions = {}): string {
	const { length = 100, ellipsis = '...' } = options;

	if (!str || str.length <= length) {
		return str;
	}

	const ellipsisLength = ellipsis.length;
	const charsToShow = length - ellipsisLength;
	const frontChars = Math.ceil(charsToShow / 2);
	const backChars = Math.floor(charsToShow / 2);

	return str.slice(0, frontChars) + ellipsis + str.slice(str.length - backChars);
}
