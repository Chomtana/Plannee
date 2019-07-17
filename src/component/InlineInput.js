import React from "react";

import { Input } from "@material-ui/core";
import { merge } from "lodash";

import { withStyles, makeStyles } from "@material-ui/core/styles";

export default withStyles({
  root: {
    "& .MuiInputBase-input": {
      padding: "2px 0 2px"
    }
  }
})(Input);
