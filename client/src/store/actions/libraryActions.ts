import axios from "axios";
import { handleActionError } from "../store";

export const fetchLibraryBooks = ({ search }: any) => async (dispatch: any, getState: any) => {
  dispatch({ type: "LIBRARY_BOOKS_FETCH_LOADING" });
  // const token = sessionStorage.getItem("authToken");
  try {
    const res = await axios.get("/api/library/find", { params: { search } });
    dispatch({ type: "LIBRARY_BOOKS_FETCH_SUCCESS", payload: res.data });
  } catch (err) {
    handleActionError(dispatch, "LIBRARY_BOOKS_FETCH_ERROR", err);
  }
};
