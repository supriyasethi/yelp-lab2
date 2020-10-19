import React from 'react';
import TopBar from '../../TopBar/TopBar';
import {Divider, Grid} from '@material-ui/core';
import ProfileBody from './ProfileBody'
import RestaurantMenu from './RestaurantMenu'
import { makeStyles } from '@material-ui/core/styles';
//import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',  
    justifyContent: 'center',
    },
    
}));

export default function Profile(){    
  
  const classes = useStyles(); 

    return (
      <div className={classes.root}>
      <Grid container direction="column">
            <Grid item >
                <TopBar />
            </Grid>
            <Grid item container>
                <Grid xs={0} sm={1}/>
                <Grid xs={12} sm={10}>
                <ProfileBody />
                </Grid>
                <Grid xs={0} sm={1}/>
            </Grid>
            <Grid item container justify="center">
                <Grid xs={0} sm={1}/>
                <Grid xs={12} sm={10}>
                <RestaurantMenu />
                </Grid>
                <Grid xs={0} sm={1}/>
            </Grid>
        </Grid>
        </div>
    )
}