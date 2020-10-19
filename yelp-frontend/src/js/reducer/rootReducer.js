import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import profileReducer from './profileReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    login : loginReducer,
    signup : signupReducer,
    profile : profileReducer
});

export default rootReducer;
