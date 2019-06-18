import React from "react";
import { merge } from "lodash";

export default function HBox(props) {
  //calculate ratio
  var totalratio = 0;
  var eachGrow = [];
  var eachBasis = [];
  React.Children.map(props.children, child => {
    if (!child) return null;

    if (child.props) {
      if (child.props.notfluid) {
        eachGrow.push(0);
      } else {
        if (typeof child.props.ratio === "number") {
          totalratio += child.props.ratio;
          eachGrow.push(child.props.ratio);
        } else if (typeof child.props.ratio === "undefined") {
          totalratio += 1;
          eachGrow.push(1);
        } else if (typeof child.props.ratio === "string") {
          eachGrow.push(0);
        } else {
          console.log("Invalid ratio: ", child.props.ratio);
          eachGrow.push(0);
        }
      }
    }
  });

  React.Children.map(props.children, (child, i) => {
    if (!child) return null;

    if (child.props) {
      if (typeof child.props.ratio === "string") {
        eachBasis.push(child.props.ratio);
      } else {
        eachBasis.push((eachGrow[i] / totalratio) * 100 + "%");
      }
    }
  });

  return (
    <div
      {...props}
      style={merge(
        {
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        },
        props.style
      )}
    >
      {React.Children.map(props.children, (child, i) => {
        if (!child) return null;

        var growStyle = {
          flexGrow: eachGrow[i],
          flexBasis: eachBasis[i]
        };

        var gapStyle = {};
        if (props.gap) {
          if (i !== 0) {
            gapStyle.marginLeft = props.gap / 2;
          }
          if (i !== props.children.length) {
            gapStyle.marginRight = props.gap / 2;
          }
        }

        return React.cloneElement(child, {
          style: merge(
            {
              width: "auto",
              ...growStyle,
              ...gapStyle
            },
            (child.props && child.props.style) || {}
          )
        });
      })}
    </div>
  );
}
