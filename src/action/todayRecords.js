export default function todayRecords(records) {
  //console.log(records(), records.filter(record => new Date(record.date).dateEquals(new Date())));
  return records.filter(record => new Date(record.date).dateEquals(new Date()))
}