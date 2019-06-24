import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import VBox from './VBox';
import HBox from './HBox';
import LCRBox from './LCRBox';
import { ButtonBase } from '@material-ui/core';
import Icon from './Icon';
import RefContainer from './../refsystem/RefContainer';
import useSelectorRef from '../refsystem/useSelectorRef';
import useGlobalRef from '../refsystem/useGlobalRef';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function CategoryItem(props) {
  const refs = new RefContainer(props);
  const category = refs.category_val();

  const [isEditing,setIsEditing] = useState(false);

  const confirm = window.confirm;

  return (
    <ButtonBase style={{justifyContent:"left", textAlign:"left", borderBottom: "solid 1px rgb(204, 204, 204)", paddingTop: 5, width: "100%"}} onClick={()=>{refs.category.stage(category); refs.is_choosing.set(null);}}>
      <LCRBox
        left={
          <div style={{marginRight:5}}><Icon icon={category.icon} type={category.icon_type} color="white" bgColor={category.icon_background} size={24} /></div>
        }
        center={
          <div>{category.text}</div>
        }
        right={
          <HBox notfluid>
            <div>
              <ButtonBase onClick={(e)=>{
                e.stopPropagation();
              }}>
                <Icon icon="edit" color="#ccc" size={18}></Icon>
              </ButtonBase>
            </div>
            <div>
              <ButtonBase onClick={(e)=>{
                if (confirm("คุณต้องการลบหมวดหมู่นี้จริงหรือไม่")) {
                  refs.category_val.delete();
                }
                e.stopPropagation();
              }}>
                <Icon icon="delete" color="#ccc" size={18}></Icon>
              </ButtonBase>
            </div>
          </HBox>
        }
        
      ></LCRBox>
    </ButtonBase>
  )

}

function SelectCategoriesDialog(props) {
  const categories = useSelector(state => state.categories);
  const refs = new RefContainer(props);
  refs.categories = useGlobalRef("categories");

  return (
    <div>
      <Dialog
        onClose={props.onClose}
        open={props.open}
        fullWidth={true}
      >
        <DialogTitle onClose={props.onClose}>
          เลือกหมวดหมู่
        </DialogTitle>
        <DialogContent dividers>
          <VBox>
            {refs.categories.map(category=>
              <CategoryItem {...refs} category_val={category}></CategoryItem>
            )}
          </VBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
              var text = prompt("กรุณาใส่ชื่อของหมวดหมู่")
              if (text) {
                refs.categories.push({      
                  icon: "help_outline",
                  icon_type: "material",
                  icon_background: "#414042",
                  text: text
                })
              }
            }} 
            color="primary"
          >
            เพิ่มหมวดหมู่
          </Button>
          <Button onClick={()=>refs.is_choosing.set(false)} color="secondary">
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SelectCategoriesDialog;
