import { createStore } from "redux";
import reducer from './reducer'
import createGlobalPointer from './pointer/createGlobalPointer';
import pointerStore from './pointer/pointerStore';
import pointerReducer from './pointer/pointerReducer';

export default pointerStore(pointerReducer(reducer), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

createGlobalPointer("records",[
  {
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
  }
])

createGlobalPointer("categories",[
  {
    icon: "fastfood",
    icon_type: "material",
    icon_background: "#ffaa00",
    name: "อาหาร และ เครื่องดื่ม"
  },
  {
    icon: "flight",
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
    icon: "shopping_basket",
    icon_type: "material",
    icon_background: "#b600ff",
    name: "ข้าวของเครื่องใช้ในชีวิตประจำวัน"
  },
  {
    icon: "music_video",
    icon_type: "material",
    icon_background: "#26a500",
    name: "ความบันเทิง"
  },
  {
    icon: "help_outline",
    icon_type: "material",
    icon_background: "#414042",
    name: "อื่นๆ"
  }
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