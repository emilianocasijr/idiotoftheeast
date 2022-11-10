import { AUTH, EDIT_ACCOUNT } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (formData, router) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.signIn(formData);
    console.log(data);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signinGoogle = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.getAccountDetails(formData.result.email);

    formData.result.name = data.name;
    dispatch({ type: AUTH, data: formData });
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const editAccount = (formData) => async (dispatch) => {
  try {
    const { data } = await api.editAccount(formData);

    dispatch({ type: EDIT_ACCOUNT, data: { ...formData, ...data} });
  } catch (error) {
    console.log(error);
  }
};
