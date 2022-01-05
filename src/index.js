import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
import 'antd/dist/antd.css';
import App from "./App"



//First point : import few dependencies from react-redux and redux////

import {createStore} from "redux"
import {Provider} from "react-redux"
import rootReducer from "./reducers/rootReducer"
import {composeWithDevTools} from "redux-devtools-extension"

////Second Point: creating the reducer function ///

///each action has a type and payload property//
///{type:"LOGGED_IN_USER", payload:"getting data from the backend like name, role etc"}

// const authReducer = (state={name:"mekala", desig:"SDE"},action)=>{

// switch(action.type){
  
//   case "LOGGED_IN_USER":

//     return {...state,...action.payload}

//   case "LOGOUT":

//     return action.payload
 
//     default:

//      return state;

// }

// }


// ///Third Point: Combining multiple reducers////

// const rootReducer= combineReducers({

// user: authReducer


// })


// ///Fourth Point : Creating Redux store/////

const store = createStore(rootReducer,composeWithDevTools())


////Fifth Point: providing Provider dependency for accessing the state to entire application////




ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

