import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Divider, Avatar } from "@material-ui/core";
//import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../../../assets/homepage1.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import axios from "axios";

const useStyles = makeStyles((theme) => ({	
	root: {
		marginLeft: 300,
		width: '100%',
		maxWidth: '36ch',		
	  },
	  inline: {
		display: 'inline',
	  },
}));

function RestaurantMenu() {

	//let httpURL = "http://localhost:3001";
	let httpURL = "http://54.219.75.46:3001";
	let history = useHistory();

	let [state, setState] = React.useState({
		menu: []	
	});

	var newMenu = [];	

	useEffect(() => {
		var res = localStorage.getItem('restaurantId');
		axios.defaults.withCredentials = true;
		axios.get(httpURL+"/get/menu", {
			params : {
				restaurantId : res
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
					Restaurant Menu
				</Typography>
			</div>
			<div>
				<Divider />
			</div>

			<List >
				{state.menu.map((listitem) => (	
					
					<ListItem alignItems='flex-start' key={listitem.id}>
						<ListItemAvatar>
							<Avatar alt='Remy Sharp' src={logo} />
						</ListItemAvatar>
						<ListItemText
							primary={listitem.items.dishName}
							secondary={
								<React.Fragment>
									<div>
									<Typography
										component='span'
										variant='body2'
										className={classes.inline}
										color='textPrimary'>
										Price:$
									</Typography>
									{listitem.items.price}
									</div>
									<div>
									<Typography
										component='span'
										variant='body2'
										className={classes.inline}
										color='textPrimary'>
										Ingredients:
									</Typography>
									{listitem.items.ingredients}
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
export default RestaurantMenu;
