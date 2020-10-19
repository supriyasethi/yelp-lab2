import React, { useState, useEffect } from 'react';
import {IconButton, Avatar} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {Typography, Button, Divider} from '@material-ui/core';
//import { connect, useDispatch } from "react-redux";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import logo from "../../../assets/homepage1.jpg";

const useStyles = makeStyles( () => ({
    container : {
        display: 'flex',
        flexFlow: 'row wrap',    
        justifyContent: 'space-between',  
        width: '120.4%',
        padding: '20',            
      },

      profile: {
        flexGrow: '0',
        flexShrink: '0',
        flexBasis: 'calc(25% - 10px)', 
        margin: '5px',    
      },
      user : {        
        flexGrow: '3',
        flexShrink: '0',
        flexBasis: 'calc(25% - 10px)', 
        marginTop: '80px',    
      },

      update : {
        flexGrow: '0',
        flexShrink: '0',
        flexBasis: 'calc(25% - 10px)', 
        marginTop: '80px',           
    }
}));

 function UserInfo ({data}) {

  //let httpURL = "http://localhost:3001";
	let httpURL = "http://54.219.75.46:3001";
  let history = useHistory();
    let [username, setUsername] = useState('');
    let [location, setlocation] = useState('');
    let [picture, setpicture] = useState('');


    useEffect(() => {     

      const userId = localStorage.getItem('userId');
      console.log('inside user info');
      console.log(userId);
    axios.get(httpURL+"/get/userp",{
      params: {
        userId : userId
      }
    })
      .then((response) => {
         //update the state with the response data
        console.log(response);
        setUsername(response.data[0].first_name + ' ' + response.data[0].last_name);
        setlocation(response.data[0].city + ', ' + response.data[0].state); 
        
        // if(response.data[0].profile_img != null)     {
          //setpicture();
        // } else {
        //   setpicture(<img src={response.data[0].profile_img} style={{
        //                   margin: "10px",
        //                   width: "100px",
        //                   height: "100px",
        //                 }} />);
        //}
         });
    },[]);
    
    const classes = useStyles();

    function handleUpdateProfile() {
        history.push("/updateuprofile");
    }
    
    return(           
        <div className={classes.container}>  
            <div className={classes.profile} style={{display: 'inline-block'}}>
            <Avatar 
            variant="square"
            src={logo} 
             style={{
             margin: "10px",
             width: "220px",
             height: "220px",
           }} 
           />
            </div>
            <div className={classes.user}>
                <Typography style={{
                   color:"#333333", 
                   fontWeight: "bold", 
                    fontSize : "29px"
                   }}>{username}</Typography>
                 <Typography style={{
                 color:"#333333", 
                    fontSize: "15px"
                    }}>{location}</Typography>
            </div>
            <div>
                <Divider orientation='vertical' />
            </div>
            <div className={classes.update}>
                <Button onClick={handleUpdateProfile} color="secondary" style={{
                    "color":"#333333", 
                    "font-size" : "12px",
                    "font-weight" : "bold"}}
                    >Update Your Profile</Button>
            </div>
      </div>  
       );       
}

// const mapStateToProps = (state) => {
//     return {
//         firstname: state.profile.firstname,
//         zipcode :  state.profile.zipcode
//     }
//   }

  //export default connect(mapStateToProps, null)(UserInfo);
  export default UserInfo;