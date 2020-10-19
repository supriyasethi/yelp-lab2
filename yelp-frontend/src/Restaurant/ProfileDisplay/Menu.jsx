import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Divider, Avatar, Button, Grid } from "@material-ui/core";
//import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../../assets/homepage1.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from "axios";

const useStyles = makeStyles((theme) => ({	
	root: {
		// 
		// width: '100%',
        // maxWidth: '36ch',
        marginLeft: 250,
        marginTop: 20,		
        width: '100%',
        maxWidth: 360
   
	  },
	  inline: {
		display: 'inline',
      },
      option: {        
        marginTop: 20,		
        width: '100%',
        maxWidth: 360
      },

      button: {   
        marginLeft: 600,     
        marginTop: 20,		
        width: '100%',
        maxWidth: 360
      }
      
}));

function Menu({data}) {
 //let httpURL = "http://localhost:3001";
 let httpURL = "http://54.219.75.46:3001";
	let history = useHistory();
    const [checked, setChecked] = React.useState([1]);
	let [state, setState] = React.useState({
        menu: [],
        pickup: false,
        delievery: false  
	});
    const newChecked = [...checked];
    var newMenu = [];	   
    var newid = [];

	useEffect(() => {
        const data = localStorage.getItem('restaurantId');
		axios.defaults.withCredentials = true;
		axios.get("http://localhost:3001/get/menu", {
			params : {
				restaurantId : data
			}
		}).then((response) => {
			//update the state with the response data			
			for (var i = 0; i < response.data.length; i++) {
				var temp = response.data[i];	
				newMenu.push({
					id: i,
					items: temp
				});							
			}	
			setState({
				menu: newMenu
			});	

		});
	}, []);
	
    const classes = useStyles();
    let [msg, setmsg] = useState('');
    const rId = localStorage.getItem('restaurantId');
    const uId = localStorage.getItem('userId');
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
        console.log(newChecked);
      };

    function handleCancel() {
        history.push('/homea')
    }

    
    
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
  //   const handleChangeclick = (id) => {
  //     newid.push(id);
  //     //setState({ ...state, [event.target.name]: event.target.checked });
  // };
   
    function handleOrder() {
            var orderItem ='';
            var id = '';  
            var delieveryoption = '';
        console.log('state', state.menu[0].items.dishName);
        for(var i=0; i< newChecked.length; i++) {
        //   for(var i=0; i< newid.length; i++) {
           console.log(newChecked.length);
             id = newChecked[i];                        
             console.log('id',id);
             orderItem = orderItem + state.menu[id].items.dishName + ',';
         }
        console.log('orderItem',orderItem);
        if(state.pickup) {
            delieveryoption = 'PickUp';
        } 
        else {
            delieveryoption = 'PickUp';
        }

        let orderInfo = {
            orderItem,
            delieveryOption: delieveryoption,
            orderFilter: 'New Order',
            restaurantId: rId,            
            userId: uId            
        }

        axios.defaults.withCredentials = true;
         axios.post('http://localhost:3001/insert/order', orderInfo)
         .then(response => {
             console.log("Status code: ", response.status);
             if(response.status === 200) {
                 setmsg(<p>Order Placed</p>);
                history.push("/bizdisplay");               
         }
     })
     .catch(error => {   
         console.log('error', error.response); 
         //seterrmsg(<p>Reviews already given by the user</p>)
       });
        console.log('handleorder', orderItem);
    }

	return (

        <Grid container
        direction="row"
        spacing={40}>
            <Grid xs={0} sm={1} justify="center"/>
            <Grid item xs={5} justify="center">
		<div className={classes.root}>
			<div>
				<Typography
					style={{
						color: "#d32323",
						fontWeight: "bold",
						fontSize: "20px",
						justifyContent: "center",
					}}>
					Select Dish to Order
				</Typography>
			</div>
			<div>
				<Divider />
			</div>
            <List dense >
            {state.menu.map((listitem) => (	      
          <ListItem key={listitem.id} button>
            <ListItemAvatar>
              <Avatar                
                src={logo}
              />
            </ListItemAvatar>
            <ListItemText style={{fontWeight:"bold"}} primary={listitem.items.dishName} />
            <ListItemSecondaryAction>
            <Checkbox
                edge="end"
                onChange={handleToggle(listitem.id)}
                               
              />
              
            </ListItemSecondaryAction>
          </ListItem>
        ))}      
    </List>	
               
    </div>
    </Grid>	       
        <Grid item xs={5} justify="center">
        <div className={classes.option}>   
        <div>
				<Typography
					style={{
						color: "#d32323",
						fontWeight: "bold",
						fontSize: "20px",
						justifyContent: "center",
					}}>
					Select Delievery Option
				</Typography>
			</div>
        <FormGroup row>
            
      <FormControlLabel
        control={<Checkbox checked={state.pickup} onChange={handleChange} name="pickup" />}
        label="PickUp"
      />
      <FormControlLabel
        control={<Checkbox checked={state.delievery} onChange={handleChange} name="delievery" />}
        label="Delievery"
      />
      </FormGroup>
      </div>
      </Grid>
      
           <Grid>
           <div className={classes.button}>
     <Button variant="contained" color="secondary" style={{ 
         height: "35px", 
         width: "150px", 
         fontSize : '12px',
         fontWeight : "bold",
         background: "#d32323"}} onClick={handleOrder} >
         Place Order
     </Button>

     <Button variant="contained" color="secondary" style={{ 
         height: "35px", 
         width: "150px", 
         fontSize : '12px',
         fontWeight : "bold",
         background: "#333333"}} onClick={handleCancel} >
         Cancel
     </Button>   
     {msg}
     </div>    
     
    </Grid>	
    </Grid>
     
     
	);
}

// const mapStateToProps = (state) => {
//     return {
//         firstname: state.profile.firstname,
//         zipcode :  state.profile.zipcode
//     }
//   }

//export default connect(mapStateToProps, null)(UserInfo);
export default Menu;
