import React, { useState } from "react";
import LCRBox from "../LCRBox";
import VBox from "../VBox";
import HBox from "../HBox";

import FastfoodIcon from "@material-ui/icons/Fastfood";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Collapse, Input } from "@material-ui/core";

import { merge } from "lodash";
import InlineInput from "../InlineInput";
import NotEditing from "./NotEditing";
import Editing from "./Editing";
import { useDispatch } from 'react-redux';

export default function RecordItem(props) {
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch()

  return (
    <VBox {...props}>
      <NotEditing
        {...props}
        show={!editing}
        onEdit={() => setEditing(true)}
        onDelete={() => dispatch({ type: "delete_record", i: props.i })}
      ></NotEditing>

      <Editing
        {...props}
        show={editing}
        onSubmit={() => {
          setEditing(false)
        }}
        onCancel={() => {
          setEditing(false)
        }}
        change_categories_i={props.change_categories_i}
      ></Editing>
    </VBox>
  );
}