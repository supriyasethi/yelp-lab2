import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Divider, Avatar, Link } from "@material-ui/core";
//import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../../assets/homepage1.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import axios from "axios";
import Cookies from 'js-cookie';
import cookie from 'react-cookies';

const useStyles = makeStyles((theme) => ({
	root: {
		width: 500,		
	},
	inline: {
		display: "inline",
	},
}));

function EventsList() {

	//let httpURL = "http://localhost:3001";
	let httpURL = "http://54.219.75.46:3001";
	let history = useHistory();

	let [state, setState] = React.useState({
		events: [],
	});

	var newEvent = [];
	var prevevent = "";
	var res = "";

	useEffect(() => {
		
		res = localStorage.getItem('restaurantId');
        axios.defaults.withCredentials = true;
		axios.get(httpURL+"/get/events",{
            params: {
                restaurantId: res }
            })
        .then((response) => {
            //update the state with the response data
            console.log(response);
			for (var i = 0; i < response.data.length; i++) {
				if(prevevent !== response.data[i].name) {
					var temp = response.data[i];
					newEvent.push({
						id: i,
						items: temp,
						username: (response.data[i].first_name + " " +response.data[i].last_name)
					});
					prevevent = response.data[i].name;										
				}				
			}
			console.log('newEvent', newEvent);
			setState({
				events: newEvent,
			});
		});
    }, []);
	
	
    function handleUserProfile(e, id) {  
	// 	console.log('events', state.events[id]);
		const userid = state.events[id].items.userId
		 console.log('events', state.events[id].items.userId);
		 //localStorage.setItem('userId', state.events[id].items.userId);
		 history.push({
			 pathname: '/userdisplay',
			 state: {data: userid}});
	// 	console.log('cookie',Cookies.get("cookie"));
	// 	//console.log(Cookies);
	// 	var postInfo =  {
	// 		eventId : state.events[id].items.eventId,
	// 		restaurantId : state.events[id].items.restaurantId,
	// 	}
	// 	if (cookie.load('cookie')) {
	// 		axios.post("http://localhost:3001/insert/eventregister", postInfo).then((response) => {
	// 		//update the state with the response data
	// 		console.log(response);			
	// 	});
	// }

    //     	// history.push({ 
	// 		// 	pathname: '/eventsregister',
	// 		// 	state: {data: state.events[id]}}); 
	// 	// }
	// 	else {
	// 		history.push('/login');
	// 	}
			
	}

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div>
				<Typography
					style={{
						color: "#d32323",
						fontWeight: "bold",
						fontSize: "20px",
						justifyContent: "center",
					}}>
					Events List
				</Typography>
			</div>
			<div>
				<Divider />
			</div>

			<List>
				{state.events.map((listitem) => (
					<ListItem alignItems='flex-start' key={listitem.id}>
						<ListItemAvatar>
							<Avatar alt='Remy Sharp' src={logo} />
						</ListItemAvatar>
						<ListItemText
							primary={listitem.items.name}
							secondary={
								<React.Fragment>
									<div>
										<Typography
											component='span'
											variant='body2'
											className={classes.inline}
											color='textPrimary'>
											Timing:
										</Typography>
										{listitem.items.time}
										<Typography
											component='span'
											variant='body2'
											className={classes.inline}
											color='textPrimary'>
											Date:
										</Typography>
										{listitem.items.date}
									</div>
									<div>
										<Typography
											component='span'
											variant='body2'
											className={classes.inline}
											color='textPrimary'>
											Location:
										</Typography>
										{listitem.items.location}
									</div>
									<div>
										<Typography
											component='span'
											variant='body2'
											className={classes.inline}
											color='textPrimary'>
											User Registered:
										</Typography>							
									
										<Link
											component='button'
											variant='body2'
											style={{												
												fontSize: "14px",
												fontWeight: "bold",
											}}
											onClick={(event) => handleUserProfile(event, listitem.id)}>
											{listitem.username}
										</Link>
									</div>
								</React.Fragment>
							}
						/>
					</ListItem>
				))}
			</List>
			<Divider />
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
export default EventsList;
