import React, { useState } from "react";
import LCRBox from "../LCRBox";
import VBox from "../VBox";
import HBox from "../HBox";
import InlineInput from '../InlineInput'
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Collapse, Input, Fade } from "@material-ui/core";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import FastfoodIcon from "@material-ui/icons/Fastfood";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useSelector, useDispatch } from 'react-redux'

export default function Editing(props) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const auth = true
  const [anchorEl, setAnchoeEl] = useState(null)
  const open = Boolean(anchorEl)

  const [name, setName] = useState(user.name)
  const saving = user.saving
  const goal = user.goal
  const achivement = user.achivement
  const [age, setAge] = useState(user.age)
  const [gender, setGender] = useState(user.gender)
  const [email, setEmail] = useState(user.email)

  function checkNumber(s) {
    return /([0-9])$/.test(s) || s === ""
  }

  return (
    <>
      {(props.show) &&
        <VBox gap={100} style={{ backgroundColor: 'white' }}>
          <center>
            <h1 style={{ fontSize: '50px' }}>Editting</h1>
          </center>
          <HBox>
            <h1>Name: <InlineInput value={name} onChange={(e) => setName(e.target.value)} /></h1>
            <h1>Age: <InlineInput value={age} onChange={(e) => {
              // console.log(e.target.value)
              if (checkNumber(e.target.value)) {
                setAge(e.target.value)
              }
              else {
                alert('Pls Enter Number')
              }
            }
            } /></h1>
          </HBox>
          <HBox>
            <h1>Gender:
            <FormControl variant="outlined">
                <Select
                  native
                  value={gender}
                  onChange={(e) => { setGender(e.target.value) }}
                >
                  <option value={'Male'}>Male</option>
                  <option value={'Female'}>Female</option>
                  <option value={'Other'}>Other</option>
                </Select>
              </FormControl>
            </h1>
            <h1>Email: <InlineInput value={email} onChange={(e) => setEmail(e.target.value)} /></h1>
          </HBox>
          <HBox>
            <h1></h1>
            <h1>Saving: {user.saving}/ Goal: {user.goal}</h1>
          </HBox>
          <HBox>
            <center>
              <Button size="medium" style={{ color: "darkred" }}
                onClick={() => {
                  var newUser = {
                    name, saving, goal, achivement, age, gender, email
                  }
                  dispatch({ type: 'change_user', data: newUser })
                  props.onSubmit(user)
                }}>
                Submit
              </Button>
            </center>
            <center>
              <Button size="medium" style={{ color: "darkred" }}
                onClick={props.onCancle}>
                Cancle
              </Button>
            </center>
          </HBox>
        </VBox>
      }
    </>
  )
} 