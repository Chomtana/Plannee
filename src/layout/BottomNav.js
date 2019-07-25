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

  return (
    <div
      style={merge({ textAlign: "center" }, props.style)}
      onClick={() => {
        function start() {
          window.plugins.speechRecognition.startListening(
            res => {
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
              } else {
                alert("ระบบเกิดความผิดพลาดในขั้นตอนการเชื่อมโยงหมวดหมู่ที่เก็บไว้ในระบบ")
              }

              /*if (!category_name) {
                alert("ไม่สามารถจำแนกประเภทได้ กรุณาพูดใหม่ ตัวอย่างการพูด: กินข้าวไข่เจียว 30 บาท")
              }*/
              //alert("Result: "+JSON.stringify(res))
              //alert("Result: " + JSON.stringify(window.split_and_find(res)));
              // if res is array of string find catagories each text


              //testNetwork();
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
              alert("start")
            };
            
            recognition.onerror = function(event) {
              alert("error")
            }
            
            /*recognition.onerror = function(event) {
              if (event.error == 'no-speech') {
                start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
                showInfo('info_no_speech');
                ignore_onend = true;
              }
              if (event.error == 'audio-capture') {
                start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
                showInfo('info_no_microphone');
                ignore_onend = true;
              }
              if (event.error == 'not-allowed') {
                if (event.timeStamp - start_timestamp < 100) {
                  showInfo('info_blocked');
                } else {
                  showInfo('info_denied');
                }
                ignore_onend = true;
              }
            };
            
            recognition.onend = function() {
              recognizing = false;
              if (ignore_onend) {
                return;
              }
              start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
              if (!final_transcript) {
                showInfo('info_start');
                return;
              }
              showInfo('');
              if (window.getSelection) {
                window.getSelection().removeAllRanges();
                var range = document.createRange();
                range.selectNode(document.getElementById('final_span'));
                window.getSelection().addRange(range);
              }
              if (create_email) {
                create_email = false;
                createEmail();
              }
            };*/
            
            recognition.onresult = function(event) {
              console.log(event.results);
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

function AddBar(props) {
  //console.log("addbar");
  //if (!props.showAddMenu()) return null;

  return (
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
  );
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

  console.log(route, route.length == 0 || route[0] == "home");

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
