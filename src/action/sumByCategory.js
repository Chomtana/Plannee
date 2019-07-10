import globalPointer from "../pointer/globalPointer";

export default function sumByCategory(records, categories) {
  if (!records) records = globalPointer("records")
  if (!categories) categories = globalPointer("categories")

  var data = {}

  for(var category of categories) {
    var sum = 0;
    for(var record of records) {
      if (record("category")("name")() == category("name")()) {
        sum += record("value")();
      }
    }
    if (sum>0) {
      data[category("name")()] = sum;
    }
  }

  return data;
}