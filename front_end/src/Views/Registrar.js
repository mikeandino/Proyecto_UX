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

const Registrar = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onChangeHandler = (event) => {
    switch (event.name) {
      case "login":
        {
          setLogin(event.value);
        }
        break;
      case "password":
        {
          setPassword(event.value);
        }
        break;
    }
  };
  const Registrar = () => {
    const newAlumno = { login, password };
    const users = JSON.parse(localStorage.getItem("users"));
    users.push(newAlumno);
    localStorage.setItem("users", JSON.stringify(users));
  };

  return (
    <Container>
      <Form>
        <h1>Registrar</h1>
        <FormGroup>
          <Label for="exampleLogin">Login</Label>
          <Input
            type="text"
            name="login"
            id="login"
            placeholder="Login"
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
        <Button onClick={() => Registrar()}>Registrar</Button>
      </Form>
    </Container>
  );
};

export default Registrar;
