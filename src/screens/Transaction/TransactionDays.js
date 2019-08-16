import React from "react";
import TransactionDay from "./TransactionDay/TransactionDay";
import recordsGroupBy from "../../action/recordsGroupBy";
import VBox from "../../component/VBox";
import {map} from "lodash";
import recordsMonthYear from "../../action/recordsMonthYear";

export default function TransactionDays(props) {
  
  const selectedMonth = props.selectedMonth();
  const selectedYear = props.selectedYear();
  const filteredGroups = recordsMonthYear(props.records, selectedMonth, selectedYear);
  
  return <VBox>
    {!filteredGroups && <div style={{textAlign: "center"}}>ไม่มีรายการในช่วงเวลาที่คุณเลือก</div>}
    {filteredGroups && filteredGroups.__days.map(day=>
      <TransactionDay records={filteredGroups[day]} date={new Date(filteredGroups[day][0]("date")())} key={filteredGroups[day][0].pureid}></TransactionDay>
    )}
  </VBox> 
}