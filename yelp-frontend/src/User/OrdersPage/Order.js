import React from 'react';
import {Grid} from '@material-ui/core';
import LoginSignupTopBar from '../../helpers/LoginSignupTopBar';
import ViewOrder from './ViewOrder.jsx';
//import { connect } from 'react-redux';

 function ProfileUpdate(){
           
    return (    
        <Grid container direction="column" spacing={20}>
            <Grid item >
                <LoginSignupTopBar />
            </Grid>
            <Grid item container>
                <Grid xs={0} sm={3}/>
                <Grid xs={12} sm={6}>
                    <ViewOrder />
                </Grid>
                <Grid xs={0} sm={3}/>
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
export default ProfileUpdate;
