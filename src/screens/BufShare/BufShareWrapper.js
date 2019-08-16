import React from "react";
import { useSelector } from "react-redux";
import BufShare from ".";

export default function BufShareWrapper(props) {
  const route = useSelector(state => state._route.path);
  const buf_id = route[route.length - 1];
  
  return <BufShare buf_id={buf_id}></BufShare>
}