export default function recordsGroupBy(records, year, month, day) {
  if (typeof year === "undefined") year = true;
  if (typeof month === "undefined") month = true;
  if (typeof day === "undefined") day = true;
  if (!year && !month && !day) return records;
  var res = {};
  if (year) {
    for(var record of records) {
      var key = new Date(record("date")()).getFullYear();
      if (!res[key]) res[key] = [];
      res[key].push(record("date")());
    }
    var keys = [];
    for(var x in records) {
      keys.push(x);
      res[x] = recordsGroupBy(res[x], false, month, day);
    }
    keys.sort((a,b)=>parseInt(a)-parseInt(b));
    res.__years = keys;
    return res;
  } else if (month) {
    for(var record of records) {
      var key = new Date(record("date")()).getMonth() + 1;
      if (!res[key]) res[key] = [];
      res[key].push(record("date")());    
    }
    var keys = [];
    for(var x in records) {
      keys.push(x);
      res[x] = recordsGroupBy(res[x], false, false, day);
    }
    keys.sort((a,b)=>parseInt(a)-parseInt(b));
    res.__months = keys;
    return res;
  } else if (day) {
    for(var record of records) {
      var key = new Date(record("date")()).getDate();
      if (!res[key]) res[key] = [];
      res[key].push(record("date")());  
    }
    var keys = [];
    for(var x in records) {
      keys.push(x);
      res[x] = recordsGroupBy(res[x], false, false, false);
    }
    keys.sort((a,b)=>parseInt(a)-parseInt(b));
    res.__days = keys;
    return res;
  }
}