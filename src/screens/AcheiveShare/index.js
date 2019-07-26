import React from "react"
import usePointer from "../../pointer/usePointer";
import VBox from "../../component/VBox";
import { Button } from "@material-ui/core";

export default function AcheiveShare(props) {
  const line_detail = usePointer("line_detail")
  
  return (
    <VBox>
      <div style={{textAlign: "center"}}>
        <img src="./img/30.jpg" width="50%"></img> 
      </div>
      <div style={{textAlign: "center", fontSize: 20}}>
        {line_detail("name").isReady && <div>คุณ {line_detail("name")()}</div>}
        <div>ออมเงินได้ 30% ของเป้าหมายแล้ว</div>
        <Button variant="contained" color="primary" onClick={()=>{
          window.liff.sendMessages([
            {
              type:'text',
              text:line_detail("name")()+' ออมเงินได้ 30% ของเป้าหมายแล้ว ลองทำตามได้เลยที่ line://app/1602354510-okPyggmE?lineuid='+encodeURIComponent(line_detail("userId")())
            }
          ])
          .then(() => {
            console.log('message sent');
          })
          .catch((err) => {
            console.log('error', err);
          });
        }}>แชร์ให้เพื่อนรู้</Button>
      </div>
    </VBox>
  )
}