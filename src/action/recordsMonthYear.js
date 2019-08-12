import recordsGroupBy from "./recordsGroupBy";

export default function recordsMonthYear(records, month, year) {
  const recordGroups = recordsGroupBy(records);
  
  return recordGroups && recordGroups[year] && recordGroups[year][month];

}