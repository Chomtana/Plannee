import { cloneDeep } from 'lodash'

// The initial state of the App
export const initialState = {
  records: [
    {
      category: "อาหารและเครื่องดื่ม",
      note: "กินข้าว ICanteen",
      value: 40
    }
  ]
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case "add_record": {
      var records = cloneDeep(state.records);
      records.push({
        category: "",
        note: "",
        value: null
      });

      return {...state,records};
    }
    case "change_record": {
      var records = cloneDeep(state.records);
      records[action.i] = action.data;

      return {...state,records};
    }
    case "delete_record": {
      var records = cloneDeep(state.records);
      records.splice(action.i)

      return {...state,records};
    }
    default:
      return state;
  }
}

export default appReducer;