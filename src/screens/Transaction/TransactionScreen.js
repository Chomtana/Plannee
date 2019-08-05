import React from "react"
import TransactionDay from "./TransactionDay/TransactionDay";
import usePointer from "../../pointer/usePointer";

export default function TransactionScreen(props) {
  const records = usePointer("records")
  
  const extra_params = {records}
  
  return (<div style={{background: "white", height: "100%"}}>
    <TransactionDay {...props} {...extra_params}></TransactionDay>
  </div>)
}