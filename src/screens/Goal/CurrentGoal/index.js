import React from "react"
import VBox from "../../../component/VBox";
import LCRBox from "../../../component/LCRBox";
import HBox from "../../../component/HBox";
import GoalDetailDeep from './GoalDetailDeep';
import GoalTime from "./GoalTime";
import GoalMoney from './GoalMoney';

function Title(props) {
  return <LCRBox center={<div><b style={{fontSize: 16}}>Current Goal</b></div>} style={{marginBottom: 10}} />
}

export default function CurrentGoal(props) {
  return (
    <VBox style={{backgroundColor: "white", padding: 10}}>
      <Title {...props}></Title>
      <GoalDetailDeep {...props}></GoalDetailDeep>
      <HBox>
        <GoalTime {...props}></GoalTime>
        <GoalMoney {...props}></GoalMoney>
      </HBox>

    </VBox>
  )
}