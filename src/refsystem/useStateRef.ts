import StateRef from "./StateRef";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ReduxRef from "./ReduxRef";

export default function useStateRef(value: any): StateRef {
  return new StateRef(value);
}
