import React, { useEffect, useState } from "react";
import MainScreen from "../../Component/MainScreen";
import { Link } from "react-router-dom";
import { Badge, Button, Card, useAccordionButton } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { listNotes } from "../../Actions/notesAction";

const MyNotes = () => {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);

  const { loading, notes, error } = noteList;

  function Toggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
    );

    return (
      <button
        className="border rounded p-1 hover:bg-cyan-950 "
        type="button"
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
    }
  };

  console.log(notes);

  useEffect(() => {
    dispatch(listNotes());
  }, [dispatch]);
  return (
    <div>
      <MainScreen title="Welcome Back Tewodros Abebe...">
        <Link to="createnote">
          <Button className="ml-2.5 mb-1.5">Create New Note</Button>
        </Link>

        {notes?.map((note) => (
          <Accordion key={note._id}>
            <Card className="m-2.5">
              <Card.Header className="flex">
                <span className="text-white font-serif no-underline flex-1 cursor-pointer text-lg self-center ">
                  <Toggle as={Card.Text} eventKey="0">
                    {note.title}
                  </Toggle>
                </span>
                <div>
                  <Button href={`/note/${note._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>

              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <h4>
                    <Badge bg="dark">Category - {note.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Created on - date
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
      </MainScreen>
    </div>
  );
};

export default MyNotes;
