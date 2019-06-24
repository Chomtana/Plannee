import GlobalRef from "./GlobalRef";
import { useSelector } from "react-redux";
import { get } from "lodash";
export default function useGlobalRef(path) {
    var updater = useSelector((state) => get(state.__chomtana_global_states, path));
    //console.log(updater);
    return new GlobalRef(path);
}
