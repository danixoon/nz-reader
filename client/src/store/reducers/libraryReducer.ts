import { IReduxAction, ActionType } from "../types";
import { handleFetchReducer, createState, handleLoadingReducer, handleErrorReducer, IInitialState } from "../store";

const initalState = createState({
  books: ["fetch"]
});

const books = ["LIBRARY_BOOKS_FETCH_LOADING", "LIBRARY_BOOKS_FETCH_ERROR", "LIBRARY_BOOKS_FETCH_SUCCESS"];
// const listJobs = ["USER_ACCOUNT_AUTH_SUCCESS", "USER_ACCOUNT_AUTH_LOADING", "USER_ACCOUNT_AUTH_ERROR"];

export default (s = initalState, action: IReduxAction): IInitialState => {
  if (books.includes(action.type)) return handleFetchReducer(s, action, "books");

  return s;
};
