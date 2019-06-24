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
import { cloneDeep } from 'lodash'

export default function Editing(props) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [name, setName] = useState(user.name)
  const saving = user.saving
  const [goal, setGoal] = useState(user.goal)
  const achivement = user.achivement
  const [age, setAge] = useState(user.age)
  const [gender, setGender] = useState(user.gender)
  const [email, setEmail] = useState(user.email)
  function checkNumber(s) {
    return /([0-9])$/.test(s) || s === ""
  }

  const percentSaving = (saving / goal) * 100

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
            }
            } />
            </h1>
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
            <div><h1>Achivement: </h1>{
              user.achivement.map((data, i) => <h1>{data}</h1>)
            }</div>
          </HBox>
          <HBox>
            <h1 style={{ flexBasis: null }}>Saving: {user.saving}/Goal : <InlineInput value={goal} onChange={(e) => {
              if (checkNumber(e.target.value)) {
                setGoal(e.target.value)
              }
            }} /></h1>
          </HBox>
          <div style={{
            border: '1px solid gray',
            height: '50px'
          }}>
            <div style={{
              width: `${(percentSaving > 100) ? 100 : percentSaving}%`,
              backgroundColor: 'green',
              height: '100%',
              transition: '0.5s'
            }}>
            </div>
          </div>
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