import React from 'react';
import {Grid} from '@material-ui/core';
import SignupBizTopBar from '../../helpers/SignupBizTopBar';
import SignupBody from './SignupBody.jsx';

export default function SignupPage(){
    return (    
        <Grid container direction="column">
            <Grid item >
                <SignupBizTopBar />
            </Grid>
            <Grid item container>
                <Grid xs={0} sm={2}/>
                <Grid xs={12} sm={8}>
                <SignupBody />
                </Grid>
                <Grid xs={0} sm={2}/>
            </Grid>
        </Grid>
    );
}