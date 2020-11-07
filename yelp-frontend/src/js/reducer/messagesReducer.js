const { updateMessageList } = require("../actionconstants/action-types");

const defaultState = {
	messages: [{
		message: [],
        user: "",
        userid: "",
        restaurant: "",
        restaurantid: "",
		date: "",		
	}],
};

const messagesReducer = (state = defaultState, action) => {    
	console.log('payload in message reducer', action.payload);
	switch (action.type) {
		case updateMessageList: {            
			return {
                ...state,
                messages: { ...state.messages, ...action.payload },
                //   return Object.assign(state, action.payload);
              };
        }
        default: {
            return { ...state };
          }		
    }    
};

export default messagesReducer;
