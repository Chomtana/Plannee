import React from "react";
import HBox from "./HBox";
import LCRBox from "./LCRBox";
import CategoryIcon from './CategoryIcon';
import { merge } from 'lodash';

export default function Record(props) {
  //props.record
  return (
    <LCRBox
      left={<CategoryIcon category={props.record("category")} />}
      center={<div style={{marginLeft: 20}}>{props.record("note")()}</div>}
      right={<div style={{paddingRight: 50}}>{props.record("value")()}</div>}
      style={merge(props.style,{height: 50, paddingLeft: 20})}
    />
  );
}
