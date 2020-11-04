import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { updateMessageList } from "../../../js/actionconstants/action-types";
import { updateMessages } from "../../../js/actions/restaurantActions";
import { connect, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		"& > *": {
			margin: theme.spacing(1),
			width: theme.spacing(16),
			height: theme.spacing(16),
		},
	},
}));

export default function RightBlock() {
	console.log(messageData);
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{messageData.map((listitem) => (
				<div>
					<Paper elevation={3} />
					<div>
						<Typography
							component='span'
							variant='body2'
							className={classes.inline}
							color='textPrimary'>
							Price:$
						</Typography>
						{listitem.message}
					</div>
				</div>
			))}
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

export default connect(mapStateToProps, null)(RightBlock);
