// OPTIMIZED: Centralized scroll lock management for all modals
// PERFORMANCE: Prevents scroll position jump-to-top bug on modal close
import { useCallback, useRef } from 'react';

/**
 * useScrollLock — consistent scroll-lock for modals across the app.
 * 
 * When a modal opens:  saves scrollY, locks body overflow.
 * When a modal closes: restores scrollY to prevent the jump-to-top bug.
 */
export function useScrollLock() {
  const savedScrollY = useRef(0);
  const isLocked = useRef(false);

  const lock = useCallback(() => {
    if (isLocked.current) return;
    savedScrollY.current = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY.current}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    isLocked.current = true;
  }, []);

  const unlock = useCallback(() => {
    if (!isLocked.current) return;
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, savedScrollY.current);
    isLocked.current = false;
  }, []);

  return { lock, unlock, isLocked: isLocked.current };
}
