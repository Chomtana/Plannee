import { createStore } from "redux";
import reducer from './reducer'
import createGlobalRef from './refsystem/createGlobalRef';

setTimeout(()=>{
  createGlobalRef("records",[
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
  ])

  createGlobalRef("categories",[
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
  ]);
},1);

export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());