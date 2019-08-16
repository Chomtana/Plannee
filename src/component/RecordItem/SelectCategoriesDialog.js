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
import VBox from '../VBox';
import LCRBox from '../LCRBox';
import { ButtonBase } from '@material-ui/core';

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

function SelectCategoriesDialog(props) {
  const categories = useSelector(state => state.categories);

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
            {categories.map(category=>
              <ButtonBase style={{justifyContent:"left", textAlign:"left"}} onClick={()=>props.onChoose(category)}>
                <LCRBox
                  left={
                    <div style={{marginRight:5}}><category.icon></category.icon></div>
                  }
                  center={
                    <div>{category.text}</div>
                  }
                  
                ></LCRBox>
              </ButtonBase>
            )}
          </VBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SelectCategoriesDialog;
