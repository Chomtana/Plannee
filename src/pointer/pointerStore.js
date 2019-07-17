import { createStore } from "redux";

export var store;

export default function pointerStore(...args) {
  store = createStore(...args);
  return store;
}
