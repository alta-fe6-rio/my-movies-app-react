/** @format */

const initialState = {
	favorites: [],
	loading: true,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_FAVORITES':
			return {
				...state,
				favorites: action.payload,
				loading: false,
			};
		case 'REMOVE_FAVORITE':
			return {
				...state,
				favorites: state.favorites.filter((favorite) => favorite !== action.payload),
				loading: false,
			};
		default:
			return state;
	}
};
