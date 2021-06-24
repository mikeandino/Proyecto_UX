import React from "react";
import { Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { useFirestore, useAuth } from "reactfire";

function Registrar({ setUser }) {
  const [emailSignup, setEmailSignup] = React.useState("");
  const [passwordSignup, setPasswordSignup] = React.useState("");
  const [message, setMessage] = React.useState("");
  const auth = useAuth();
  const collectionudata = useFirestore().collection("UserData");
  const history = useHistory();

  function registrar() {
    try {
      auth
        .createUserWithEmailAndPassword(emailSignup, passwordSignup)
        .then((e) => {
          setEmailSignup("");
          setPasswordSignup("");
          setMessage("Cuenta creada exitosamente");
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
          }
        });
    } catch (error) {}
  }

  return (
    <div>
      <br />
      Sign up:
      <br />
      <label>Email: </label>
      <input
        type="text"
        value={emailSignup}
        onChange={(e) => setEmailSignup(e.target.value)}
      />
      <br />
      <label>Password: </label>
      <input
        type="password"
        value={passwordSignup}
        onChange={(e) => setPasswordSignup(e.target.value)}
      />
      <br />
      <Button
        onClick={() => {
          registrar();
        }}
      >
        Registrar
      </Button>
      {"    "}
      {"    "}
      {"  "}
      <Button tag={Link} to="/">
        Volver Atras
      </Button>
      {message ? <div>{message}</div> : null}
    </div>
  );
}

export default Registrar;
