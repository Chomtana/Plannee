import React from "react"
import usePointer from "../../pointer/usePointer";
import VBox from "../../component/VBox";
import { Button } from "@material-ui/core";

export default function AcheiveShare(props) {
  const line_detail = usePointer("line_detail")
  
  return (
    <VBox>
      <div style={{textAlign: "center"}}>
        <img src="https://www.goodnewsnetwork.org/wp-content/uploads/2015/12/Money-100-bills-CC-ree-pictures-of-money.jpg" width="50%"></img> 
      </div>
      <div style={{textAlign: "center", fontSize: 20}}>
        {line_detail("name").isReady && <div>คุณ {line_detail("name")()}</div>}
        <div>ออมเงินได้ 30% ของเป้าหมายแล้ว</div>
        <Button variant="contained" color="primary" onClick={()=>{
          window.liff.sendMessages([
            {
              type:'text',
              text:line_detail("name")()+' ออมเงินได้ 30% ของเป้าหมายแล้ว ลองทำตามได้เลยที่ '
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