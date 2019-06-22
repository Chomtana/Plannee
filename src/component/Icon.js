import React from 'react'

import MaterialIcon from '@material-ui/core/icon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Icon({ icon, type, size, color, bgColor }) {
  return (<>
    {(!type || type == "material" ? <MaterialIcon style={{ color, width: size + 4, height: size + 4, fontSize: size, backgroundColor: bgColor, padding: 2, borderRadius: "20%" }}>{icon}</MaterialIcon>
      : (type == "fa" ? <FontAwesomeIcon icon={icon} style={{ color, width: size + 4, height: size + 4, backgroundColor: bgColor, padding: 2, borderRadius: "20%" }}></FontAwesomeIcon> : <>/</>)
    )}
  </>)
}