import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Card } from "react-bootstrap";
// import axiosWithAuth from "../utils/axiosWithAuth";

const Friends = (props) => {
  console.log(props);
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={logo} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.age}</Card.Text>
          <Card.Text>{props.email}</Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
      {/* <div className="friends">
        <div className="friends-box">
          <p>{props.name}</p>
          <p>{props.age}</p>
          <p>{props.email}</p>
        </div>

        <div className="friend-img-box">
          <img className="friend-img" src={logo} />
        </div>
      </div> */}
    </>
  );
};

export default Friends;
