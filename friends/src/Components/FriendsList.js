import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import axiosWithAuth from "../utils/axiosWithAuth";

import Friends from "./Friends";
import FriendForm from "./FriendForm";

const FriendsList = (props) => {
  console.log(props);
  const [friends, setFriends] = useState([]);

  axiosWithAuth()
    .get("/friends")
    .then((res) => {
      console.log(res);
      setFriends(res.data);
    })
    .catch((err) => console.error(err.message));

  return (
    <>
      <Link to="/">
        <button className="go-home-button">Home</button>
      </Link>
      <div>
        <div className="friends-container">
          {friends.map((friend) => (
            <Friends
              key={friend.id}
              name={friend.name}
              age={friend.age}
              email={friend.email}
            />
          ))}
        </div>
      </div>
      <FriendForm />
    </>
  );

  /* <div>
          {props.fetchingData && (
            <div className="key spinner">
              <Loader type="Puff" color="#204963" height="60" width="60" />
              <p>Loading Data</p>
            </div>
          )}
        </div>
        
      </> */
};

export default FriendsList;
