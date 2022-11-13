import { useState, useRef, useLayoutEffect } from "react";

function ReactResizeObserver({ children }) {
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

  return children({
    ...dims,
    ref,
  });
}
