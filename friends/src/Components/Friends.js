import React, { useState } from "react";
import logo from "../assets/logo.png";

// import axiosWithAuth from "../utils/axiosWithAuth";

const Friends = (props) => {
  console.log(props);
  return (
    <>
      <div className="friends">
        <div className="friends-box">
          <p>{props.name}</p>
          <p>{props.age}</p>
          <p>{props.email}</p>
        </div>

        <div className="friend-img-box">
          <img className="friend-img" src={logo} />
        </div>
      </div>
    </>
  );
};

export default Friends;
