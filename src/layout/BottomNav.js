import React, { useState } from "react";
import HBox from "../component/HBox";
import Link from "../router/Link";
import { merge, cloneDeep } from "lodash";
import useStatePointer from "../pointer/useStatePointer";
import Slide from "@material-ui/core/Slide";
import { useSelector } from "react-redux";
import RecordUpdate from "./../component/RecordUpdate";
import usePointer from "../pointer/usePointer";
import { record_template } from "../store";
import globalPointer from "../pointer/globalPointer";

import {map} from "lodash";
import { Dialog, Fade, DialogTitle } from "@material-ui/core";

function Btn(props) {
  return (
    <div style={merge({ textAlign: "center" }, props.style)}>
      <Link to={props.link}>
        <img
          src={
            "./img/bottomnav/" +
            (props.active ? "active" : "notactive") +
            "/" +
            props.img +
            ".png"
          }
          height={props.height || 30}
        />
      </Link>
    </div>
  );
}

function Home(props) {
  return <Btn {...props} img="home" link={["home"]} />;
}

function Goal(props) {
  return <Btn {...props} img="goal" link={["goal"]} />;
}

function Add_Camera(props) {
  //console.log("add run");

  return (
    <div style={merge({ textAlign: "center" }, props.style)} onClick={() => {}}>
      <img src={"./img/bottomnav/camera.png"} height={45} />
    </div>
  );
}

function Add_Microphone(props) {
  //console.log("add run");
  
  const [listeningShow,setListeningShow] = useState(false);

  return (
    <div
      style={merge({ textAlign: "center" }, props.style)}
      onClick={() => {
        function performAdd(res) {
          console.log("performAdd",res);
          
          var nlpres = window.split_and_find(res);
          if (!nlpres) {
            alert("ไม่สามารถถอดคำพูดได้ กรุณาพูดใหม่ ตัวอย่างการพูด: กินข้าวไข่เจียว 30 บาท")
            return;
          }
          var category_name = nlpres.typeOfText;
          var note = nlpres.text;
          var value = nlpres.price;
          if (!category_name) category_name = "อื่นๆ"

          var category = globalPointer("categories").find({
            name: category_name
          })

          if (category) {
            globalPointer("records").push({
              category: category(),
              note,
              value,
              date: new Date(),
              is_revenue: 0
            })
            setListeningShow(false);
          } else {
            alert("ระบบเกิดความผิดพลาดในขั้นตอนการเชื่อมโยงหมวดหมู่ที่เก็บไว้ในระบบ")
          }
        }
        
        function start() {
          window.plugins.speechRecognition.startListening(
            res => {
              performAdd(res)
            },
            err => {
              alert("Start listening fail\n" + JSON.stringify(err));
              //testNetwork();
            },
            {
              language: "th-TH",
              prompt: "Test prompt"
            }
          );
        }
        
        function doWebKit() {
          if (('webkitSpeechRecognition' in window)) {
            var recognition = new window.webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            
            recognition.onstart = function() {
              //recognizing = true;
              //alert("start")
              setListeningShow(true);
            };
            
            recognition.onerror = function(event) {
              if (event.error == 'no-speech') {
                alert("ขอโทษค่ะ เราไม่ได้ยินเสียงขิงคุณ")
              }
              if (event.error == 'audio-capture') {
                alert("กรุณาต่อไมโครโฟนด้วย เราไม่พบไมโครโฟนของคุณ")
              }
              if (event.error == 'not-allowed') {
                alert("กรุณาอนุญาตการอัดเสียงด้วย")
              }
              //setListeningShow(false);
            };
            
            recognition.onend = function(event) {
              //setListeningShow(false);
            }
            
            recognition.onresult = function(event) {
              console.log(event.results);
              var results = map(event.results[0],result=>result.transcript);
              performAdd(results);
              /*var interim_transcript = '';
              if (typeof(event.results) == 'undefined') {
                recognition.onend = null;
                recognition.stop();
                upgrade();
                return;
              }
              for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                  final_transcript += event.results[i][0].transcript;
                } else {
                  interim_transcript += event.results[i][0].transcript;
                }
              }
              final_transcript = capitalize(final_transcript);
              final_span.innerHTML = linebreak(final_transcript);
              interim_span.innerHTML = linebreak(interim_transcript);
              if (final_transcript || interim_transcript) {
                showButtons('inline-block');
              }*/
            };
            
            recognition.lang = "th-TH";
            recognition.start();
            
          } else {
            alert("โปรดลง app หรือใช้ browser google chrome")
          }
        }
        
        //alert("Test run");
        if (window.plugins) {
          //alert("plugins found");
          window.plugins.speechRecognition.isRecognitionAvailable(
            () => {
              //alert("Available");
              window.plugins.speechRecognition.hasPermission(
                hasPermission => {
                  if (hasPermission) {
                    //alert("Has permission");
                    start();
                  } else {
                    window.plugins.speechRecognition.requestPermission(
                      () => {
                        //alert("Request permission success");
                        start();
                      },
                      () => alert("Request permission fail")
                    );
                  }
                },
                () => alert("Check has permission failed")
              );
            },
            () => {
              alert("Not available");
            }
          );
        } else {
          doWebKit();
        }
      }}
    >
      <img src={"./img/bottomnav/microphone.png"} height={50} />
      <Dialog
        open={listeningShow}
        keepMounted
      >
        <DialogTitle>กรุณาพูดสิ่งที่ต้องการเพิ่ม</DialogTitle>
      </Dialog>
    </div>
  );
}

