import React, { useState } from 'react';
import {IconButton, Avatar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Typography, Button, Divider, TextField} from '@material-ui/core';
//import { connect, useDispatch } from "react-redux";
import axios from 'axios';
import ImageUploader from 'react-images-upload';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles( (theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
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

 function ProfileInfo () {
 //let httpURL = "http://localhost:3001";
 let httpURL = "http://54.219.75.46:3001";
    const[picture, setpicture] = useState("https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/7e4e0dfd903f/assets/img/default_avatars/user_large_square.png");
    const [state, setState] = React.useState({        
        name: "",        
        description: "", 
        address: "" ,
        phonenumber: "",
        timing: "",
        website : "",   
        restaurantId: null          
      });    

    let history = useHistory();
    const classes = useStyles();

    function handleFileSelected(e) {
        setpicture(URL.createObjectURL(e.target.files[0]));
    }
    

    function handleChange(e) {
      const res = localStorage.getItem('restaurantId');
        console.log("handlechange state", state);        
        const value = e.target.value;
     setState({
       ...state,
       [e.target.name]: value,  
       restaurantId : res           
         });
               
    }

    function handleSaveChanges() {
        
        let profileInfo = {
          state,
          picture
        }
        axios.defaults.withCredentials = true;
         axios.post(httpURL+"/update/bizprofile", state)
         .then(response => {
             console.log("Status code: ", response.status);
             if(response.status === 200) {
                history.push("/bizp");               
         }
     })
     .catch(error => {   
         console.log('error', error.response);         
       });
     }
      

    function handleCancel() {
         history.push("/bizp");
    }
    

    return(           
        <div className={classes.root}> 
            <div className={classes.container}> 
            <Typography style={{
                   color:"#d32323", 
                   fontWeight: "bold", 
                    fontSize : "20px",
                    justifyContent: "center"
                   }}>Update Business Information</Typography>
            </div>
            <div>
                <Divider />
            </div>          
            
            <div>
            <Typography style={{
                   color:"#333333", 
                   fontWeight: "bold", 
                    fontSize : "13px",
                    justifyContent: "center"
                   }}>Your Profile Photo                       
            <input type="file" onChange={handleFileSelected} /></Typography> 
            <img src={picture} style={{
              margin: "10px",
              width: "100px",
              height: "100px",
            }} 
             />
            </div>
            <div>            
            <Typography style={{
                   color:"#333333", 
                   fontWeight: "bold", 
                    fontSize : "13px",
                    justifyContent: "center"
                   }}>Restaurant Name</Typography>
            <TextField id="outlined-basic" variant="outlined" size="small" type="text" margin="dense"
                 style={{ height: "20", width: "500px"}} name="name" value={state.name} onChange={handleChange}
                  />                      

            <div>
            <Typography style={{
                   color:"#333333", 
                   fontWeight: "bold", 
                    fontSize : "13px",
                    justifyContent: "center"
                   }}>Description</Typography>
            <TextField id="outlined-basic" variant="outlined" size="small" type="text" margin="dense"
                 style={{ height: "20", width: "500px"}} name="description" value={state.description} onChange={handleChange}
                  /> 
            </div>           
            
            <div>
            <Typography style={{
                   color:"#333333", 
                   fontWeight: "bold", 
                    fontSize : "13px",
                    justifyContent: "center"
                   }}>Address</Typography>
            <TextField id="outlined-basic" variant="outlined" size="small" type="text" margin="dense"
                 style={{ height: "20", width: "500px"}} name="address" value={state.address} onChange={handleChange}
                  /> 
            </div>
            <div>
            <Typography style={{
                   color:"#333333", 
                   fontWeight: "bold", 
                    fontSize : "13px",
                    justifyContent: "center"
                   }}>Phone Number</Typography>
            <TextField id="outlined-basic" variant="outlined" size="small" type="text" margin="dense"
                 style={{ height: "20", width: "500px"}} name="phonenumber" value={state.phonenumber} onChange={handleChange}
                  /> 
            </div>            

            <div>
            <Typography style={{
                   color:"#333333", 
                   fontWeight: "bold", 
                    fontSize : "13px",
                    justifyContent: "center"
                   }}>Timing</Typography>
            <TextField id="outlined-basic" variant="outlined" size="small" type="text" margin="dense"
                 style={{ height: "20", width: "500px"}} name="timing" value={state.timing} onChange={handleChange}
                  /> 
            </div>

            <div>
            <Typography style={{
                   color:"#333333", 
                   fontWeight: "bold", 
                    fontSize : "13px",
                    justifyContent: "center"
                   }}>Website</Typography>
            <TextField id="outlined-basic" variant="outlined" size="small" type="text" margin="dense"
                 style={{ height: "20", width: "500px"}} name="website" value={state.website} onChange={handleChange}
                  /> 
            </div>            
            <div>
            <Button variant="contained" color="secondary" style={{ 
                height: "35px", 
                width: "150px", 
                fontSize : '12px',
                fontWeight : "bold",
                background: "#d32323"}} onClick={handleSaveChanges} >
                Save Changes
            </Button>

            <Button variant="contained" color="secondary" style={{ 
                height: "35px", 
                width: "150px", 
                fontSize : '12px',
                fontWeight : "bold",
                background: "#333333"}} onClick={handleCancel} >
                Cancel
            </Button>            
            </div>

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
  export default ProfileInfo;