/**
 * Options for slug generation
 */
export interface SlugOptions {
	/**
	 * Character to use as separator
	 * @default '-'
	 */
	separator?: string;

	/**
	 * Whether to convert to lowercase
	 * @default true
	 */
	lowercase?: boolean;

	/**
	 * Whether to trim whitespace from ends
	 * @default true
	 */
	trim?: boolean;
}

/**
 * Converts a string to a URL-safe slug
 *
 * @param str - The string to convert to a slug
 * @param options - Slug generation options
 * @returns URL-safe slug string
 *
 * @example
 * ```ts
 * slug('Hello World') // 'hello-world'
 * slug('Hello World!') // 'hello-world'
 * slug('  Hello   World  ') // 'hello-world'
 * slug('Café au Lait') // 'cafe-au-lait'
 * slug('Hello World', { separator: '_' }) // 'hello_world'
 * slug('Hello World', { lowercase: false }) // 'Hello-World'
 * slug('Hello_World-123') // 'hello-world-123'
 * slug('Multiple   spaces') // 'multiple-spaces'
 * ```
 */
export function slug(str: string, options: SlugOptions = {}): string {
	const { separator = '-', lowercase = true, trim = true } = options;

	if (!str) return '';

	let result = str;

	// Trim whitespace
	if (trim) {
		result = result.trim();
	}

	// Convert to lowercase
	if (lowercase) {
		result = result.toLowerCase();
	}

	// Remove accents/diacritics
	result = result.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

	// Replace non-alphanumeric characters (except spaces, hyphens, and underscores) with empty string
	result = result.replace(/[^a-z0-9\s\-_]/gi, '');

	// Replace spaces, hyphens, and underscores with the separator
	result = result.replace(/[\s\-_]+/g, separator);

	// Remove leading/trailing separators (escape special regex characters in separator)
	const escapedSeparator = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	result = result.replace(new RegExp(`^${escapedSeparator}+|${escapedSeparator}+$`, 'g'), '');

	return result;
}
