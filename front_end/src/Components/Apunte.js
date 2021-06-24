import {
  ButtonToggle,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle,
  CardText,
  Badge,
} from "reactstrap";
import React, { useState, useEffect } from "react";
import { useFirestore, useFirestoreDocData } from "reactfire";
//import { Link } from "react-router-dom";

const Apunte = (props) => {
  //const [alumno, setAlumno] = useState("");
  const apuntedoc = useFirestore().collection("Posts").doc(props.id);
  const arrayvalue = useFirestore.FieldValue;

  function Darlike(nlikes) {
    if (!props.likedpor.includes(props.email)) {
      //agregar a favoritos
      apuntedoc.update({
        likes: Number(nlikes) + 1,
        likedpor: arrayvalue.arrayUnion(props.email),
      });
    } else {
      //quitar de favoritos
      apuntedoc.update({
        likes: Number(nlikes) - 1,
        likedpor: arrayvalue.arrayRemove(props.email),
      });
    }
  }

  function Dardislike(ndislikes) {
    if (!props.dislikedpor.includes(props.email)) {
      //agregar a dislike
      apuntedoc.update({
        dislikes: Number(ndislikes) + 1,
        dislikedpor: arrayvalue.arrayUnion(props.email),
      });
    } else {
      //quitar de dislkike
      apuntedoc.update({
        dislikes: Number(ndislikes) - 1,
        dislikedpor: arrayvalue.arrayRemove(props.email),
      });
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>Publicado en: {props.fecha}</CardHeader>
        <CardBody>
          <CardTitle tag="h5">{props.titulo}</CardTitle>
          <CardText>{props.texto}</CardText>
        </CardBody>
        <CardFooter>
          {props.etiquetas.map((tag) => (
            <Badge color="primary" pill>
              {tag}
            </Badge>
          ))}
        </CardFooter>
        <CardFooter>
          <ButtonToggle color="primary" onClick={() => Darlike(props.likes)}>
            Likes: {"" + props.likes}
          </ButtonToggle>{" "}
          <ButtonToggle
            color="primary"
            onClick={() => Dardislike(props.dislikes)}
          >
            Dislike: {"" + props.dislikes}
          </ButtonToggle>{" "}
          <ButtonToggle color="primary" onClick={() => console.log("lol")}>
            Compartir
          </ButtonToggle>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Apunte;
