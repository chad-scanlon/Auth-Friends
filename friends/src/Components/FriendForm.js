import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
// import { InitialContext } from "../contexts/InitialContext";
import axiosWithAuth from "../utils/axiosWithAuth";

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
    <div className="form-container">
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
          {/* {errors.name.length > 0 ? (
            <p className="error">{errors.name}</p>
          ) : null} */}
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
          {/* {errors.age.length > 0 ? <p className="error">{errors.age}</p> : null} */}
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
          {/* {errors.height.length > 0 ? (
            <p className="error">{errors.email}</p>
          ) : null} */}
        </label>

        <button className="add-button" disabled={buttonDisabled}>
          Add to apartment
        </button>
      </form>
      {/* <Link to="/smurf-village">
        <button className="button">See The Friends!</button>
      </Link>
      <Link to="/">
        <button className="button">Home</button>
      </Link> */}
    </div>
  );
}
