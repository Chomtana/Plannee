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

console.log(store);

require("./initializeFa")

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MainLayout>
          <Route exact path={["summary"]} component={Summary} />
          <Route exact path={["profile"]} component={Profile} />
          <Route exact path={["login"]} component={Main} />
          <Route exact path={["goal"]} component={Goal} />
          <Route exact path={["home"]} component={Main} />
          <Route exact path={["deposit"]} component={DepositScreen} />
          <Route exact path={["acheiveshare"]} component={AcheiveShare} />
          <Route exact path={["transaction"]} component={TransactionScreen} />

          <Route exact path={[]} component={Main} />
        </MainLayout>
      </div>
    </Provider>
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
