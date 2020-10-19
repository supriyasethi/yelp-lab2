import React, { Component, useState, useEffect } from'react';
import styles from './Navbar.module.css'
import {Button, TextField, Typography, Link} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import cookie from 'react-cookies';
import axios from 'axios';
//import { setLogout,fetchProfile } from "../../js/actions/index";
//import { connect, useDispatch } from "react-redux";


const NavbarA = ({user, id}) => {  

    let history = useHistory();      
    let curruser = '';
    let [data, setData] = useState();
    //const dispatch = useDispatch();
    function handleLogoutClick() {
      cookie.remove('cookie', { path: '/' })
       //dispatch(setLogout());       
       history.push("/");
    }

    function handleWriteReviews() {
        history.push("/bizlist");
      }

    function handleDisplayEvents() {
        history.push({
			pathname: '/eventsdisplay',
			state: {data: id}});
	}
    
    function handleProfileClick() {
      
      console.log('inside handleprofile click');
      
       history.push("/userp");
    }   
       return(
           
        <div>
            <div className={styles["nav-bar"]}>
                <div className={styles["left"]}>
                <Link
							component='button'
                            variant='body2'
                            style={{
                                color: "white",
								fontSize: "14px",
								fontWeight: "bold",
                            }}
							onClick={handleWriteReviews}							
							>
							Write a Review
						</Link>
                        <Link
							component='button'
                            variant='body2'
                            style={{
                                color: "white",
								fontSize: "14px",
								fontWeight: "bold",
                            }}
							onClick={handleDisplayEvents}>
							Events
						</Link>						
                </div>
                <div className={styles["right"]}>
                <Button onClick={handleLogoutClick} color="primary" style={{
                            "color":"white", 
                            "font-size" : "12px",
                            "font-weight" : "bold"}}>Logout</Button>
                <Button onClick={handleProfileClick} color="primary" style={{
                            "color":"white", 
                            "font-size" : "12px",
                            "font-weight" : "bold"}}>Profile</Button>
                </div>
            </div>            
            </div>  
       );    
}

// const mapStateToProps = (state) => {
//   return {
//       user: state.login.user
//   }
// }
// function mapDispatchToProps(dispatch) {
//     console.log('inside map dispatch')
//     return {
//       setLogout: () => dispatch(setLogout())
//     };
//   }

//export default connect(mapStateToProps, mapDispatchToProps)(NavbarA);
export default NavbarA;
