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
import React from "react";
import { useFirestore, useFirestoreDocData } from "reactfire";

const Apunte = (props) => {
  console.log(props.id);
  const did = props.id;
  console.log(did);
  const apuntedoc = useFirestore().collection("Posts").doc(props.id);
  const arrayvalue = useFirestore.FieldValue;

  function Darlike() {
    if (!props.likedpor.includes(props.email)) {
      //agregar a favoritos
      apuntedoc.update({
        likes: Number(props.likes) + 1,
        likedpor: arrayvalue.arrayUnion(props.email),
      });
    } else {
      //quitar de favoritos
      apuntedoc.update({
        likes: Number(props.likes) - 1,
        likedpor: arrayvalue.arrayRemove(props.email),
      });
    }
  }

  function Dardislike() {
    if (!props.dislikedpor.includes(props.email)) {
      //agregar a dislike
      apuntedoc.update({
        dislikes: Number(props.dislikes) + 1,
        dislikedpor: arrayvalue.arrayUnion(props.email),
      });
    } else {
      //quitar de dislkike
      apuntedoc.update({
        dislikes: Number(props.dislikes) - 1,
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
          <ButtonToggle
            color="primary"
            active={props.email}
            onClick={() => Darlike()}
          >
            Likes: {"" + props.likes}
          </ButtonToggle>{" "}
          <ButtonToggle
            color="primary"
            active={props.email}
            onClick={() => Dardislike()}
          >
            Dislike: {"" + props.dislikes}
          </ButtonToggle>{" "}
          <ButtonToggle
            color="primary"
            onClick={() => {
              console.log(did);
              navigator.clipboard.writeText(
                "http://localhost:3000/memo/" + did
              );
            }}
          >
            Compartir
          </ButtonToggle>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Apunte;
