import globalPointer from "./pointer/globalPointer";

export default function wireFirebase(p,name,defaultValue) {
  var user_detail = globalPointer("user_detail");
  var uid = user_detail("uid")()
  console.log(uid);
  
  window.database.ref(uid+"/"+name).on('value', function(snapshot) {
    if (snapshot.exists()) {
      var val = snapshot.val();
      //p._mark["$Chomtana$lockHook_inner"] = true;
      p.set(val, {__firebaseSet: true});
      //p._mark["$Chomtana$lockHook_inner"] = false;
    } else {
      //p._mark["$Chomtana$lockHook_inner"] = true;
      p.set(defaultValue);
      //p._mark["$Chomtana$lockHook_inner"] = false;
    }
  });
  
  p.hook("afterSetBP", (value, oldVal, pp, options) => {
    if (!options || !options.__firebaseSet) {
      window.database.ref(uid+"/"+name).set(JSON.parse(JSON.stringify(p.get())));
    }
  })
}