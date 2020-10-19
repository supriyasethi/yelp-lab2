import React from 'react';
import Navbar from './Navbar/Navbar';
import { Searchbar } from '../Searchbar/Searchbar';
import {Button, TextField, Typography} from '@material-ui/core';
import logo from '../assets/YelpLogo.jpg'
import styles from './HomePage.module.css';
import { useHistory } from 'react-router-dom';
import cookie from 'react-cookies';


export default function HomePage(){
    let history = useHistory();  
    
    function handleBusiness() {
        if (cookie.load('cookie')) {
            history.push('/bizp');
        }else {        
        history.push("/loginbiz"); }
    }
    if (cookie.load('cookie')) {
        history.push('/homea');
    }
    return (  
        <div className={styles.img} >
            <div className={styles.button}>     
             <Button onClick={handleBusiness}  variant='outlined' 
             style={{
                "color": "white",
                "font-size" : "12px",
                "font-weight" : "bold",                
            }}>
              Yelp for Business</Button>       
            </div>
        <div className={styles.homepage}>
        <div>
            <Navbar />                  
            <div className={styles['search-area']}>
            <img src={logo} className={styles.logo} alt='logo' />
            <Searchbar />
            </div>
        </div>            
        </div>  
        </div>              
    );
}