import { MutableRefObject, ReactNode } from "react";

export type Dims = {
  width: number | null;
  height: number | null;
};

export type Options = {
  dims: Dims;
  ref: MutableRefObject<HTMLElement | null>;
};

export type ReactResizeObserverProps = {
  children: (options: Options) => ReactNode;
};
