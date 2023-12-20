import { combineReducers } from 'redux';

// Define initial state
const initialState = {
  // Your initial state properties
};

// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ACTION_TYPE':
      // Handle the action and update state accordingly
      return {
        ...state,
        // Update state based on the action payload
      };
    default:
      return state;
  }
};

// Combine reducers if you have multiple
const rootReducer = combineReducers({
  yourReducerName: reducer,
  // Add more reducers here if needed
});

export default rootReducer;