function Add_Manual(props) {
  //console.log("add run");
  return (
    <div
      style={merge({ textAlign: "center" }, props.style)}
      onClick={() => {
        props.isAdding.set(true);
      }}
    >
      <img src={"./img/bottomnav/manualadd.png"} height={45} />
    </div>
  );
}

function Add_Deposit(props) {
  //console.log("add run");
  return (
    
      <div
        style={merge({ textAlign: "center" }, props.style)}
        onClick={() => {
          //props.isAdding.set(true);
        }}
      >
      <Link to={["deposit"]}>
        <img src={"./img/bottomnav/deposit.jpg"} height={60} style={{borderRadius: "50%"}} /></Link>
      </div>
    
  );
}

function AddBar(props) {
  //console.log("addbar");
  //if (!props.showAddMenu()) return null;

  return (<>
    <Slide direction="up" in={props.showAddMenu()} mountOnEnter unmountOnExit>
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 60,
          marginLeft: "auto",
          marginRight: "auto",
          width: 200 /* Need a specific value to work */
        }}
      >
        <HBox>
          <Add_Camera {...props} />
          <Add_Microphone {...props} />
          <Add_Manual {...props} />
        </HBox>
      </div>
    </Slide>
    <Slide direction="up" in={props.showAddMenu()} mountOnEnter unmountOnExit>
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 120,
          marginLeft: "auto",
          marginRight: "auto",
          width: 200 /* Need a specific value to work */
        }}
      >
        <HBox>
          <Add_Deposit {...props} />
        </HBox>
      </div>
    </Slide>
  </>);
}

function Add(props) {
  //console.log("add run");

  return (
    <div
      style={merge({ textAlign: "center" }, props.style)}
      onClick={() => {
        props.showAddMenu.set(!props.showAddMenu());
        //console.log(props.showAddMenu());
      }}
    >
      <img
        src={
          "./img/bottomnav/" +
          (props.active ? "active" : "notactive") +
          "/add.png"
        }
        height={40}
      />
      <AddBar {...props} />
    </div>
  );
}

function Graph(props) {
  return <Btn {...props} img="graph" link={["summary"]} />;
}

function Settings(props) {
  return <Btn {...props} img="settings" link={["settings"]} />;
}

export default function BottomNav(props) {
  const showAddMenu = useStatePointer(false);
  const route = useSelector(state => state._route.path);

  const records = usePointer("records");

  const record = useStatePointer(cloneDeep(record_template));

  const isAdding = useStatePointer(false);

  //console.log(route, route.length == 0 || route[0] == "home");

  return (
    <HBox
      style={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        height: 50,
        backgroundColor: "#8D8D8B"
      }}
    >
      <Home {...props} active={route.length == 0 || route[0] == "home"} />
      <Goal {...props} />
      <Add {...props} showAddMenu={showAddMenu} isAdding={isAdding} />
      <Graph {...props} />
      <Settings {...props} />

      {isAdding && (
        <RecordUpdate
          {...props}
          open={isAdding}
          record={record}
          onSubmit={() => {
            records.push(record());
            record.set(cloneDeep(record_template));
          }}
          onCancel={() => {
            record.set(cloneDeep(record_template));
          }}
        />
      )}
    </HBox>
  );
}
