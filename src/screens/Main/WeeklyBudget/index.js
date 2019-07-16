import React from "react";
import Item from "./Item";
import VBox from './../../../component/VBox';
import sumByCategory from "../../../action/sumByCategory";

export default function WeeklyBudget(props) {
  var sum_by_category = sumByCategory(props.records, props.categories);

  return (<div style={props.style}>
    <VBox gap={10} style={{backgroundColor: "white", padding: 10}}>
      <div>Weekly Budget</div>
      {props.categories.map(category => (
        <Item {...props} category={category} total={sum_by_category[category("name")()]} />
      ))}
    </VBox></div>
  );
}
