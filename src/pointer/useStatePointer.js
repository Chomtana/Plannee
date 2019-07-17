import { toPath, get } from "lodash";
import { useSelector } from "react-redux";
import createGlobalPointer, { pointerStore } from "./createGlobalPointer";
import usePointer from "./usePointer";
import { useState } from 'react';

var locali = 1;

export default function useStatePointer(value) {
  const [path,setPath] = useState("$local"+locali);
  if (path === "$local"+locali) {
    createGlobalPointer(path, value)
    locali++;
  }
  return usePointer(path);
}
