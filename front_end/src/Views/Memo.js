import React from "react";
import { Container, Form } from "reactstrap";
import Apunte from "../Components/Apunte";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { useParams } from "react-router-dom";

const Memo = ({ user }) => {
  const memoid = useParams().memoid;
  console.log(memoid);
  const apunteRef = useFirestore().collection("Posts").doc(memoid);
  const { status, data } = useFirestoreDocData(apunteRef);
  console.log(status);

  return (
    <Container>
      <Form>
        {status === "success"
          ? (console.log(data.etiquetas),
            (
              <div key={memoid}>
                <Apunte
                  id={memoid}
                  titulo={data.titulo}
                  texto={data.texto}
                  fecha={data.fecha}
                  etiquetas={data.etiquetas}
                  likes={data.likes}
                  dislikes={data.dislikes}
                  likedpor={data.likedpor}
                  dislikedpor={data.dislikes}
                  email={user ? user.email : null}
                />
              </div>
            ))
          : null}
      </Form>
    </Container>
  );
};

export default Memo;
