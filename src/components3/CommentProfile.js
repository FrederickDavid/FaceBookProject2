import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../components/AuthProvider";
import { app } from "../base";
const CommentProfile = ({ current, myId, comment }) => {
  const [profileHold, setProfileHold] = useState([]);

  const getData = async () => {
    await app
      .firestore()
      .collection("newuser")
      .doc(current)
      .get()
      .then((val) => {
        setProfileHold(val.data());
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Card key={myId}>
      <Avatar src={profileHold?.avatar} />
      <InputAndName>
        <Name>
          {profileHold.name} {"  "} {profileHold.surname}
        </Name>
        <Comment>{comment}</Comment>
      </InputAndName>
    </Card>
  );
};

export default CommentProfile;

const Comment = styled.div`
  font-size: 12px;
  font-family: arial;
  width: 250px;
  height: 100% auto;
  display: flex;
  padding: 10px 8px;
  background-color: lightblue;
  flex-wrap: wrap;
  text-align: left;
  border-radius: 0 10px 0 10px;
`;
const Name = styled.div`
  display: flex;
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 3px;
`;
const InputAndName = styled.div``;
const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;
const Card = styled.div`
  font-size: 12px;
  font-family: arial;
  height: 100% auto;
  display: flex;
  margin: 5px 0;
  align-items: center;
  width: 92%;
`;
const Picture = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
`;
