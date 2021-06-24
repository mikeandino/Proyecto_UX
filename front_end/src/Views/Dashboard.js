import React from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardTitle,
  CardBody,
} from "reactstrap";
import Apunte from "../Components/Apunte";

function Dashboard({ user }) {
  const [titulo, setTitulo] = React.useState("");
  const [texto, setTexto] = React.useState("");
  const [tag, setTag] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [filtro, setFiltro] = React.useState([]);
  const collectionposts = useFirestore().collection("Posts");
  const arrayvalue = useFirestore.FieldValue;
  const userDatos = useFirestore().collection("UserData").doc(user.email);
  const { status: statusPosts, data: dataPosts } =
    useFirestoreCollectionData(collectionposts);

  function publicar() {
    const hoy = new Date();
    if (titulo !== "" || texto !== "") {
      collectionposts.add({
        titulo: titulo,
        texto: texto,
        fecha: hoy.toDateString(),
        etiquetas: tags,
        likes: Number(0),
        dislikes: Number(0),
        likedpor: [],
        dislikedpor: [],
      });
      setTitulo("");
      setTexto("");
      tags.splice(0, tags.length);
    }
  }

  return (
    <Container>
      <Form>
        <div>
          <Card>
            <CardBody>
              <CardTitle tag="h3">Sube tu post!</CardTitle>
              <Input
                name="titulo"
                placeholder="Titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <br />
              <Input
                type="textarea"
                name="texto"
                placeholder="Post"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
              />
              <br />
              <Form inline>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label for="examplePassword" className="mr-sm-2">
                    Etiquetas:{" "}
                  </Label>
                  <Input
                    type="text"
                    name="tags"
                    id="exampleTags"
                    onChange={(e) => setTag(e.target.value)}
                  />
                </FormGroup>
                <Button
                  onClick={() => {
                    tags.push(tag);
                    setTag("");
                    console.log(tags);
                  }}
                >
                  {" "}
                  Agregar{" "}
                </Button>
                <ul>
                  {tags.map((element, index) => (
                    <li key={index}>
                      {element + "        "}
                      <Button
                        close
                        onClick={() => tags.splice(tags.indexOf(element), 1)}
                      />
                    </li>
                  ))}
                </ul>
              </Form>
              <br />
              <Button size="sm" onClick={() => publicar()}>
                Subir
              </Button>
            </CardBody>
          </Card>
        </div>

        <div>
          <Form inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="examplePassword" className="mr-sm-2">
                Filtrar por etiquetas:{" "}
              </Label>
              <Input
                type="text"
                name="filter"
                id="exampleFilter"
                onChange={(e) => setFiltro(e.target.value)}
              />
            </FormGroup>
          </Form>
        </div>

        <div>
          {filtro === ""
            ? //Todos los apuntes
              statusPosts === "success" && (
                <div>
                  {dataPosts.map((post) => (
                    <div key={post.NO_ID_FIELD}>
                      <Apunte
                        id={post.NO_ID_FIELD}
                        titulo={post.titulo}
                        texto={post.texto}
                        fecha={post.fecha}
                        etiquetas={post.etiquetas}
                        likes={post.likes}
                        dislikes={post.dislikes}
                        likedpor={post.likedpor}
                        dislikedpor={post.dislikes}
                        email={user.email}
                      />
                    </div>
                  ))}
                </div>
              )
            : //Apuntes filtrados
              statusPosts === "success" && (
                <div>
                  {dataPosts.map((post) =>
                    post.etiquetas.some((x) => x.includes(filtro)) ? (
                      <div key={post.NO_ID_FIELD}>
                        <Apunte
                          id={post.NO_ID_FIELD}
                          titulo={post.titulo}
                          texto={post.texto}
                          fecha={post.fecha}
                          etiquetas={post.etiquetas}
                          likes={post.likes}
                          dislikes={post.dislikes}
                          likedpor={post.likedpor}
                          dislikedpor={post.dislikedpor}
                          email={user.email}
                        />
                      </div>
                    ) : null
                  )}
                </div>
              )}
        </div>
      </Form>
    </Container>
  );
}

export default Dashboard;
