import { describe, it, expect } from 'vitest';
import { clamp, clampMin, clampMax } from '../clamp';

describe('clamp', () => {
	describe('basic functionality', () => {
		it('should return value when within range', () => {
			expect(clamp(5, 0, 10)).toBe(5);
			expect(clamp(15, 10, 20)).toBe(15);
		});

		it('should return min when value is below range', () => {
			expect(clamp(-5, 0, 10)).toBe(0);
			expect(clamp(5, 10, 20)).toBe(10);
		});

		it('should return max when value is above range', () => {
			expect(clamp(15, 0, 10)).toBe(10);
			expect(clamp(25, 10, 20)).toBe(20);
		});
	});

	describe('edge cases', () => {
		it('should handle value equal to min', () => {
			expect(clamp(0, 0, 10)).toBe(0);
		});

		it('should handle value equal to max', () => {
			expect(clamp(10, 0, 10)).toBe(10);
		});

		it('should handle negative ranges', () => {
			expect(clamp(-5, -10, 0)).toBe(-5);
			expect(clamp(-15, -10, 0)).toBe(-10);
			expect(clamp(5, -10, 0)).toBe(0);
		});

		it('should handle decimal values', () => {
			expect(clamp(5.5, 0, 10)).toBe(5.5);
			expect(clamp(10.5, 0, 10)).toBe(10);
			expect(clamp(-0.5, 0, 10)).toBe(0);
		});

		it('should throw error when min is greater than max', () => {
			expect(() => clamp(5, 10, 0)).toThrow('Min value cannot be greater than max value');
		});
	});

	describe('real-world examples', () => {
		it('should clamp volume levels (0-100)', () => {
			expect(clamp(50, 0, 100)).toBe(50);
			expect(clamp(150, 0, 100)).toBe(100);
			expect(clamp(-10, 0, 100)).toBe(0);
		});

		it('should clamp opacity values (0-1)', () => {
			expect(clamp(0.5, 0, 1)).toBe(0.5);
			expect(clamp(1.5, 0, 1)).toBe(1);
			expect(clamp(-0.5, 0, 1)).toBe(0);
		});

		it('should clamp pagination (1-based)', () => {
			expect(clamp(5, 1, 10)).toBe(5);
			expect(clamp(0, 1, 10)).toBe(1);
			expect(clamp(15, 1, 10)).toBe(10);
		});
	});
});

describe('clampMin', () => {
	it('should return value when above minimum', () => {
		expect(clampMin(15, 10)).toBe(15);
	});

	it('should return min when value is below minimum', () => {
		expect(clampMin(5, 10)).toBe(10);
	});

	it('should handle negative values', () => {
		expect(clampMin(-5, 0)).toBe(0);
		expect(clampMin(5, 0)).toBe(5);
	});
});

describe('clampMax', () => {
	it('should return value when below maximum', () => {
		expect(clampMax(5, 10)).toBe(5);
	});

	it('should return max when value is above maximum', () => {
		expect(clampMax(15, 10)).toBe(10);
	});

	it('should handle negative values', () => {
		expect(clampMax(-5, 0)).toBe(-5);
		expect(clampMax(5, 0)).toBe(0);
	});
});
