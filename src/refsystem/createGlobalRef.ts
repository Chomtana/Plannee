import GlobalRef from "./GlobalRef";

export default function createGlobalRef(
  path: string | Array<string>,
  value?: any
) {
  var ref = new GlobalRef(path);
  if (typeof value !== "undefined") {
    ref.set(value);
  }
  return ref;
}
