import { useState, useRef, useLayoutEffect } from "react";
import { Dims, ReactResizeObserverProps } from "../types";

function ReactResizeObserver({ children }: ReactResizeObserverProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [dims, setDims] = useState<Dims>({
    width: null,
    height: null,
  });

  function onResize(entries: ResizeObserverEntry[]) {
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

    let observer: ResizeObserver | null = new ResizeObserver(onResize);

    observer.observe(ref.current);

    return () => {
      observer?.disconnect();
      observer = null;
    };
  }, [ref]);

  return children({
    dims,
    ref,
  });
}

export default ReactResizeObserver;
