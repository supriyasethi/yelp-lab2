import React, { useEffect, useState } from "react";
import TopBar from "../../TopBar/TopBar";
import { Divider, Grid } from "@material-ui/core";
import ProfileBody from "./ProfileBody";
import "react-chat-widget/lib/styles.css";
import RestaurantMenu from "./RestaurantMenu";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { updateMessageList } from "../../../js/actionconstants/action-types";
import { updateMessages } from "../../../js/actions/restaurantActions";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import serverUrl from "../../../config.js";
import logo from "../../../assets/homepage1.jpg";

//import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "center",
	},
}));

const Message = () => {
	let payload = "";
	const dispatch = useDispatch();

	let history = useHistory();
	if (!localStorage.getItem("token")) {
		history.push("/home");
	}
	const classes = useStyles();
	useEffect(() => {
		var restaurantId = localStorage.getItem("restaurant_id");

		axios.defaults.withCredentials = true;
		axios.defaults.headers.common["authorization"] = localStorage.getItem(
			"token"
		);
		axios
			.get(serverUrl + "get/messages")
			.then((response) => {
				if (response.status === 200) {
					console.log("response", response.data);
					//update the state with the response data
					payload = {
						message: response.data.message,
						user: response.data.user,
						userid: response.data.userid,
						restaurant: response.data.restaurant,
						restaurantid: response.data.restaurantid,
						date: response.data.date,
					};
					dispatch(updateMessages(payload));
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className={classes.root}>
			<Grid container direction='column'>
				<Grid item>
					<TopBar />
				</Grid>
				<Grid item container>
					<Grid xs={0} sm={1} />
					<Grid xs={12} sm={10}>
						<LeftBlock />
					</Grid>
					<Grid xs={12} sm={10}>
						<RightBlock />
					</Grid>
					<Grid xs={0} sm={1} />
				</Grid>
			</Grid>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateMessages: (payload) => {
			dispatch(
				updateMessages({
					type: updateMessageList,
					payload,
				})
			);
		},
	};
};

export default connect(null, mapDispatchToProps)(Message);
