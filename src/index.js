import React from "react";
import ReactDOM from "react-dom";

import MainLayout from "./layout/MainLayout";

import "./index.css";
import Main from "./screens/Main";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from 'react-redux'
import reducer from './reducer'

const store = createStore(reducer)

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MainLayout>
          <Router>
            <Route exact path="/" component={Main} />
          </Router>
        </MainLayout>
      </div>
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
