import React from "react"
import VBox from './../../component/VBox';
import CurrentGoal from "./CurrentGoal";
import PreviousGoal from "./PreviousGoal";
import BackButton from "../../component/BackButton";
import DepositScreen from "../DepositScreen";
import { Button } from "@material-ui/core";

export default function Goal(props) {
  return (
    <VBox gap={20}>
      <DepositScreen></DepositScreen>
      <CurrentGoal {...props}></CurrentGoal>
    </VBox>
  )
}