import React from "react";
import { merge } from "lodash";

export default function VBox(props) {
  return (
    <div {...props} style={merge({ width: "100%" }, props.style)}>
      {React.Children.map(props.children, (child, i) => {
        if (!child) return null;

        var gapStyle = {};
        if (props.gap) {
          if (i !== 0) {
            gapStyle.marginTop = props.gap / 2;
          }
          if (i !== props.children.length) {
            gapStyle.marginBottom = props.gap / 2;
          }
        }

        //console.log(gapStyle);

        return React.cloneElement(child, {
          style: merge(
            {
              width: "100%",
              ...gapStyle
            },
            (child.props && child.props.style) || {}
          )
        });
      })}
    </div>
  );
}
