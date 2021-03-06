import React from "react";
import VBox from "../../../component/VBox";
import { merge } from "lodash";
import { green, blue } from "@material-ui/core/colors";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    margin: 10,
    width: 135,
    position: "relative"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  textInProgress: {
    width: 140,
    height: 140,
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 20
  }
}));

function Title(props) {
  return <div style={{ textAlign: "center" }}>Money</div>;
}

function Progress(props) {
  const classes = useStyles();

  return (
    <div
      style={merge(props.style, {
        position: "relative",
        height: 140,
        display: "flex",
        justifyContent: "center"
      })}
    >
      <div className={classes.wrapper}>
        <div className={classes.textInProgress}>
          3,600 <br /> 30%
        </div>
        <CircularProgress
          size={140}
          variant="static"
          value={100}
          thickness={5}
          className={classes.fabProgress}
          style={{zIndex: 1, color: green[400]}}
        />
        <CircularProgress
          size={140}
          variant="static"
          value={30}
          thickness={5}
          className={classes.fabProgress}
          style={{zIndex: 2, color: "white"}}
        />
      </div>
    </div>
  );
}

export default function GoalMoney(props) {
  return (
    <VBox style={props.style}>
      <Title {...props} />
      <Progress {...props} />
    </VBox>
  );
}
