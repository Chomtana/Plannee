import React from "react";
import VBox from "../../component/VBox";
import usePointer from './../../pointer/usePointer';
import Summary from './Summary/index';
import Today from './Today/index';
import WeeklyBudget from './WeeklyBudget/index';

export default function Main(props) {
  var extra = {};
  extra.records = usePointer("records");
  extra.categories = usePointer("categories");

  return (
    <VBox gap={10}>
      <Summary {...props} {...extra} />
      <Today {...props} {...extra} />
      <WeeklyBudget {...props} {...extra} />
    </VBox>
  );
}
