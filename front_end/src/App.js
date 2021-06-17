import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Apunte from "./Components/Apunte";
import Home from "./Views/Home";
import Registrar from "./Views/Registrar";

function App() {
  return (
    <Router>
      <NavBar />
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/registrar" exact>
        <Registrar />
      </Route>
    </Router>
  );
}

export default App;
