import ReduxRef from "./ReduxRef";

export default function useSelectorRef(path?: string): ReduxRef {
  return new ReduxRef(path);
}
