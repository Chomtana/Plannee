import { cloneDeep } from 'lodash'

import FastfoodIcon from '@material-ui/icons/Fastfood';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTshirt } from '@fortawesome/free-solid-svg-icons'
import React from 'react';

var TShirtIcon = () => <FontAwesomeIcon icon={faTshirt}></FontAwesomeIcon>

// The initial state of the App
export const initialState = {
  categories: [
    {
      icon: FastfoodIcon,
      icon_background: "#ffaa00",
      text: "อาหาร และ เครื่องดื่ม"
    },
    {
      icon: FlightTakeoffIcon,
      icon_type: "Entypo",
      icon_background: "#007AFF",
      text: "การเดินทาง"
    },
    {
      icon: TShirtIcon,
      icon_type: "MaterialCommunityIcons",
      icon_background: "#ff00a5",
      text: "เครื่องแต่งกาย และ เครื่องประดับ"
    },
    {
      icon: ShoppingBasketIcon,
      icon_type: "MaterialIcons",
      icon_background: "#b600ff",
      text: "ข้าวของเครื่องใช้ในชีวิตประจำวัน"
    },
    {
      icon: MusicVideoIcon,
      icon_type: "Foundation",
      icon_background: "#26a500",
      text: "ความบันเทิง"
    },
    {
      icon: HelpOutlineIcon,
      icon_type: "AntDesign",
      icon_background: "#414042",
      text: "อื่นๆ"
    }
  ],
  records: [
    {
      category: "อาหารและเครื่องดื่ม",
      note: "กินข้าว ICanteen",
      value: 40
    }
  ],

  _route: {
    path: []
  }
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case "add_record": {
      var records = cloneDeep(state.records);
      records.push({
        category: "",
        note: "",
        value: null,
        isnew: true
      });

      return {...state,records};
    }
    case "change_record": {
      var records = cloneDeep(state.records);
      records[action.i] = action.data;
      if (!action.preserve_isnew) {
        records[action.i].isnew = false;
      }

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