import React, { useState } from "react";

import LCRBox from "../LCRBox";
import VBox from "../VBox";
import HBox from "../HBox";

import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Collapse, Input, Fade } from "@material-ui/core";

import FastfoodIcon from "@material-ui/icons/Fastfood";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { useSelector } from 'react-redux'

export default function NotEditing(props) {

  const user = useSelector(state => state.user)
  return (
    <>
      {(props.show) &&
        <VBox gap={100} style={{ backgroundColor: 'white' }}>
          <center>
            <h1 style={{ fontSize: '50px' }}>Hello Profile</h1>
          </center>
          <HBox>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
          </HBox>
          <HBox>
            <h1>Gender: {user.gender}</h1>
            <h1>Email: {user.email}</h1>
          </HBox>
          <HBox>
            <h1></h1>
            <h1>Saving: {user.saving}/ Goal: {user.goal}</h1>
          </HBox>
          <HBox>
            <center>
              <Button size="medium" style={{ color: "darkred" }}
                onClick={props.onEditing}>
                Config
              </Button>
            </center>
          </HBox>
        </VBox>
      }
    </>
  )
} 
