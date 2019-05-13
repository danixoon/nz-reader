import { IReduxAction, ActionType } from "../types";
import { handleFetchReducer, createState, handleLoadingReducer, handleErrorReducer, IInitialState, handleEntityReducer } from "../store";

const initalState = createState({
  cart: ["fetch", "delete", "add"],
  // order: ["create"]
});

const userCartFetch = ["USER_CART_FETCH_SUCCESS", "USER_CART_FETCH_LOADING", "USER_CART_FETCH_ERROR"];
const userCartAdd = ["USER_CART_ADD_SUCCESS", "USER_CART_ADD_LOADING", "USER_CART_ADD_ERROR"];
// const userCartAdd = ["USER_ORDER_CREATE_LOADING", "USER_ORDER_CREATE_SUCCESS", "USER_ORDER_CREATE_LOADING"];
// const userCartFetch = ["USER_CART_FETCH_SUCCESS", "USER_CART_FETCH_LOADING", "USER_CART_FETCH_ERROR"];
// // const listJobs = ["USER_ACCOUNT_AUTH_SUCCESS", "USER_ACCOUNT_AUTH_LOADING", "USER_ACCOUNT_AUTH_ERROR"];

export default (s = initalState, action: IReduxAction): IInitialState => {
  if (userCartFetch.includes(action.type)) return handleFetchReducer(s, action, "cart");
  // if (userCartAdd.includes(action.type)) return handleEntityReducer(s, action, "cart", "add");

  switch (action.type) {
    case "USER_CART_DELETE":
      return {
        ...s,
        statuses: {
          ...s.statuses,
          cart: {
            ...s.statuses.cart,
            delete: "SUCCESS"
          }
        },
        entities: { cart: s.entities.cart.filter((s: any) => s._id !== action.payload.id) }
      };
    case "USER_CART_ADD_LOADING":
      return handleLoadingReducer(s, "cart", "add");
    case "USER_CART_ADD_ERROR":
      return handleErrorReducer(s, action.payload, "cart", "error");
    case "USER_CART_ADD_SUCCESS":
      return {
        ...s,
        statuses: {
          ...s.statuses,
          cart: {
            ...s.statuses.cart,
            add: "SUCCESS"
          }
        },
        entities: { cart: [...s.entities.cart, action.payload] }
      };
  }

  return s;
};
