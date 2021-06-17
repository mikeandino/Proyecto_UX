import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
//import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [users, setUsers] = useState("");
  const [apuntes, setApuntes] = useState("");

  const onChangeHandler = (event) => {
    if (event.name === "login") {
      setLogin(event.value);
    } else {
      setPassword(event.value);
    }
  };
  const Logon = () => {
    console.log(users);
    setUser(
      users.find(
        (element) => element.login === login && element.password === password
      )
    );
    console.log(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.reload();
    } else {
      setMessage("El usuario no existe");
    }
  };

  useEffect(() => {
    console.log(login);
    setUsers(JSON.parse(localStorage.getItem("users")));
    setApuntes(JSON.parse(localStorage.getItem("apuntes")));
  }, []);

  return (
    <Container>
      {JSON.parse(localStorage.getItem("user")) ? (
        <h1>Home</h1>
      ) : (
        <ul>
          <h1>Log In</h1>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="text"
                name="login"
                id="login"
                placeholder="JohnDoe"
                value={login}
                onChange={(e) => onChangeHandler(e.currentTarget)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="Password"
                placeholder="aaaaa"
                value={password}
                onChange={(e) => onChangeHandler(e.currentTarget)}
              />
            </FormGroup>
            {message ? <div>{message}</div> : null}
            <Button onClick={() => Logon()}>Log In</Button>
            <Link to="/registrar">Registrar</Link>
          </Form>{" "}
        </ul>
      )}
    </Container>
  );
};
export default Home;
