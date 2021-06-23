import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Views/Login";
import Registrar from "./Views/Registrar";
import Dashboard from "./Views/Dashboard";
import Amigos from "./Views/Amigos";
import NavBar from "./Components/NavBar";
import "./App.css";

function App() {
  const [user, setUser] = React.useState(null);

  return (
    <div className="App">
      <Router>
        <NavBar user={user} setUser={setUser} />
        <Route path="/" exact>
          <Login setUser={setUser} />
        </Route>
        <Route path="/registrar" exact>
          <Registrar />
        </Route>
        <Route path="/dashboard" exact>
          <Dashboard user={user} />
        </Route>
        <Route path="/amigos" exact>
          <Amigos user={user} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
