import React from "react";
import { merge } from "lodash";
import usePointer from "../../../pointer/usePointer";

export default function ProfilePicture(props) {
  const line_detail = usePointer("line_detail");

  return (
    <div style={merge({ textAlign: "center", marginRight: 5 }, props.style)}>
      {line_detail("pic").isReady ? (
        <img
          width="100%"
          src={line_detail("pic")()}
          style={{ borderRadius: "50%" }}
        />
      ) : (
        <img
          width="100%"
          src="https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.0-9/20604565_1470377029695904_5774377805352763496_n.jpg?_nc_cat=105&_nc_oc=AQntSsboCBkT6LB18BY0XxjezK5fHvqRItSFlzZJa-TF31PRBZO2vfaJnDhBF7h78ac&_nc_ht=scontent.fbkk12-2.fna&oh=90e9f946944d3b5452a6c3ca9c14f07c&oe=5DDB5401"
          //src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          style={{ borderRadius: "50%" }}
        />
      )}
    </div>
  );
}
