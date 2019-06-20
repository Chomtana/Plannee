import React from 'react'
import { useSelector } from 'react-redux';

import { isEqual } from 'lodash';
import Slide from '@material-ui/core/Slide';


export default function Route(props) {
  const state = useSelector(state=>state._route);

  function calculateShow() {
    if (props.exact) {
      return isEqual(state.path,props.path);
    } else {
      var propspath = props.path;
      var statepath = state.path;
      if (typeof propspath == "string") propspath = propspath.split("/");
      if (typeof statepath == "string") statepath = statepath.split("/");
      if (propspath.length < statepath.length) {
        statepath.slice(0,propspath.length);
        return isEqual(statepath,propspath);
      } else return false;
    }
  }

  const show = calculateShow()
  console.log(show)

  return show ? <props.component /> : <></>

  
}