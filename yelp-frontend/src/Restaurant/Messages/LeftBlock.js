import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { connect, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: "36ch",
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: "inline",
	},
}));

function LeftBlock() {
    console.log(messageData);
    const classes = useStyles();
    
    function handleClick() {
        console.log('handle click');
    }

	return (
		<div>
			<List className={classes.root}>
				{messageData.map((listitem) => (
					<div>
						<ListItem alignItems='flex-start'>
							<ListItemAvatar>
								<Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
							</ListItemAvatar>
							<ListItemText
                                button
                                primary={listitem.name}	
                                onClick={handleClick}							
							/>
						</ListItem>
						<Divider variant='inset' component='li' />
					</div>
				))}
			</List>
		</div>
	);
}

const mapStateToProps = (state) => {
	console.log(state);
	const messageData = state.messages;
	return {
		messageData,
	};
};

export default connect(mapStateToProps, null)(LeftBlock);
