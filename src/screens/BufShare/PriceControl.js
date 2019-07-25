import React from "react"
import HBox from "../../component/HBox";
import { Input } from "@material-ui/core";
import BasicInput from "../../component/BasicInput";

export default function PriceControl(props) {
  return (
    <HBox>
      <div>
        <BasicInput label="มากี่คน" value={props.data("mancount")} setWrapper={parseInt}></BasicInput>  
      </div>
      <div>
        <BasicInput label="ทั้งหมดกี่บาท" value={props.data("mancount")} setWrapper={parseFloat}></BasicInput>
      </div>
    </HBox>
  )
}