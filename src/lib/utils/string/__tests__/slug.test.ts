import { describe, it, expect } from 'vitest';
import { slug } from '../slug';

describe('slug', () => {
  describe('basic functionality', () => {
    it('should convert a simple string to lowercase with hyphens', () => {
      expect(slug('Hello World')).toBe('hello-world');
    });

    it('should handle empty string', () => {
      expect(slug('')).toBe('');
    });

    it('should handle single word', () => {
      expect(slug('Hello')).toBe('hello');
    });
  });

  describe('special characters', () => {
    it('should remove special characters', () => {
      expect(slug('Hello World!')).toBe('hello-world');
      expect(slug('Hello@World#123')).toBe('helloworld123');
      expect(slug('Hello & World')).toBe('hello-world');
    });

    it('should remove accents and diacritics', () => {
      expect(slug('Café au Lait')).toBe('cafe-au-lait');
      expect(slug('Crème brûlée')).toBe('creme-brulee');
      expect(slug('Über uns')).toBe('uber-uns');
    });
  });

  describe('whitespace handling', () => {
    it('should trim leading and trailing whitespace', () => {
      expect(slug('  Hello World  ')).toBe('hello-world');
    });

    it('should collapse multiple spaces into single separator', () => {
      expect(slug('Hello   World')).toBe('hello-world');
      expect(slug('Hello     World     Test')).toBe('hello-world-test');
    });

    it('should not trim when trim option is false', () => {
      expect(slug('  Hello World  ', { trim: false })).toBe('hello-world');
    });
  });

  describe('separator options', () => {
    it('should use custom separator', () => {
      expect(slug('Hello World', { separator: '_' })).toBe('hello_world');
      expect(slug('Hello World', { separator: '.' })).toBe('hello.world');
    });

    it('should replace existing separators with custom separator', () => {
      expect(slug('Hello-World_Test', { separator: '_' })).toBe('hello_world_test');
    });
  });

  describe('lowercase options', () => {
    it('should preserve case when lowercase is false', () => {
      expect(slug('Hello World', { lowercase: false })).toBe('Hello-World');
      expect(slug('HelloWorld', { lowercase: false })).toBe('HelloWorld');
    });

    it('should convert to lowercase by default', () => {
      expect(slug('HELLO WORLD')).toBe('hello-world');
    });
  });

  describe('edge cases', () => {
    it('should handle strings with only special characters', () => {
      expect(slug('!!!')).toBe('');
      expect(slug('@#$%')).toBe('');
    });

    it('should handle numbers', () => {
      expect(slug('Hello 123')).toBe('hello-123');
      expect(slug('123 456')).toBe('123-456');
    });

    it('should handle mixed separators', () => {
      expect(slug('Hello_World-Test')).toBe('hello-world-test');
      expect(slug('Hello___World---Test')).toBe('hello-world-test');
    });

    it('should remove leading and trailing separators', () => {
      expect(slug('-Hello-World-')).toBe('hello-world');
      expect(slug('___Hello___')).toBe('hello');
    });
  });

  describe('real-world examples', () => {
    it('should handle blog post titles', () => {
      expect(slug('10 Tips for Better Code')).toBe('10-tips-for-better-code');
      expect(slug('Why TypeScript?')).toBe('why-typescript');
    });

    it('should handle product names', () => {
      expect(slug('MacBook Pro 16"')).toBe('macbook-pro-16');
      expect(slug('iPhone 15 Pro Max')).toBe('iphone-15-pro-max');
    });

    it('should handle filenames', () => {
      expect(slug('My Resume (Final).pdf')).toBe('my-resume-finalpdf');
      expect(slug('Project_v2.1_DRAFT.doc')).toBe('project-v21-draftdoc');
    });
  });
});
