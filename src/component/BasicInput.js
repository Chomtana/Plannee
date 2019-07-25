import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { debounce } from "lodash"

export default class BasicInput extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  componentDidMount() {
    var performSet = debounce((value)=>{
      if (!this.props.setWrapper) {
        this.props.value.set(value)
      } else {
        this.props.value.set(this.props.setWrapper(value))
      }
    }, 100)

    this.input.current.addEventListener('input', (e) => {
      //console.log(e.target.value);
      performSet(e.target.value);
      this.props.onChange && this.props.onChange(e);
    });

    if (this.previousValue) {
      var value = this.previousValue();
      if (typeof value === "undefined") {
        this.input.current.value = "";
      } else {
        this.input.current.value = this.previousValue();
      }
    }
  }

  render() {
    const props = {};
    for(var key in this.props) {
      if (key != "value" && key != "onChange") props[key] = this.props[key];
    }

    if (this.input.current && this.previousValue != this.props.value) {
      this.input.current.value = this.props.value();
    }
    this.previousValue = this.props.value;

    return (
      <TextField
        {...props}
        /*onChange={e => props.value.set(e.target.value)}*/
        inputRef={this.input}
        /*value={props.value() || ""}*/
        defaultValue=""
      />
    );
  }
}
