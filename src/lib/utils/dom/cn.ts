/**
 * Type for class value that can be passed to cn utility
 */
type ClassValue = string | number | boolean | undefined | null | ClassValue[];

/**
 * Merges class names together, filtering out falsy values.
 * Similar to clsx/classnames but lightweight and type-safe.
 *
 * @param classes - Class values to merge
 * @returns Merged class string
 *
 * @example
 * ```ts
 * cn('btn', 'btn-primary') // 'btn btn-primary'
 * cn('btn', false && 'btn-disabled') // 'btn'
 * cn('btn', isActive && 'active') // 'btn active' (if isActive is true)
 * cn('btn', ['text-white', 'font-bold']) // 'btn text-white font-bold'
 * cn('btn', undefined, null, '', 'primary') // 'btn primary'
 * ```
 */
export function cn(...classes: ClassValue[]): string {
	const result: string[] = [];

	for (const cls of classes) {
		if (!cls) continue;

		if (typeof cls === 'string' || typeof cls === 'number') {
			result.push(String(cls));
		} else if (Array.isArray(cls)) {
			const nested = cn(...cls);
			if (nested) result.push(nested);
		}
	}

	return result.join(' ');
}
