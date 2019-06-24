import GlobalRef from "./GlobalRef";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ReduxRef from "./ReduxRef";
import { get, set } from "lodash";

export default function useGlobalRef(path: string | Array<string>): GlobalRef {
  var updater = useSelector((state: any) =>
    get(state.__chomtana_global_states, path)
  );
  //console.log(updater);
  return new GlobalRef(path);
}
