import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import restaurantReducer from './restaurantReducer';
import userReducer from './userReducer';
import menuListReducer from './menuListReducer';
import usersListReducer from './usersListReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    login : loginReducer,
    signup : signupReducer,
    restaurant : restaurantReducer,
    userReducer : userReducer,
    menuListReducer : menuListReducer,
    usersListReducer : usersListReducer
});

export default rootReducer;
