import { set, get, cloneDeep } from 'lodash'

import FastfoodIcon from '@material-ui/icons/Fastfood';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTshirt } from '@fortawesome/free-solid-svg-icons'
import React from 'react';

// The initial state of the App
export const initialState = {
  categories: [
    {
      icon: "fastfood",
      icon_type: "material",
      icon_background: "#ffaa00",
      text: "อาหาร และ เครื่องดื่ม"
    },
    {
      icon: "flight",
      icon_type: "material",
      icon_background: "#007AFF",
      text: "การเดินทาง"
    },
    {
      icon: "tshirt",
      icon_type: "fa",
      icon_background: "#ff00a5",
      text: "เครื่องแต่งกาย และ เครื่องประดับ"
    },
    {
      icon: "shopping_basket",
      icon_type: "material",
      icon_background: "#b600ff",
      text: "ข้าวของเครื่องใช้ในชีวิตประจำวัน"
    },
    {
      icon: "music_video",
      icon_type: "material",
      icon_background: "#26a500",
      text: "ความบันเทิง"
    },
    {
      icon: "help_outline",
      icon_type: "material",
      icon_background: "#414042",
      text: "อื่นๆ"
    }
  ],
  records: [
    {
      category: {
        icon: "fastfood",
        icon_type: "material",
        icon_background: "#ffaa00",
        text: "อาหาร และ เครื่องดื่ม"
      },
      note: "กินข้าว ICanteen",
      value: 40
    }
  ],
  user: {
    name: 'Pichet',
    saving: 500,
    goal: 10000,
    achivement: ['Saving 500', 'Saving 1000'],
    age: 30,
    gender: 'Male',
    email: '1234@gmail.com'
  },

  _route: {
    path: []
  },
};

function appReducer(state = initialState, action) {
  if (!action) return state;
  //console.log("reducer", state)
  switch (action.type) {
    case "add_record": {
      var records = cloneDeep(state.records);
      records.push({
        category: "",
        note: "",
        value: null,
        isnew: true
      });

      return { ...state, records };
    }
    case "change_record": {
      var records = cloneDeep(state.records);
      records[action.i] = action.data;
      if (!action.preserve_isnew) {
        records[action.i].isnew = false;
      }

      return { ...state, records };
    }
    case "delete_record": {
      var records = cloneDeep(state.records);
      records.splice(action.i)

      return { ...state, records };
    }

    case "change_user": {
      var user = cloneDeep(state.user)
      user = action.data
      return { ...state, user }
    }

    case "$Chomtana.RefCommit": {
      let newState = cloneDeep(state);
      let newVal = cloneDeep(action.value);
      set(newState, action.path, newVal);
      return newState;
    }
    case "$Chomtana.RefStage": {
      //console.log("startStage", state);
      let newState = cloneDeep(state);
      let newVal = cloneDeep(action.value);
      //console.log(newState, newVal);
      set(newState, ["__chomtana_ref_stage", ...action.path], newVal);
      return newState;
    }
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
    case "$Chomtana.Router.Link": {
      let newState = cloneDeep(state);
      newState._route.path = cloneDeep(action.to);
      return newState;
    }
    default:
      return state;
  }
}

export default appReducer;