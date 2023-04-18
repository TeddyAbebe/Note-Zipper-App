import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userLoginReducer, userRegisterReducer } from "./Reducers/userReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { noteListReducer } from "./Reducers/notesReducer";

const reducer = combineReducers({
  // this will contain our reducers
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  noteList: noteListReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
