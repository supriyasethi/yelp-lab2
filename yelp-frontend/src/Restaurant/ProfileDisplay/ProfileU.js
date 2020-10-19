import React from 'react';
import TopBar from '../TopBar/TopBar';
import {Divider, Grid} from '@material-ui/core';
import Body from './Body'
import Menu from './Menu'
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from "react-router-dom";
import LoginSignupTopBar from '../../helpers/LoginSignupTopBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',  
    justifyContent: 'center',
    },
    
}));

export default function ProfileU(){    
   const classes = useStyles(); 

    return (
      <div className={classes.root}>
      <Grid container direction="column">
            <Grid item >
                <LoginSignupTopBar />
            </Grid>
            <Grid item container>
                <Grid xs={0} sm={1}/>
                <Grid xs={12} sm={10}>
                <Body />
                </Grid>
                <Grid xs={0} sm={1}/>
            </Grid>
            <Grid item container justify="center">
                <Grid xs={0} sm={1}/>
                <Grid xs={12} sm={10}>
                <Menu />
                </Grid>
                <Grid xs={0} sm={1}/>
            </Grid>
        </Grid>
        </div>
    )
}