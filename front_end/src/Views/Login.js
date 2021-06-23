import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Container,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "reactfire";

function Login({ setUser }) {
  const [emailSignin, setEmailSignin] = React.useState("");
  const [passwordSignin, setPasswordSignin] = React.useState("");
  const [message, setMessage] = React.useState("");
  const auth = useAuth();
  const history = useHistory();

  function ingresar() {
    try {
      auth
        .signInWithEmailAndPassword(emailSignin, passwordSignin)
        .then((e) => {
          setUser(e.user);
          history.push("/dashboard");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use": {
              setMessage("El correo ya esta en uso.");
              break;
            }
            case "auth/invalid-email": {
              setMessage("El tipo de correo usado es invalido.");
              break;
            }
            case "auth/wrong-password": {
              setMessage("El correo/contrasena esta incorrecta.");
              break;
            }
            case "auth/user-not-found": {
              setMessage("El correo/contrasena esta incorrecta.");
              break;
            }
          }
        });
    } catch (error) {}
  }

  return (
    <Container className="mt-2">
      Sign in:
      <Form>
        <FormGroup row>
          <Label for="Correo" sm={2}>
            Email:{" "}
          </Label>
          <Col sm={10}>
            <Input
              className="form-control"
              type="email"
              name="email"
              sm={10}
              id="Correo"
              placeholder="correo@dirrecion.com"
              value={emailSignin}
              onChange={(e) => setEmailSignin(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="Passwordbox" sm={2}>
            Password:{" "}
          </Label>
          <Col sm={10}>
            <Input
              className="form-control"
              type="password"
              sm={10}
              name="password"
              id="Passwordbox"
              placeholder="Password"
              value={passwordSignin}
              onChange={(e) => setPasswordSignin(e.target.value)}
            />
          </Col>
        </FormGroup>
        {message ? (
          <div>
            {message} <br />{" "}
          </div>
        ) : null}
        <Button onClick={ingresar}>Log In</Button>
        <br />
        <br />
        <Button tag={Link} to="/registrar">
          Registrar
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
