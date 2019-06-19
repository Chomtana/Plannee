import React from "react";
import HBox from "./HBox";

import { merge } from 'lodash';

export default function LCRBox(props) {
  return (
    <HBox style={props.style}>
      {props.left ? React.cloneElement(props.left, { ratio: 0 }) : <div />}
      {props.center ? (
        React.cloneElement(props.center, { ratio: 1 })
      ) : (
        <div ratio={1} />
      )}
      {props.right ? React.cloneElement(props.right, { ratio: 0 }) : <div />}
    </HBox>
  );
}
