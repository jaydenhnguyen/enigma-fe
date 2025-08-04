import * as React from 'react';

function useCallbackRef<C extends ((...params: never[]) => unknown) | undefined>(
  callback: C,
): React.MutableRefObject<C> {
  const callbackRef = React.useRef<C>(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return callbackRef;
}

export function useClickOutside(
  refs: React.MutableRefObject<HTMLElement | null>[],
  callback: (target: HTMLElement) => void,
): void {
  const callbackRef = useCallbackRef(callback);

  React.useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const clickedInside = refs.some((ref) => ref.current?.contains(target));
      if (clickedInside) {
        return;
      }

      callbackRef.current(target);
    }

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [callbackRef, refs]);
}
