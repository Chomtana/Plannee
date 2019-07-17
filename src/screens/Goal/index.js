import React from "react"
import VBox from './../../component/VBox';
import CurrentGoal from "./CurrentGoal";
import PreviousGoal from "./PreviousGoal";
import BackButton from "../../component/BackButton";

export default function Goal(props) {
  return (
    <VBox gap={20}>
      <BackButton></BackButton>
      <CurrentGoal></CurrentGoal>
      <PreviousGoal></PreviousGoal>
    </VBox>
  )
}