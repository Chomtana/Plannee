import GlobalRef from "./GlobalRef";
export default function createGlobalRef(path, value) {
    var ref = new GlobalRef(path);
    if (typeof value !== "undefined") {
        ref.set(value);
    }
    return ref;
}
