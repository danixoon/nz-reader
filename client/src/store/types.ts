export type UserAction =
  | "USER_CART_FETCH_LOADING"
  | "USER_CART_FETCH_SUCCESS"
  | "USER_CART_FETCH_ERROR"
  | "USER_CART_ADD_LOADING"
  | "USER_CART_ADD_SUCCESS"
  | "USER_CART_ADD_ERROR"
  | "USER_CART_DELETE";

export type LibraryAction = "LIBRARY_BOOKS_FETCH_LOADING" | "LIBRARY_BOOKS_FETCH_SUCCESS" | "LIBRARY_BOOKS_FETCH_ERROR";

export type ActionType = UserAction | LibraryAction;

export interface IReduxAction<T = ActionType, U = any> {
  type: T;
  entityName: string;
  payload?: U;
}
