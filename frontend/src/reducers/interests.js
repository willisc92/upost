// Interests Reducers
const interestsDefaultState = [];

export default (state = interestsDefaultState, action) => {
  switch (action.type) {
    case "SET_USER_INTERESTS":
      return {
        userInterests: action.userInterests
      };
    case "EDIT_USER_INTERESTS":
      return {
        userInterests: action.userInterests
      };
    default:
      return state;
  }
};
