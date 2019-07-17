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

  const percentSaving = (user.saving / user.goal) * 100
  function savingBar() {
    return <hr style={{ width: 50 }}></hr>
  }
  return (
    <>
      {(props.show) &&
        <VBox gap={100} style={{ backgroundColor: 'white' }}>
          <center>
            <h1 style={{ fontSize: '50px' }}>Hello {user.name}</h1>
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
            <div><h1>Achivement: </h1>{
              user.achivement.map((data, i) => <h1>{data}</h1>)
            }</div>
          </HBox>
          <HBox>
            <h1 style={{ flexBasis: null }}>Saving: {user.saving}/ Goal: {user.goal}</h1>
          </HBox>
          <div style={{
            border: '1px solid gray',
            height: '50px'
          }}>
            <div style={{
              width: `${(percentSaving > 100) ? 100 : percentSaving}%`,
              backgroundColor: 'green',
              height: '100%'
            }}>
            </div>
          </div>
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
