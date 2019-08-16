import React from "react";
import monthi2text from "../../action/monthi2text";
import VBox from "../VBox";
import HBox from "../HBox";

function MonthChild(props) {
  return (
    <div
      class={
        "month-selector-item " +
        (props.selectedMonth() == props.monthi ? "active" : "")
      }
      onClick={() => props.selectedMonth.set(props.monthi)}
      style={props.style}
    >
      <div style={{ textAlign: "center" }}>{monthi2text(props.monthi)}</div>
    </div>
  );
}

export default function MonthSelector(props) {
  return (
    <VBox style={{ alignItems: "center" }}>
      <HBox>
        <MonthChild {...props} monthi={1} />
        <MonthChild {...props} monthi={2} />
        <MonthChild {...props} monthi={3} />
        <MonthChild {...props} monthi={4} />
      </HBox>
      <HBox>
        <MonthChild {...props} monthi={5} />
        <MonthChild {...props} monthi={6} />
        <MonthChild {...props} monthi={7} />
        <MonthChild {...props} monthi={8} />
      </HBox>
      <HBox>
        <MonthChild {...props} monthi={9} />
        <MonthChild {...props} monthi={10} />
        <MonthChild {...props} monthi={11} />
        <MonthChild {...props} monthi={12} />
      </HBox>
    </VBox>
  );
}
