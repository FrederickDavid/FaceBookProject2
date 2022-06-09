import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../components/AuthProvider";
import { app } from "../base";
import CommentProfile from "./CommentProfile";
const CommentComp = ({ myId, all, justone }) => {
  const { currentUser } = useContext(AuthContext);
  const [commentHolder, setCommentHolder] = useState([]);
  const [commentHolder1, setCommentHolder1] = useState([]);

  const getOneComment = async () => {
    await app
      .firestore()
      .collection("mainpost")
      .doc(myId)
      .collection("comment")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot((snap) => {
        const r = [];
        snap.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        setCommentHolder1(r);
      });
  };
  const getAllComment = async () => {
    await app
      .firestore()
      .collection("mainpost")
      .doc(myId)
      .collection("comment")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        const r = [];
        snap.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        setCommentHolder(r);
      });
  };

  useEffect(() => {
    getOneComment();
    getAllComment();
    console.log(commentHolder);
  }, []);

  return (
    <div style={{ display: "flex", width: "90%" }}>
      {all ? (
        <CardHolder>
          {commentHolder.map((props) => (
            <CommentProfile
              current={props.createdBy}
              myId={props.id}
              comment={props.comment}
            />
          ))}
        </CardHolder>
      ) : null}
      {justone ? (
        <CardHolder>
          {commentHolder1.map((props) => (
            <CommentProfile
              current={props.createdBy}
              myId={props.id}
              comment={props.comment}
            />
          ))}
        </CardHolder>
      ) : null}
    </div>
  );
};

export default CommentComp;

const CardHolder = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;
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
