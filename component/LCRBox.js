import React from "react";
import HBox from "./HBox";

export default function LCRBox(props) {
  return (
    <HBox>
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
