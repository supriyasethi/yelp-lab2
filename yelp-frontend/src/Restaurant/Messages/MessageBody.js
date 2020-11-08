import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import { Paper, Grid, TextField, Button } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import SendIcon from "@material-ui/icons/Send";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import serverUrl from "../../config.js";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: "36ch",
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: "inline",
	},
	messageArea: {
		height: "70vh",
		overflowY: "auto",
	},
}));

function MessageBody() {

    let [textMessage, setTextMessage] = useState('');
	let [messagedisplay, setMessageDisplay] = useState([]);
	let messageInfo = JSON.parse(localStorage.getItem("messagedata"));
	console.log('messgeInfo', messageInfo);
	const classes = useStyles();

	function handleClick(id) {
		for (var i = 0; i < messageInfo.length; i++) {
			if (messageInfo[i].id === id) {
				console.log("inside if");
                setMessageDisplay(messageInfo[i].messages);
                localStorage.setItem('messageId', messageInfo[i].id);
                localStorage.setItem('uid', messageInfo[i].userid);
                localStorage.setItem('user', messageInfo[i].user);
                localStorage.setItem('resid', messageInfo[i].restaurantid);
                localStorage.setItem('res', messageInfo[i].restaurant);
			}
		}
    }
    
    function handleTextClick() {
        console.log('inside handle click');        
        axios.defaults.withCredentials = true;
		axios.defaults.headers.common["authorization"] = localStorage.getItem(
			"token"
        );
        let msg = {
            message: textMessage,
            role: localStorage.getItem('res'),
        }
        let msgInfo = {
            messageid : localStorage.getItem('messageId'),
            userid : localStorage.getItem('uid'),
            user : localStorage.getItem('user'),
            restaurantid : localStorage.getItem('resid'),
            restauarnt: localStorage.getItem('res'),
            messages : msg
        }
		axios
			.post(serverUrl + "insert/messages", msgInfo)
			.then((response) => {
				console.log("response", response);
				if (response.status === 200) {					
					//update the state with the response data
                    console.log("response", response);
                    setMessageDisplay(messagedisplay => [...messagedisplay, msg]);
                    setTextMessage('');
                }
            })
            .catch((error) => {
                console.log(error);
            });
        
    }

	return (
        <Paper style={{ margin: 16, padding: 16 }}>
		<Grid container direction='row'>
			<Grid xs={12} sm={3}>
			<List className={classes.root}>
					{messageInfo.map((listitem) => (
						<div>
							<ListItem alignItems='flex-start' key={listitem.id}>
								<ListItemAvatar>
									<Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
								</ListItemAvatar>
								<ListItemText
									button
									primary={listitem.user}
									onClick={() => handleClick(listitem.id)}
								/>
							</ListItem>
							<Divider variant='inset' component='li' />
						</div>
					))}
				</List>
			</Grid>

			<Grid item xs={9}>
				<List className={classes.messageArea}>
					{messagedisplay.map((listitem) => (
						<ListItem key={listitem._id}>
							<Grid container>
								<Grid item xs={12}>
									<ListItemText
										align='right'
										primary={listitem.message}></ListItemText>
								</Grid>
								<Grid item xs={12}>
									<ListItemText
										align='right'
										secondary={listitem.role}></ListItemText>
								</Grid>
							</Grid>
						</ListItem>
					))}
				</List>
				<Divider />
				<Grid container style={{ padding: "20px" }}>
					<Grid item xs={11}>
						<TextField
							id='outlined-basic-email'
							label='Type Something'
                            fullWidth
                            type='text'
                            value={textMessage}
                            onChange={(e) => setTextMessage(e.target.value)}
						/>
					</Grid>
					<Grid xs={1} align='right'>
                    <Button
						variant='contained'
						color='secondary'
						style={{
							height: "40px",
							width: "40px",
							fontSize: "12px",							
							background: "#d32323",
						}}
						onClick={handleTextClick}>
						<SendIcon />
					</Button>
						

					</Grid>
				</Grid>
			</Grid>
		</Grid>
        </Paper>
	);
}

export default MessageBody;