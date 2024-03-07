import { VDOM } from "../jsx/jsx-runtime/type";
import { updateElement } from "./diff";
import type { Component } from "./types";
import { shallowEqual } from "./utils/object";

interface IRenderInfo {
  $root: HTMLElement | null;
  component: null | Component;
  currentVDOM: VDOM | null;
}

interface IOptions {
  states: any[];
  stateHook: number;
}

const domRenderer = () => {
  const options: IOptions = {
    states: [],
    stateHook: 0,
  };
  const renderInfo: IRenderInfo = {
    $root: null,
    component: null,
    currentVDOM: null,
  };

  const resetOptions = () => {
    options.states = [];
    options.stateHook = 0;
  };

  const _render = () => {
    const { $root, currentVDOM, component } = renderInfo;
    if (!$root || !component) return;

    const newVDOM = component();
    updateElement($root, newVDOM, currentVDOM);
    options.stateHook = 0;
    renderInfo.currentVDOM = newVDOM;
  };

  const render = (root: HTMLElement, component: Component) => {
    resetOptions();
    renderInfo.$root = root;
    renderInfo.component = component;
    _render();
  };

  const useState = <T>(initialState?: T) => {
    const { stateHook: index } = options;
    const state = (options.states[index] ?? initialState) as T;
    const setState = (newState: T) => {
      queueMicrotask(() => {
        if (shallowEqual(state, newState)) return;
        options.states[index] = newState;
        _render();
      });
    };
    options.stateHook += 1;
    return [state, setState] as const;
  };

  return { useState, render };
};

export const { useState, render } = domRenderer();
