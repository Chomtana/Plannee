import React from "react";
import ReactDOM from "react-dom";

import MainLayout from "../layout/MainLayout";

import "./index.css";
import Main from "../screens/Main";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <MainLayout>
        <Router>
          <Route exact path="/" component={Main} />
        </Router>
      </MainLayout>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
