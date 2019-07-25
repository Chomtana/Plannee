import React, { useEffect, useState } from "react"

import VBox from "../../component/VBox"
import usePointer from "../../pointer/usePointer";
import PriceControl from "./PriceControl";
import PaidRecords from "./PaidRecords";
import PaidControl from "./PaidControl";

export default function BufShare(props) {
  const buf_id = props.buf_id;
  const data = usePointer("buf").find({id: buf_id});
  
  const more_params = {data, buf_id};
  
  const [lineName,setLineName] = useState(null);
  const [linePic,setLinePic] = useState(null);
  const [lineLoaded,setLineLoaded] = useState(false);
  
  
  useEffect(()=>{
    liff.init(
      data => {
        // Now you can call LIFF API
        const userId = data.context.userId;
        liff.getProfile()
        .then(profile => {
          setLineName(profile.displayName);
          setLinePic(profile.pictureUrl);
          setLineLoaded(true);
        })
        .catch((err) => {
          console.log('error', err);
        });
      },
      err => {
        // LIFF initialization failed
        console.log("this is not liff");
      }
    );
  }, []);
  
  console.log(lineName, linePic, lineLoaded);
  
  return <VBox gap={15}>
    <PriceControl {...props} {...more_params}></PriceControl>
    <PaidRecords {...props} {...more_params}></PaidRecords>
    {lineLoaded && <PaidControl {...props} {...more_params}></PaidControl>}
  </VBox>
}