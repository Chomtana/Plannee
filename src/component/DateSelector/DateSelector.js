import React from "react";
import VBox from "../VBox";
import HBox from "../HBox";
import useStatePointer from "../../pointer/useStatePointer";
import monthi2text from "../../action/monthi2text";
import YearSelector from "./YearSelector";
import MonthSelector from "./MonthSelector";
import MiniMonthSelector from "./MiniMonthSelector";

export default function DateSelector(props) {
  const isEditing = useStatePointer(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: 10
      }}
    >
      {isEditing() ? (
        <VBox
          style={{ backgroundColor: "white", width: 350, borderRadius: 10 }}
        >
          <YearSelector {...props} isEditing={isEditing} />
          <MonthSelector {...props} isEditing={isEditing} />
        </VBox>
      ) : (
        <MiniMonthSelector {...props} isEditing={isEditing} />
      )}
    </div>
  );
}
