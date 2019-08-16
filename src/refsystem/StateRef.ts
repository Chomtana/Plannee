import Ref, { RefExtension } from "./Ref";
import ReduxRef from "./ReduxRef";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

export default class StateRef extends ReduxRef {
  constructor(value: any) {
    /*const __chomtana_ref_states = useSelector(
      (state: any) => state.__chomtana_ref_states
    );*/
    const dispatch = useDispatch();
    const idselector = useSelector(
      (state: any) => state.__chomtana_ref_states._local_next_id
    );
    var id = idselector;
    const [hook, setHook] = useState(id);
    if (hook === id) {
      dispatch({ type: "$Chomtana.NewStateRef", value: value });
    } else {
      id = hook;
    }
    super(["__chomtana_ref_states", "local_" + id]);
  }
}
