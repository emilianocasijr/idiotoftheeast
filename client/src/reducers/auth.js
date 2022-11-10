import * as actionType from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };
    case actionType.EDIT_ACCOUNT:
      const oldLocalStorage = JSON.parse(localStorage.getItem("profile"));
      console.log(oldLocalStorage);
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...oldLocalStorage, result: { ...action?.data } })
      );
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default authReducer;
