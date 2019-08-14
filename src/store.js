import { createStore } from "redux";
import reducer from './reducer'
import createGlobalPointer from './pointer/createGlobalPointer';
import pointerStore from './pointer/pointerStore';
import pointerReducer from './pointer/pointerReducer';
import globalPointer from "./pointer/globalPointer";

import wireFirebase from "./wireFirebase"

var store = pointerStore(pointerReducer(reducer), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;

if (window.location.protocol.startsWith("http")) {
  var locationfrag = window.location.pathname.split("/");
  locationfrag = locationfrag.filter(frag=>frag != "");
  store.dispatch({type: "$Chomtana.Router.Link", to: locationfrag})
}

var user_detail = createGlobalPointer("user_detail", {
  uid: localStorage.getItem("uid") || "testuser",
  email: localStorage.getItem("email") || "",
  pic: localStorage.getItem("pic") || null,
  name: localStorage.getItem("name") || "Your Name"
});

window.firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    user_detail("name").set(user.displayName);
    user_detail("email").set(user.email);
    user_detail("pic").set(user.photoURL);
    //emailVerified = user.emailVerified;
    user_detail("uid").set(user.uid);
  } else {
    // No user is signed in.
    user_detail("name").set("Your Name");
    user_detail("email").set("");
    user_detail("pic").set(null);
    //emailVerified = user.emailVerified;
    user_detail("uid").set("testuser");
  }
});

var line_detail = createGlobalPointer("line_detail", false);

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

var deposit = createGlobalPointer("deposit", [])

window.liff.init(
  data => {
    // Now you can call LIFF API
    const userId = data.context.userId;
    window.liff.getProfile()
    .then(profile => {
      line_detail("name").set(profile.displayName);
      line_detail("pic").set(profile.pictureUrl);
      line_detail("userId").set(profile.userId);
      line_detail("statusMessage").set(profile.statusMessage);
    })
    .catch((err) => {
      console.log('error', err);
    });
  },
  err => {
    // LIFF initialization failed
    console.log("this is not liff");
  }
);

export const record_template = {
  category: {
    icon: "fastfood",
    icon_type: "material",
    icon_background: "#ffaa00",
    name: "อาหาร และ เครื่องดื่ม"
  },
  note: "",
  value: 0,
  date: new Date(),
  is_revenue: 0
}

export const nav_title = {
  [["goal"]]: "Saving Goal"
}

function initWireFirebase() {
  if (user_detail("uid")() && user_detail("uid")() != "testuser") {
    wireFirebase(record,"records",[
      /*{
        category: {
          icon: "fastfood",
          icon_type: "material",
          icon_background: "#ffaa00",
          name: "อาหาร และ เครื่องดื่ม"
        },
        note: "ข้าวผัดปู",
        value: 40,
        is_revenue: 0,
        date: new Date()
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
        is_revenue: 0,
        date: new Date()
      }*/
    ])
    //wireFirebase()
    
    wireFirebase(category,"categories",[
      {
        icon: "fastfood",
        name: "อาหาร และ เครื่องดื่ม"
      },
      {
        icon: "travel",
        name: "การเดินทาง"
      },
      {
        icon: "tshirt",
        name: "เครื่องแต่งกาย และ เครื่องประดับ"
      },
      {
        icon: "shopping",
        name: "ข้าวของเครื่องใช้ในชีวิตประจำวัน"
      },
      {
        icon: "music",
        name: "ความบันเทิง"
      },
      {
        icon: "other",
        name: "อื่นๆ"
      }
    ])
    
    wireFirebase(deposit,"deposit",{
      "กองทุน KDLTF": {
        value: 0,
        recommend: 100000,
        //recommend() {return 100000}
      },
      /*"KEQRMF": {
        value: 0,
        recommend: 2000,
        recommend() {
          return this.value < 1000 ? 2000 : this.value / 2;
        }
      },*/
      "ตราสารหนี้": {
        value: 0,
        recommend: 5000,
        /*recommend() {
          return Math.max(5000, this.value * 2)
        }*/
      },
      "แนะนำซื้อประกันชีวิต AXA": {
        value: 0,
        recommend: 0,
        /*recommend() {
          return this.value / 2;
        }*/
      }
    });
  }
}
initWireFirebase();

user_detail.hook("afterSetBP", ()=>setTimeout(initWireFirebase, 100));