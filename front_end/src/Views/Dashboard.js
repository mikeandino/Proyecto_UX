import React from "react";
import {
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
} from "reactfire";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardTitle,
  CardText,
  CardBody,
  ButtonGroup,
  CardHeader,
  CardFooter,
  ButtonToggle,
} from "reactstrap";

function Dashboard({ user }) {
  const [titulo, setTitulo] = React.useState("");
  const [texto, setTexto] = React.useState("");
  const [postsrender, setPostsrender] = React.useState(0);
  const collectionposts = useFirestore().collection("Posts");
  const arrayvalue = useFirestore.FieldValue;
  const userDatos = useFirestore().collection("UserData").doc(user.email);
  const { status: statusPosts, data: dataPosts } =
    useFirestoreCollectionData(collectionposts);
  const { data: datauData } = useFirestoreDocData(userDatos);

  function publicar() {
    if (titulo !== "" || texto !== "") {
      collectionposts.add({
        autor: user.email,
        titulo: titulo,
        texto: texto,
        likes: Number(0),
        dislikes: Number(0),
      });
      setTitulo("");
      setTexto("");
    }
  }

  function borrar(pid) {
    const likesRef = collectionposts.doc(pid);
    likesRef.delete(pid);
  }

  function Darlike(pid, nlikes) {
    if (!datauData.likes.includes(pid)) {
      //agregar a favoritos
      const likesRef = collectionposts.doc(pid);
      const userdalike = arrayvalue.arrayUnion(user.email);
      likesRef.update({
        likes: Number(nlikes) + 1,
        likedpor: userdalike,
      });
      userDatos.update({
        likes: arrayvalue.arrayUnion(pid),
      });
    } else {
      //quitar de favoritos
      const likesRef = collectionposts.doc(pid);
      const userquitalike = arrayvalue.arrayRemove(user.email);
      likesRef.update({
        likes: Number(nlikes) - 1,
        likedpor: userquitalike,
      });
      userDatos.update({
        likes: arrayvalue.arrayRemove(pid),
      });
    }
  }

  function Dardislike(pid, ndislikes) {
    if (!datauData.dislikes.includes(pid)) {
      //agregar a dislike
      const likesRef = collectionposts.doc(pid);
      likesRef.update({
        dislikes: Number(ndislikes) + 1,
      });
      userDatos.update({
        dislikes: arrayvalue.arrayUnion(pid),
      });
    } else {
      //quitar de dislkike
      const likesRef = collectionposts.doc(pid);
      likesRef.update({
        dislikes: Number(ndislikes) - 1,
      });
      userDatos.update({
        dislikes: arrayvalue.arrayRemove(pid),
      });
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
              <Button size="sm" onClick={() => publicar()}>
                Publicar
              </Button>
            </CardBody>
          </Card>
        </div>

        <div>
          <ButtonGroup vertical>
            <FormGroup tag="fieldset">
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    onChange={() => setPostsrender(0)}
                    defaultChecked
                  />
                  Mostrar todos
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    onChange={() => setPostsrender(1)}
                  />
                  Mostrar solo post de amigos
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    onChange={() => setPostsrender(2)}
                  />
                  Mostrar solo favoritos
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    onChange={() => setPostsrender(3)}
                  />
                  Mostrar solo toxicos
                </Label>
              </FormGroup>
            </FormGroup>
          </ButtonGroup>
        </div>

        <div>
          {postsrender === 0
            ? //Todos los post
              statusPosts === "success" && (
                <div>
                  {dataPosts.map((post) => (
                    <div key={post.NO_ID_FIELD}>
                      <br />
                      <Card>
                        <CardHeader>Post por: {post.autor}</CardHeader>
                        <CardBody>
                          <CardTitle tag="h5">{post.titulo}</CardTitle>
                          <CardText>{post.texto}</CardText>
                        </CardBody>
                        <CardFooter>
                          <ButtonToggle
                            color="primary"
                            onClick={() =>
                              Darlike(post.NO_ID_FIELD, post.likes)
                            }
                          >
                            Likes: {"" + post.likes}
                          </ButtonToggle>{" "}
                          <ButtonToggle
                            color="primary"
                            onClick={() =>
                              Dardislike(post.NO_ID_FIELD, post.dislikes)
                            }
                          >
                            Dislike: {"" + post.dislikes}
                          </ButtonToggle>{" "}
                          {post.autor === user.email ? (
                            <ButtonToggle
                              color="danger"
                              onClick={() => borrar(post.NO_ID_FIELD)}
                            >
                              Eliminar
                            </ButtonToggle>
                          ) : null}
                        </CardFooter>
                      </Card>
                    </div>
                  ))}
                </div>
              )
            : postsrender === 1
            ? //Post amigos
              statusPosts === "success" && (
                <div>
                  {dataPosts.map((post) =>
                    datauData.amigos.includes(post.autor) ? (
                      <div key={post.NO_ID_FIELD}>
                        <Card>
                          <CardHeader>Post por: {post.autor}</CardHeader>
                          <CardBody>
                            <CardTitle tag="h5">{post.titulo}</CardTitle>
                            <CardText>{post.texto}</CardText>
                          </CardBody>
                          <CardFooter>
                            <ButtonToggle
                              color="primary"
                              onClick={() =>
                                Darlike(post.NO_ID_FIELD, post.likes)
                              }
                            >
                              Likes: {"" + post.likes}
                            </ButtonToggle>{" "}
                            <ButtonToggle
                              color="primary"
                              onClick={() =>
                                Dardislike(post.NO_ID_FIELD, post.dislikes)
                              }
                            >
                              Dislikes: {"" + post.dislikes}
                            </ButtonToggle>{" "}
                            {post.autor === user.email ? (
                              <ButtonToggle
                                color="danger"
                                onClick={() => borrar(post.NO_ID_FIELD)}
                              >
                                Eliminar
                              </ButtonToggle>
                            ) : null}
                          </CardFooter>
                        </Card>
                      </div>
                    ) : null
                  )}
                </div>
              )
            : postsrender === 2
            ? //Post likes
              statusPosts === "success" && (
                <div>
                  {dataPosts.map((post) =>
                    datauData.likes.map((pf) =>
                      post.NO_ID_FIELD === pf ? (
                        <div key={post.NO_ID_FIELD}>
                          <Card>
                            <CardHeader>Post por: {post.autor}</CardHeader>
                            <CardBody>
                              <CardTitle tag="h5">{post.titulo}</CardTitle>
                              <CardText>{post.texto}</CardText>
                            </CardBody>
                            <CardFooter>
                              <ButtonToggle
                                color="primary"
                                onClick={() =>
                                  Darlike(post.NO_ID_FIELD, post.likes)
                                }
                              >
                                Likes: {"" + post.likes}
                              </ButtonToggle>{" "}
                              <ButtonToggle
                                color="primary"
                                onClick={() =>
                                  Dardislike(post.NO_ID_FIELD, post.dislikes)
                                }
                              >
                                Dislikes: {"" + post.dislikes}
                              </ButtonToggle>{" "}
                              {post.autor === user.email ? (
                                <ButtonToggle
                                  color="danger"
                                  onClick={() => borrar(post.NO_ID_FIELD)}
                                >
                                  Eliminar
                                </ButtonToggle>
                              ) : null}
                            </CardFooter>
                          </Card>
                        </div>
                      ) : null
                    )
                  )}
                </div>
              )
            : //Post dislikes
              statusPosts === "success" && (
                <div>
                  {dataPosts.map((post) =>
                    datauData.dislikes.map((pd) =>
                      post.NO_ID_FIELD === pd ? (
                        <div key={post.NO_ID_FIELD}>
                          <Card>
                            <CardHeader>Post por: {post.autor}</CardHeader>
                            <CardBody>
                              <CardTitle tag="h5">{post.titulo}</CardTitle>
                              <CardText>{post.texto}</CardText>
                            </CardBody>
                            <CardFooter>
                              <ButtonToggle
                                color="primary"
                                onClick={() =>
                                  Darlike(post.NO_ID_FIELD, post.likes)
                                }
                              >
                                Likes: {"" + post.likes}
                              </ButtonToggle>{" "}
                              <ButtonToggle
                                color="primary"
                                onClick={() =>
                                  Dardislike(post.NO_ID_FIELD, post.dislikes)
                                }
                              >
                                Dislikes: {"" + post.dislikes}
                              </ButtonToggle>{" "}
                              {post.autor === user.email ? (
                                <ButtonToggle
                                  color="danger"
                                  onClick={() => borrar(post.NO_ID_FIELD)}
                                >
                                  Eliminar
                                </ButtonToggle>
                              ) : null}
                            </CardFooter>
                          </Card>
                        </div>
                      ) : null
                    )
                  )}
                </div>
              )}
        </div>
      </Form>
    </Container>
  );
}

export default Dashboard;
