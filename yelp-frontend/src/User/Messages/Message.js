import React, { useEffect, useState } from "react";
import LoginSignupTopBar from "../../helpers/LoginSignupTopBar";
import { Divider, Grid } from "@material-ui/core";
import MessageBody from "./MessageBody";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";
import serverUrl from "../../config.js";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "center",
	},
}));

const Message = () => {	

	let history = useHistory();
	if (!localStorage.getItem("token")) {
		history.push("/home");
	}
	const classes = useStyles();
	useEffect(() => {
		axios.defaults.withCredentials = true;
		axios.defaults.headers.common["authorization"] = localStorage.getItem(
			"token"
		);
		axios
			.get(serverUrl + "get/messages")
			.then((response) => {
				console.log("response", response);
				if (response.status === 200) {
					console.log("response", response.data.length);

					localStorage.setItem("messagedata", JSON.stringify(response.data));
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
					<LoginSignupTopBar />
				</Grid>
				<Grid item container>
					<Grid xs={0} sm={1} />
					<Grid xs={12} sm={10}>
						<MessageBody />
					</Grid>
					<Grid xs={0} sm={1} />
				</Grid>
			</Grid>
		</div>
	);
};

export default Message;
