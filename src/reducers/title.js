const initialState = {
  entry: 'Hello World!'
};

const title = (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE':
			return { ...state, 'entry': action.payload };
		default:
		return state;
	}
}

export default title;