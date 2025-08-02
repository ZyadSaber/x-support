import { useRef, useState, useLayoutEffect } from "react";

const useBoundingClientRef = <T>(
  deps?: T[]
): [React.RefObject<HTMLDivElement>, DOMRect | undefined] => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect>();

  useLayoutEffect(() => {
    if (elementRef.current) {
      const element = elementRef.current;
      setRect(element.getBoundingClientRect());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps || []);

  return [elementRef, rect];
};

export default useBoundingClientRef;
