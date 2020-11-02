const { updateRestaurantProfile } = require("../actionconstants/action-types");

const defaultState = {
	restaurant: {
		Name: "",
		City: "",
		Description: "",
		Address: "",
		Timing: "",
		Emailid: "",
		Website: "",
		Phonenumber: "",
		Menu: [],
		Orders: [],
		Reviews: [],
		Events: [],
	},
};

const restaurantReducer = (state = defaultState, action) => {    
	console.log('payload in res reducer', action.payload);
	switch (action.type) {
		case updateRestaurantProfile: {            
			return {
                ...state,
                restaurant: { ...state.restaurant, ...action.payload },
                //   return Object.assign(state, action.payload);
              };
        }
        default: {
            return { ...state };
          }		
    }
    return state;  
};

export default restaurantReducer;
