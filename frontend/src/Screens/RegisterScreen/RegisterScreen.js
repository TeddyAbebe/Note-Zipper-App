import React, { useState } from "react";
import MainScreen from "../../Component/MainScreen";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorMessage from "../../Component/ErrorMessage";
import Loading from "../../Component/Loading";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Passwords Do Not Match");
    } else {
      setMessage(null);

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        setLoading(true);

        const { data } = await axios.post(
          "http://localhost:3001/api/users",
          { name, pic, email, password },
          config
        );

        setLoading(false);
        localStorage.setItem("useInfo", JSON.stringify(data));
        // setError(false);
      } catch (error) {
        setError(error.reponse.data.message);
      }
    }
  };

  return (
    <MainScreen title="Register">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label className="text-cyan-500 font-semibold">
              Name
            </Form.Label>
            <Form.Control
              className="py-1 font-mono"
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label className="text-cyan-500 font-semibold">
              Email Address
            </Form.Label>
            <Form.Control
              className="py-1 font-mono"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="text-cyan-500 font-semibold">
              Password
            </Form.Label>
            <Form.Control
              className="py-1 font-mono"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label className="text-cyan-500 font-semibold">
              Confirm Password
            </Form.Label>
            <Form.Control
              className="py-1 font-mono "
              type="password"
              placeholder="Confirm password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {/* {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )} */}

          <Form.Group controlId="pic">
            <Form.Label className="text-cyan-500 font-semibold">
              Profile Picture
            </Form.Label>

            <Form.Control
              className="py-1 font-mono"
              type="file"
              id="custom-file"
              label="Upload Profile Picture"
              custom
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3 ">
            <b className="font-serif font-semibold">Register </b>
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ?
            <Link to="/login" className="font-serif mx-2 hover:text-cyan-500 ">
              Login
            </Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
