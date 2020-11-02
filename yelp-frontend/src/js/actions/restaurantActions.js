const { updateRestaurantProfile, updateMenuList } = require("../actionconstants/action-types");

export function getProfile(payload) {	
	return (dispatch) => {
		dispatch(updateProfile(payload));
	};
	function updateProfile(payload) {
		return { type: updateRestaurantProfile, payload };
	}
}  

export function menuList(payload) {	
	return (dispatch) => {
		dispatch(updateList(payload));
	};
	function updateList(payload) {
		return { type: updateMenuList, payload };
	}
}  