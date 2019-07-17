import React from "react";
import Item from "./Item";
import VBox from "./../../../component/VBox";
import sumByCategory from "../../../action/sumByCategory";

export default function WeeklyBudget(props) {
  var sum_by_category = sumByCategory(props.records, props.categories);

  var total = 0;
  for (var x in sum_by_category) total += sum_by_category[x];

  return (
    <div style={props.style}>
      <VBox gap={10} style={{ backgroundColor: "white", padding: 10 }}>
        <div>Weekly Budget</div>
        {props.categories.map(category => (
          <Item
            {...props}
            category={category}
            sum={sum_by_category[category("name")()]}
            percent={((sum_by_category[category("name")()] || 0) / total) * 100}
          />
        ))}
      </VBox>
    </div>
  );
}
