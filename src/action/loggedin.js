import usePointer from "../pointer/usePointer";
import globalPointer from "../pointer/globalPointer";

export default function loggedin(user_detail) {
  if (!user_detail) {
    user_detail = globalPointer("user_detail");
  }
  if (!user_detail || !user_detail.isReady) return false;
  const uid = user_detail("uid")();
  if (!uid || uid === "testuser") return false;
  return true;
}