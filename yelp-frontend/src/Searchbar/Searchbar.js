import React, {useRef} from "react";
import styles from "./Searchbar.module.css";
import axios from "axios";
import {
	Button,
	TextField,
	Typography,
	Divider,
	Avatar,
	Link,
} from "@material-ui/core";
import logo from "../assets/homepage1.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import cookie from 'react-cookies';
//import { GoogleMap, LoadScript, Marker  } from '@react-google-maps/api';
//import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	root: {
		width: 500,
	},
	inline: {
		display: "inline",
	},
	list: {
		marginTop: 300,
	},
	mapStyles: {
		width: '100%',
  		height: '100%'
	}
}));

export function Searchbar() {

	//let httpURL = "http://localhost:3001";
	let httpURL = "http://54.219.75.46:3001";
	let history = useHistory();
	const mapRef = useRef(null);
	const classes = useStyles();

	const defaultCenter = {
		lat: 41.3851, lng: 2.1734
	  }

	  const locations = [
		{
		  name: "Location 1",
		  location: { 
			lat: 41.3954,
			lng: 2.162 
		  },
		},
		{
		  name: "Location 2",
		  location: { 
			lat: 41.3917,
			lng: 2.1649
		  },
		},
		{
		  name: "Location 3",
		  location: { 
			lat: 41.3773,
			lng: 2.1585
		  },
		},
		{
		  name: "Location 4",
		  location: { 
			lat: 41.3797,
			lng: 2.1682
		  },
		},
		{
		  name: "Location 5",
		  location: { 
			lat: 41.4055,
			lng: 2.1915
		  },
		}
	  ];
	// const { ref, map, google } = useGoogleMaps('AIzaSyB_V46hZHJWMGf_UQViAlhD90sUrhY9wLc',
	// 	{
	// 		center: { lat: 0, lng: 0 },
	// 		zoom: 3,
	// 	  },
	// 	);
	let [state, setState] = React.useState({
		find: "",
		where: "",
        restaurants: [],
        header:""
	});

	function handleFindChange(e) {
		const value = e.target.value;
		setState({
			...state,
			[e.target.name]: value,
		});
	}

	var newRestaurant = [];
	let issearch = 0;

	function handleSearch() {
		axios
			.get(httpURL+"/get/home", {
				params: {
					keyword: state.find,
					location: state.where,
				},
			})
			.then((response) => {
				console.log("Status code: ", response.status);
				if (response.status === 200) {
					//history.push("/homea");
					//dispatch(failure());
					console.log(response);
					if (response.data.length > 0) {
						for (var i = 0; i < response.data.length; i++) {
							issearch = 1;
							var temp = response.data[i];
							newRestaurant.push({
								id: i,
								items: temp,
							});
						}
						console.log("newRestaurant", newRestaurant);
						setState({
                            restaurants: newRestaurant,
                            header: (<Typography 
                            style={{color:'#d32323', fontWeight:"bold", fontSize:"18px"}}								
                            component='span'
                            variant='body2'
                            className={classes.inline}
                            color='textPrimary'>
                            Restaurants List
                                </Typography>)
						});
						console.log("restaurants", state.restaurants);
					}
				}
			})
			.catch((error) => {
				console.log("error", error.response);
			});
	}

	function handleOrderRequest(e, id) {
		localStorage.setItem('restaurantId', id);
		if(cookie.load('cookie')) {
		history.push('/bizdisplay');}
		else history.push('/login/user');
	}


	return (
		<div>
			<div className='field has-addons'>
				<p className='control'>
					<a href className='button is-static is-medium'>
						Find
					</a>
				</p>
				<p className='control'>
					<TextField
						className={`input is-medium ${styles["input"]}`}
						id='outlined-basic'
						placeholder='Restaurants'
						variant='outlined'
						size='medium'
						type='text'
						name='find'
						value={state.find}
						onChange={handleFindChange}
					/>
				</p>
				<p className='control'>
					<a href className='button is-static is-medium'>
						Near
					</a>
				</p>
				<p className='control'>
					<TextField
						className={`input is-medium ${styles["input"]}`}
						id='outlined-basic'
						placeholder='Where'
						variant='outlined'
						size='medium'
						type='text'
						name='where'
						value={state.where}
						onChange={handleFindChange}
					/>
				</p>
				<div>
					<Button
						variant='contained'
						color='secondary'
						style={{
							height: "50px",
							width: "20px",
							background: "#d32323",
							fontWeight: "bold",
						}}
						onClick={handleSearch}>
						{" "}
						Search{" "}
					</Button>
				</div>
			</div>
			<div className={classes.list}>
				<List>
                <div>
                    {state.header}
                        </div>
                        
					{state.restaurants.map((listitem) => (
                        
						<ListItem alignItems='flex-start' key={listitem.id}>
                            <Divider />
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
												DishName:
											</Typography>
											{listitem.items.dishName}
										</div>
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
											<Link
												component='button'
												variant='body2'
												style={{
													fontSize: "14px",
													fontWeight: "bold",
												}}
												onClick={(event) =>
													handleOrderRequest(event, listitem.items.restaurantId)
												}>
												Order Online
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

			
		</div>
	);
}

// GeoDistanceFrom.propTypes = {
// 	google: PropTypes.shape({}).isRequired,
//   };

// GeoDistanceFrom.defaultProps = {
// };
// export default GoogleApiWrapper({
// 	apiKey: 'AIzaSyAy94PUn8Y_lBS8hk555rkc19tntZ5GX4w',
// 	libraries: ['places']
//   })(Searchbar);