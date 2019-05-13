import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import userReducer from "./userReducer";
import libraryReducer from "./libraryReducer";

export default (history: any) =>
  combineReducers({
    router: connectRouter(history) as any,
    user: userReducer as any,
    library: libraryReducer
  });
