import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";

import MainLayout from "./layout/MainLayout";

import "./index.css";
import Main from "./screens/Main";
import Profile from './screens/Profile';

//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from 'react-redux'
import reducer from './reducer'
import Route from './router/Route';
import Login_page from './screens/Login_page';

import store from './store'
import Summary from './screens/Summary/index';
import Goal from './screens/Goal/index';

import * as serviceWorker from './serviceWorker';
import DepositScreen from "./screens/DepositScreen";
import AcheiveShare from "./screens/AcheiveShare";
import TransactionScreen from "./screens/Transaction/TransactionScreen";

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import LoginScreen from "./screens/Login/LoginScreen";
import useStatePointer from "./pointer/useStatePointer";
import usePointer from "./pointer/usePointer";

console.log(store);

require("./initializeFa")
require("./firebaseauthui")

function MainOrLoginScreen() {
  const user_detail = usePointer("user_detail");
  
  if (!user_detail || !user_detail.isReady) return <LoginScreen></LoginScreen>
  
  const uid = user_detail("uid")();
  //console.log(uid);
  
  if (!uid || uid === "testuser") return <LoginScreen></LoginScreen>
  
  return <Main></Main>
}

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Provider store={store}>
        <div className="App">
          <MainLayout>
            <Route exact path={["summary"]} component={Summary} />
            <Route exact path={["profile"]} component={Profile} />
            <Route exact path={["login"]} component={LoginScreen} />
            <Route exact path={["goal"]} component={Goal} />
            <Route exact path={["home"]} component={Main} />
            <Route exact path={["deposit"]} component={DepositScreen} />
            <Route exact path={["acheiveshare"]} component={AcheiveShare} />
            <Route exact path={["transaction"]} component={TransactionScreen} />

            <Route exact path={[]} component={MainOrLoginScreen} />
          </MainLayout>
        </div>
      </Provider>
    </MuiPickersUtilsProvider>
  );
}

function startApp() {
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);
}

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}

if (window.plugins) {
  window.plugins.speechRecognition.isRecognitionAvailable(()=>{
    alert("Available")
  },()=>{
    alert("Not available")
  });
}

//make it PWA
serviceWorker.register();
