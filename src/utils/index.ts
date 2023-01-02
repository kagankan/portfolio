// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentProps<Component extends (_props: any) => any> = Parameters<Component>[0];
