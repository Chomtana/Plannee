import React from "react"
import TransactionDay from "./TransactionDay/TransactionDay";
import usePointer from "../../pointer/usePointer";
import VBox from "../../component/VBox";
import DateSelector from "../../component/DateSelector/DateSelector";
import useStatePointer from "../../pointer/useStatePointer";
import TransactionDays from "./TransactionDays";

export default function TransactionScreen(props) {
  const records = usePointer("records")
  
  const extra_params = {records}
  
  const selectedMonth = useStatePointer(new Date().getMonth() + 1);
  const selectedYear = useStatePointer(new Date().getFullYear())
  
  return (<VBox>
    <DateSelector selectedMonth={selectedMonth} selectedYear={selectedYear}></DateSelector>
    <TransactionDays {...props} {...extra_params} selectedMonth={selectedMonth} selectedYear={selectedYear}></TransactionDays>
  </VBox>)
}