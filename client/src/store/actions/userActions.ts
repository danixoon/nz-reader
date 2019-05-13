import axios from "axios";
import { handleActionError } from "../store";
import store from "../../store/store";

export const userCartFetch = () => async (dispatch: any) => {
  dispatch({ type: "USER_CART_FETCH_LOADING" });
  let data;
  try {
    data = JSON.parse(sessionStorage.getItem("cart") || "[]").cart.filter((v: any) => v);
  } catch (err) {
    data = [];
  } finally {
    try {
      sessionStorage.setItem("cart", JSON.stringify({ cart: data }));
      const res = await axios.get("/api/library/byId", { params: { ids: data } });
      dispatch({ type: "USER_CART_FETCH_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "USER_CART_FETCH_ERROR", payload: err });
    }
  }
};
export const userCartAdd = (id: string) => async (dispatch: any) => {
  dispatch({ type: "USER_CART_ADD_LOADING" });
  try {
    const state = store.getState() as any;
    sessionStorage.setItem("cart", JSON.stringify({ cart: [...state.user.entities.cart.map((c: any) => c._id), id] }));
    const data = await axios.get("/api/library/byId", { params: { ids: [id] } });
    dispatch({ type: "USER_CART_ADD_SUCCESS", payload: data.data[0] });
  } catch (err) {
    dispatch({ type: "USER_CART_ADD_ERROR", payload: err });
  }
};
export const userCartDelete = (id: string) => {
  const state = store.getState() as any;
  sessionStorage.setItem("cart", JSON.stringify({ cart: state.user.entities.cart.filter((c: any) => c._id !== id).map((c: any) => c._id) }));
  return { type: "USER_CART_DELETE", payload: { id } };
};
