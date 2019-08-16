import React from "react"
import { withStyles, LinearProgress } from "@material-ui/core";
import { lighten } from "@material-ui/core/styles";

export default withStyles({
  root: {
    height: 20,
    backgroundColor: lighten('#ff6c5c', 0.5),
    borderRadius: 40
  },
  bar: {
    borderRadius: 40,
    backgroundColor: '#ff6c5c',
  },
})(LinearProgress);