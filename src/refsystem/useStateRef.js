import StateRef from "./StateRef";
export default function useStateRef(value) {
    return new StateRef(value);
}
