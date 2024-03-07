// import { VDOM, VNode } from "./type";

export type VNode = string | number | VDOM | null | undefined;
export type VDOM = {
  type: string;
  props: Record<string, any> | null;
  children: VNode[];
};

type Component = (props?: Record<string, any>) => VDOM;

export const h = (
  component: string | Component,
  props: Record<string, any> | null,
  ...children: VNode[]
) => {
  if (typeof component === "function") {
    return component({ ...props, children });
  }
  const arr = children.flat().map((child) => {
    if (typeof child === "string" || typeof child === "number") {
      return child;
    } else if (child === undefined || child === null) {
      return { type: "fragment", props: null, children: [] };
    } else if (typeof child === "object") {
      return { ...child };
    }
  });
  return { type: component, props, children: arr };
};
