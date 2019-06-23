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

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

require("./initializeFa")

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MainLayout>
<<<<<<< HEAD
          <Route exact path={[]} component={Profile} />
=======
          <Route exact path={["login"]} component={Login_page} />
          <Route exact path={[]} component={Main} />
>>>>>>> 16e84b757535f5d3a2bd55c8e3575a650185796f
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
