import React, {useEffect} from 'react';
import {Grid} from '@material-ui/core';
import UserInfo from './UserInfo.jsx';
import UserDetails from './UserDetails.jsx';
import { connect } from 'react-redux';
import LoginSignupTopBar from '../../../helpers/LoginSignupTopBar.jsx';
import axios from 'axios';

 function Profile(){  

       
    return (    
        <Grid container direction="column" spacing={50}>
            <Grid item >
                <LoginSignupTopBar />
            </Grid>
            <Grid item container>
                <Grid xs={0} sm={2}/>
                <Grid xs={12} sm={8}>
                    <UserInfo />
                </Grid>
                <Grid xs={0} sm={2}/>
            </Grid>
            <Grid item container>
                <Grid xs={0} sm={2}/>
                <Grid xs={12} sm={8}>
                    <UserDetails />
                </Grid>
                <Grid xs={0} sm={2}/>
            </Grid>
        </Grid>
    );
}

// const mapStateToProps = (state) => {
//     return {
//         users : state.profile.users
//     }
    
// }
//export default connect(mapStateToProps)(Profile);
export default Profile

