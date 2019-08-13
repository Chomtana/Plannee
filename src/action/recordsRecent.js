export default function recordsRecent(records, numOfDays) {
  if (typeof numOfDays === "undefined") numOfDays = 3;
  
  return records.filter(record => new Date().addDays(-(numOfDays-1)) <= new Date(record.date))
}