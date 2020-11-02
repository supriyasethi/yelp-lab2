import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Divider, Avatar } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../../../assets/homepage1.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import PaginationComponent from '../../../helpers/PaginationComponent';
import { menuList } from "../../../js/actions/restaurantActions";
import { updateMenuList } from "../../../js/actionconstants/action-types";

const useStyles = makeStyles((theme) => ({
	root: {
		marginLeft: 300,
		width: "100%",
		maxWidth: "36ch",
	},
	inline: {
		display: "inline",
	},
}));

function RestaurantMenu(restaurantData) {
	const dispatch = useDispatch();
	let history = useHistory();
	
	const[menu, setMenu] = useState([]);
	const[loading, setLoading] = useState(false);
	const[currentPage, setCurrentPage] = useState(1);
	const[postsPerPage] = useState(10);
	let restaurantMenu = [];
	 useEffect(() => {

		const fetchMenu = async () => {
		 restaurantMenu = await restaurantData.restaurantData.restaurant.Menu;
		setMenu(restaurantMenu);	
		}
		fetchMenu();   
	},[]);

	console.log('menu', restaurantMenu);
	//Get Current posts
	const indexofLastPost = currentPage * postsPerPage;
	const indexofFirstPost = indexofLastPost - postsPerPage;
	const currentPosts = menu.slice(indexofFirstPost, indexofLastPost);
	
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil((restaurantMenu.length) / postsPerPage); i++) {
		pageNumbers.push(i);
	}
	
	//Change Page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	// const commonFetch = (PageNo = 0) => {
	// 	let payload = {
	// 	  menuList: [{ name: 'pr' }, { name: 'pr' }, { name: 'pr' }, { name: 'pr' }],
	// 	  PageNo,
	// 	  PageCount: Math.ceil(116 / 10),
	// 	  Totalcount: 116,
	
	// 	  // PageCount: Math.ceil(response.data.Totalcount / 3),
	// 	};
	// 	dispatch(
	// 		menuList(payload)
	// 	);
		
	//   };

	//  const onPageClick = (e) => {
	// 	// console.log('Page Clicked:', e.selected);
	// 	commonFetch(e.selected);
	//   };

	//   useEffect(() => {
	// 	commonFetch();
	//   },[]);
	
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

			<List>
				{restaurantMenu.map((listitem) => (
					<ListItem alignItems='flex-start' key={listitem._id}>
						<ListItemAvatar>
							<Avatar alt='Remy Sharp' src={logo} />
						</ListItemAvatar>
						<ListItemText
							primary={listitem.dishname}
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
										{listitem.price}
									</div>
									<div>
										<Typography
											component='span'
											variant='body2'
											className={classes.inline}
											color='textPrimary'>
											Ingredients:
										</Typography>
										{listitem.ingredients}
									</div>
				
								</React.Fragment>
							}
						/>
					</ListItem>
				))}
			</List>
			<Divider />
			<div className='module pt-xxsm'>
				<ul className='pagination' style={{ justifyContent: "left" }}>
					{pageNumbers.map((number) => (
						<li key={number} className='page-item'>
							<a onClick={() => paginate(number)} className='page-link'>
								{number}
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	console.log(state);
	const restaurantData = state.restaurant;
	const menuData = state.menu;
	return {
		restaurantData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		menuList: (payload) => {
			dispatch(
				menuList({
					type: updateMenuList,
					payload,
				})
			);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantMenu);
//export default RestaurantMenu;
