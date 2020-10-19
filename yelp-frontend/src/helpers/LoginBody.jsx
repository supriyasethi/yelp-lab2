import React from 'react';
import {Grid} from '@material-ui/core';
import LoginForm from './LoginForm';
import logo from '../assets/LoginPageimg.PNG';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles( () => ({
    img: {
        margin: '150px',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },
 })); 


const LoginBody = ({title, sender}) => {
    const classes = useStyles();    
    return (
        <Grid container
        direction="row"
        spacing={40}>
            <Grid item xs={2}   >                
            </Grid>
            <Grid item xs={4}   >
                <LoginForm title={title} sender={sender}/>
            </Grid>
            <Grid item xs={4} 
             justify="center"
             alignContent="center">
                <img  src={logo} alt='logo' style={{"padding-top": "100px"}} /> 
            </Grid>
            <Grid item xs={2} justify="center">                
            </Grid>
        </Grid>
    ) 
}

export default LoginBody;