import React, { useState, useRef, useLayoutEffect } from "react";
import { Dims, ReactResizeObserverProps } from "../types";

function ReactResizeObserver<TElement extends HTMLElement>({
  children,
}: ReactResizeObserverProps<TElement>): JSX.Element {
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

  if (!isFunction(children))
    throw new Error("children is mandatory and needs to be a function!");

  return (
    <>
      {children({
        dims,
        ref,
      })}
    </>
  );
}

export default ReactResizeObserver;

type IsFunction<T> = T extends (...args: any[]) => any ? T : never;

const isFunction = <T extends {}>(value: T): value is IsFunction<T> =>
  typeof value === "function";
