import React from "react";
import LCRBox from "../../../component/LCRBox";
import VBox from "./../../../component/VBox";

import CategoryIcon from "./../../../component/CategoryIcon";
import CustomLinearProgress from "../../../component/CustomLinearProgress";

export default function Item(props) {
  return (<div style={props.style}>
    <LCRBox
      left={
        <div>
          <CategoryIcon category={props.category} />
        </div>
      }
      center={
        <VBox style={{marginLeft: 20, marginRight: 20}}>
          <div>{props.category("name")()}</div>
          <div>
            <CustomLinearProgress variant="determinate" value={props.percent} />
          </div>
        </VBox>
      }
      right={<div style={{alignSelf: "flex-end", marginBottom: 3}}>{props.sum || 0}</div>}
    />
  </div>);
}
