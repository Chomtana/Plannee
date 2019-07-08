import React from "react";
import LCRBox from "../../../component/LCRBox";
import VBox from "./../../../component/VBox";

import CategoryIcon from './../../../component/CategoryIcon';

export default function Item(props) {
  return (
    <LCRBox
      left={
        <div>
          <CategoryIcon category={props.category} />
        </div>
      }
      center={<VBox />}
      right={<div>asdasd</div>}
    />
  );
}
