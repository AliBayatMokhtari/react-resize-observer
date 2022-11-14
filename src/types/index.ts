import { LegacyRef, MutableRefObject, ReactNode, Ref } from "react";

export type Dims = {
  width: number | null;
  height: number | null;
};

export type Api<TElement extends HTMLElement> = {
  dims: Dims;
  ref: MutableRefObject<TElement | null>;
};

export type ReactResizeObserverProps<TElement extends HTMLElement> = {
  children: (api: Api<TElement>) => ReactNode;
};
