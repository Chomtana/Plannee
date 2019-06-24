import React from 'react'
import RefContainer from './../../refsystem/RefContainer';
import VBox from './../VBox';
import LCRBox from '../LCRBox';
import ButtonBase from '@material-ui/core/ButtonBase';
import Icon from '../Icon';
import {find} from "lodash";
import UICard from '../UICard';

function DetailChild(props) {
  const refs = new RefContainer(props);

  const category = find(refs.categories(),{text: props.category_text});

  return (<>
    <ButtonBase style={{justifyContent:"flex-start",textAlign:"left", width:"100%"}}>
      <LCRBox
        left={
          <div style={{marginRight: 5}}>
            <Icon icon={category.icon} type={category.icon_type} color="white" bgColor={category.icon_background} size={24} />
          </div>
        }
        center={
          <div>{props.category_text}</div>
        }
        right={
          <div style={{whiteSpace:"nowrap"}}>{props.value} บาท</div>
        }
      ></LCRBox>
    </ButtonBase>
  </>)
}

export default function ChartDetail(props) {
  const refs = new RefContainer(props);

  return (
    <VBox>
      <UICard>
        {Object.keys(props.sum_bycategory).map(category_text=>
          <DetailChild {...refs} category_text={category_text} value={props.sum_bycategory[category_text].sum}></DetailChild>
        )}
      </UICard>
    </VBox>
  );
}