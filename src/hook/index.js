import { useState, useRef, useLayoutEffect, useCallback } from "react";

function useResizeObserver() {
  const ref = useRef(null);
  const [dims, setDims] = useState({
    width: null,
    height: null,
  });

  function onResize(entries) {
    if (!Array.isArray(entries)) return;

    const entry = entries[0];
    const width = entry.contentRect.width;
    const height = entry.contentRect.height;

    setDims({
      width,
      height,
    });
  }

  useLayoutEffect(() => {
    if (!ref.current) return;

    let observer = new ResizeObserver(onResize);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      observer = null;
    };
  }, [ref]);

  return {
    ...dims,
    ref,
  };
}

export default useResizeObserver;
