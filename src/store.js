import { createStore } from "redux";
import reducer from './reducer'
import createGlobalPointer from './pointer/createGlobalPointer';
import pointerStore from './pointer/pointerStore';
import pointerReducer from './pointer/pointerReducer';
import globalPointer from "./pointer/globalPointer";

import wireFirebase from "./wireFirebase"

export default pointerStore(pointerReducer(reducer), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

createGlobalPointer("user_detail", {
  uid: localStorage.getItem("uid") || "testuser",
  email: localStorage.getItem("email") || ""
});

var user_detail = globalPointer("user_detail");

var record = createGlobalPointer("records",[
  /*{
    category: {
      icon: "fastfood",
      icon_type: "material",
      icon_background: "#ffaa00",
      name: "อาหาร และ เครื่องดื่ม"
    },
    note: "ข้าวผัดกุ้ง",
    value: 40,
    is_revenue: 0
  },
  {
    category: {
      icon: "tshirt",
      icon_type: "fa",
      icon_background: "#ff00a5",
      name: "เครื่องแต่งกาย และ เครื่องประดับ"
    },
    note: "ซื้อเสื้อแบรนเนม",
    value: 200,
    is_revenue: 0
  }*/
])

var category = createGlobalPointer("categories",[
])

export const record_template = {
  category: {
    icon: "fastfood",
    icon_type: "material",
    icon_background: "#ffaa00",
    name: "อาหาร และ เครื่องดื่ม"
  },
  note: "",
  value: 0,
  is_revenue: 0
}

export const nav_title = {
  [["goal"]]: "Saving Goal"
}

//if (user_detail("uid")() != "testuser") {
  wireFirebase(record,"records",[
    {
      category: {
        icon: "fastfood",
        icon_type: "material",
        icon_background: "#ffaa00",
        name: "อาหาร และ เครื่องดื่ม"
      },
      note: "ข้าวผัดปู",
      value: 40,
      is_revenue: 0
    },
    {
      category: {
        icon: "tshirt",
        icon_type: "fa",
        icon_background: "#ff00a5",
        name: "เครื่องแต่งกาย และ เครื่องประดับ"
      },
      note: "ซื้อเสื้อแบรนเนม",
      value: 200,
      is_revenue: 0
    }
  ])
  //wireFirebase()
  
  wireFirebase(category,"categories",[
    {
      icon: "fastfood",
      icon_type: "material",
      icon_background: "#ffaa00",
      name: "อาหาร และ เครื่องดื่ม"
    },
    {
      icon: "travel",
      icon_type: "material",
      icon_background: "#007AFF",
      name: "การเดินทาง"
    },
    {
      icon: "tshirt",
      icon_type: "fa",
      icon_background: "#ff00a5",
      name: "เครื่องแต่งกาย และ เครื่องประดับ"
    },
    {
      icon: "shopping",
      icon_type: "material",
      icon_background: "#b600ff",
      name: "ข้าวของเครื่องใช้ในชีวิตประจำวัน"
    },
    {
      icon: "music",
      icon_type: "material",
      icon_background: "#26a500",
      name: "ความบันเทิง"
    },
    {
      icon: "other",
      icon_type: "material",
      icon_background: "#414042",
      name: "อื่นๆ"
    }
  ])
//}