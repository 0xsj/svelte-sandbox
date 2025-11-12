import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// Re-export lodash implementations
export { debounce, throttle };

// Re-export types for convenience
export type { DebouncedFunc, DebouncedFuncLeading } from 'lodash';
