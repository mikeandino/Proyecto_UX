import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Views/Home";
import NavBar from "./Components/NavBar";
import Apunte from "./Components/Apunte";

function App() {
  return (
    <Router>
      <NavBar />
      <Route path="/" exact>
        <Home />
      </Route>
    </Router>
  );
}

export default App;
