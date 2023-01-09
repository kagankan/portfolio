import { createStorage } from "./storage";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentProps<Component extends (_props: any) => any> = Parameters<Component>[0];

export const LOADING_END_EVENT_TYPE = "loading-end";

export const isReducedMotion = () =>
  getComputedStyle(document.documentElement).getPropertyValue("--reduced-motion").trim() === "reduce";

export const themeStorage = createStorage({ "reduced-motion": "string", "color-scheme": "string" });
