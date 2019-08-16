import React from 'react'
import { useDispatch } from 'react-redux';

export default function Link(props) {
  const dispath = useDispatch();
  return <span onClick={()=>{dispath({type: "$Chomtana.Router.Link", to: props.to})}}>{props.children}</span>
}