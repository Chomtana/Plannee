import React, { useState } from "react";
import LCRBox from "../LCRBox";
import VBox from "../VBox";
import HBox from "../HBox";

import NotEditing from "./NotEditing";
import Editing from "./Editing";
import { useDispatch } from 'react-redux';

import RefContainer from './../../refsystem/RefContainer';

export default function RecordItem(props) {
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch()

  const refs = new RefContainer(props);

  return (
    <VBox {...props}>
      <NotEditing
        {...props} 
        {...refs}
        show={!editing} 
        onEdit={()=>setEditing(true)} 
        onDelete={()=>dispatch({type:"delete_record",i:props.i})}
      ></NotEditing>

      <Editing 
        {...props} 
        {...refs}
        show={editing} 
        onSubmit={()=>{
          setEditing(false)
        }}
        onCancel={()=>{
          setEditing(false)
        }}
        change_categories_i={props.change_categories_i}
      ></Editing>
    </VBox>
  );
}