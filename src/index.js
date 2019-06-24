import React from "react";
import ReactDOM from "react-dom";

import MainLayout from "./layout/MainLayout";

import "./index.css";
import Main from "./screens/Main";

//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from 'react-redux'
import reducer from './reducer'
import Route from './router/Route';
import Login_page from './screens/Login_page';

import store from './store'

require("./initializeFa")

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MainLayout>
          <Route exact path={["login"]} component={Login_page} />
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

if(window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
