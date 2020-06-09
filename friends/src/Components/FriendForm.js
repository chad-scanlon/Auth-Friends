import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
// import { InitialContext } from "../contexts/InitialContext";
import axiosWithAuth from "../utils/axiosWithAuth";
import { Form, Button } from "react-bootstrap";

const formSchema = yup.object().shape({
  name: yup.string().required("full name now"),
  age: yup.string().required("email right now"),
  email: yup.string().required("password let's go"),
});

export default function FriendForm() {
  const [friend, addFriend] = useState([]);
  //   const { smurfs, addSmurf } = useContext(InitialContext);

  const [formState, setFormState] = useState({
    name: "",
    age: "",
    email: "",
    id: Date.now(),
  });

  const [errors, setErrors] = useState({
    name: "",
    age: "",
    email: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const validateChange = (event) => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [event.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [event.target.name]: err.errors[0],
        });
      });
  };

  const formSubmit = (event) => {
    // event.preventDefault();
    axiosWithAuth()
      .post("/friends", formState)
      .then((res) => {
        console.log(res);
        addFriend(res.data);
      });
    setFormState({
      name: "",
      age: "",
      height: "",
      id: Date.now(),
    }).catch((err) => console.error(err.message));
  };

  const inputChange = (event) => {
    event.persist();
    const newFormData = {
      ...formState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    };
    validateChange(event);
    setFormState(newFormData);
  };

  return (
    <>
      {/* <div className="form-container">
        <h1>Add New Friend</h1>
        <form onSubmit={formSubmit}>
          <label htmlFor="name">
            Name
            <input
              id="name"
              type="text"
              name="name"
              value={formState.name}
              onChange={inputChange}
            />
          </label>

          <label htmlFor="age">
            Age
            <input
              id="age"
              type="age"
              name="age"
              value={formState.age}
              onChange={inputChange}
              data-cy="age"
            />
          </label>
          <label htmlFor="height">
            Email
            <input
              id="height"
              type="text"
              name="email"
              value={formState.email}
              onChange={inputChange}
              data-cy="email"
            />
          </label>

          <button className="add-button" disabled={buttonDisabled}>
            Add to apartment
          </button>
        </form>
      </div> */}
      <Form onSubmit={formSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
