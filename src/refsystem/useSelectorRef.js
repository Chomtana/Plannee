import ReduxRef from "./ReduxRef";
export default function useSelectorRef(path) {
    return new ReduxRef(path);
}
