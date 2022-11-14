import { useState, useRef, useLayoutEffect, LegacyRef } from "react";
import { Dims, Api } from "../types";

function useResizeObserver<TElement extends HTMLElement>(): Api<TElement> {
  const ref = useRef<TElement | null>(null);
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

  return {
    dims,
    ref,
  };
}

export default useResizeObserver;
