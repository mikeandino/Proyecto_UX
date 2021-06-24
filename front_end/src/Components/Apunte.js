import React from "react";
import {
  ButtonToggle,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle,
  CardText,
  Badge,
  Popover,
  PopoverBody,
} from "reactstrap";
import { useFirestore } from "reactfire";

const Apunte = (props) => {
  const apuntedoc = useFirestore().collection("Posts").doc(props.id);
  const arrayvalue = useFirestore.FieldValue;
  const [poptimer, setPoptimer] = React.useState(false);
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
            disabled={props.email === null}
            onClick={() => Darlike()}
          >
            Likes: {"" + props.likes}
          </ButtonToggle>{" "}
          <ButtonToggle
            color="primary"
            disabled={props.email === null}
            onClick={() => Dardislike()}
          >
            Dislike: {"" + props.dislikes}
          </ButtonToggle>{" "}
          <ButtonToggle
            id="compartir"
            color="primary"
            onClick={() => {
              navigator.clipboard.writeText(
                "http://localhost:3000/memo/" + props.id
              );
            }}
          >
            Compartir
          </ButtonToggle>
          <Popover
            placement="top"
            isOpen={poptimer}
            target="compartir"
            toggle={() => setPoptimer(!poptimer)}
          >
            <PopoverBody>Copiado al portapapeles!</PopoverBody>
          </Popover>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Apunte;
