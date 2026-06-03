// OPTIMIZED: Refactored body scroll lock to use overflow hidden with scrollbar width padding-right compensation.
// PERFORMANCE: Prevents viewport jumps, layout shifting, and stacking context errors on modal open.
import { useCallback, useRef } from 'react';

/**
 * useScrollLock — consistent scroll-lock for modals across the app.
 * 
 * When a modal opens: locks body overflow and adds padding-right to compensate for scrollbar.
 * When a modal closes: restores original body overflow and padding.
 */
export function useScrollLock() {
  const isLocked = useRef(false);
  const originalPaddingRight = useRef('');

  const lock = useCallback(() => {
    if (isLocked.current) return;
    
    // Calculate scrollbar width before hiding overflow
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    originalPaddingRight.current = document.body.style.paddingRight;
    
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    
    document.body.style.overflow = 'hidden';
    isLocked.current = true;
  }, []);

  const unlock = useCallback(() => {
    if (!isLocked.current) return;
    
    document.body.style.overflow = '';
    document.body.style.paddingRight = originalPaddingRight.current;
    isLocked.current = false;
  }, []);

  return { lock, unlock, isLocked: isLocked.current };
}
