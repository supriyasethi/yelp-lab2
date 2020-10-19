import { SIGNUP_USER, SIGNUP_ERROR, LOG_IN, LOGIN_ERROR, LOG_OUT, FETCH_PROFILE} from "../actionconstants/action-types";
import axios from 'axios';

export function setLogin(payload) {
    console.log("dispatching the action")
    return (dispatch) => {
    axios.defaults.withCredentials = true;
    return axios.post('http://localhost:3001/login',payload)
    .then(response => {
        console.log("Status code: ", response.status);
        if(response.status === 200) {
           dispatch(success({payload}));
         }
     })
     .catch(error => {   
        if(error.response.status === 422) {
          console.log(error);
          payload = error.response.data;
          dispatch(failure());
       };
     });
}
function success(payload) { return { type: LOG_IN, payload} }
function failure() { return { type: LOGIN_ERROR  } }
}

export function setLogout() {
    console.log("dispatching the action")
    return (dispatch) => { 
      dispatch(logout());
    }
    function logout() { return { type: LOG_OUT } }
  }

export function signupUser(payload) {
    console.log("dispatching the action")
    return (dispatch) => {
    axios.defaults.withCredentials = true;
    return axios.post('http://localhost:3001/signup',payload)
    .then(response => {
        console.log("Status code: ", response.status);
        if(response.status === 200) {
           dispatch(failure());
         }
     })
     .catch(error => {   
        if(error.response.status === 422) {
          console.log(error);
          payload = error.response.data;
          dispatch(success());
       };
     });
}
function success() { return { type: SIGNUP_USER  } }
function failure() { return { type: SIGNUP_ERROR } }

}

export function fetchProfile(payload) {
  console.log("dispatching the action")
  return (dispatch) => {
  axios.defaults.withCredentials = true;
  return axios.post('http://localhost:3001/profile',payload)
  .then(response => {
      console.log("Status code: ", response.status);
      if(response.status === 200) {
         dispatch(success(response));
       }
   })
  //  .catch(error => {   
  //     if(error.response.status === 422) {
  //       console.log(error);
  //       payload = error.response.data;
  //       dispatch(failure(payload));
  //    };
  //  });
}
function success(payload) { return { type: FETCH_PROFILE, payload } }
//function failure(payload) { return { type: SIGNUP_ERROR, payload } }

}


