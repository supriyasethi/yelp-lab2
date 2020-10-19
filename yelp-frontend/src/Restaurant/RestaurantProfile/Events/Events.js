import React from 'react';
import {Grid} from '@material-ui/core';
import EventsForm from './EventsForm.jsx';
import TopBar from '../../TopBar/TopBar';
//import { connect } from 'react-redux';

 function Events(){
           
    return (    
        <Grid container direction="column" spacing={20}>
            <Grid item >
                <TopBar />
            </Grid>
            <Grid item container>
                <Grid xs={0} sm={3}/>
                <Grid xs={12} sm={6}>
                    <EventsForm />
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
export default Events;

