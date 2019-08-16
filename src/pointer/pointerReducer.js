import { cloneDeep, get, set, merge } from "lodash";

export var initialState = {
  __chomtana_global_states: {},
  __chomtana_global_op: {},
  __chomtana_ref_states: {
    _local_next_id: 1
  }
};

export function buildReducer(oldReducer) {
  if (oldReducer) initialState = merge(initialState, oldReducer());
  //console.log(initialState);
  return function reducer(state = initialState, action) {
    switch (action.type) {
      case "$Chomtana.NewStateRef": {
        let newState = cloneDeep(state);
        newState.__chomtana_ref_states[
          "local_" + newState.__chomtana_ref_states._local_next_id++
        ] = action.value;
        //console.log("dispatched", newState);
        return newState;
      }
      case "$Chomtana.UpdateGlobalState": {
        let newState = cloneDeep(state);
        let oldrandomval = get(newState.__chomtana_global_states, action.path);
        let randomval = Math.random();
        while (randomval === oldrandomval) randomval = Math.random();
        set(newState.__chomtana_global_states, action.path, randomval);
        //console.log("gbnew", newState);
        return newState;
      }
      case "$Chomtana.UpdateGlobalOp": {
        //console.log("update", action.path);
        let newState = cloneDeep(state);
        let oldrandomval = get(newState.__chomtana_global_op, action.path);
        let randomval = Math.random();
        while (randomval === oldrandomval) randomval = Math.random();
        set(newState.__chomtana_global_op, action.path, randomval);
        //console.log("gbnew", newState);
        return newState;
      }
      default:
        if (typeof oldReducer === "function") return oldReducer(state, action);
        else return state;
    }
  };
}

export default function pointerReducer(input) {
  return buildReducer(input);
}
