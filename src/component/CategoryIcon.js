import React from "react";

export default function CategoryIcon(props) {
  //props.category
  return (
    <div>
      <img src={"./img/category/" + props.category("icon")() + ".png"} height={40} />
    </div>
  );
}
