import {setUserReducer} from "./reducers/setUserReducer"
import {createStore} from "redux";

export const configureStore = () => {
    return createStore(setUserReducer);

};