import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import img from "./background.jpg";
import {
  AiFillCaretDown,
  AiFillLike,
  AiOutlineLike,
  AiTwotoneDelete,
} from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import PostProfile from "./PostProfile";
import LikeCoomp from "./LikeCoomp";
import firebase from "firebase";
import { AuthContext } from "../components/AuthProvider";
import { app } from "../base";
import CommentComp from "./CommentComp";
const ThePostComp = ({ current, myId, date, content, avatar, toggle }) => {
  const { currentUser } = useContext(AuthContext);
  const [likeToggle, setLikeToggle] = useState(true);
  const [image, setImage] = React.useState(img);
  const [comment, setComment] = useState("");
  const [commentHolder, setCommentHolder] = useState([]);

  const createComment = async () => {
    await app
      .firestore()
      .collection("mainpost")
      .doc(myId)
      .collection("comment")
      .doc()
      .set({
        comment,
        createdBy: currentUser.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        toggle: false,
      });

    setComment("");
  };

  const changeToggle = async () => {
    setLikeToggle(!likeToggle);
  };

  const changeComment = async () => {
    await app.firestore().collection("mainpost").doc(myId).update({
      toggle: likeToggle,
    });
  };

  const getComment = async () => {
    await app
      .firestore()
      .collection("mainpost")
      .doc(myId)
      .collection("comment")
      .onSnapshot((snap) => {
        const r = [];
        snap.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        setCommentHolder(r);
      });
  };

  useEffect(() => {
    getComment();
    console.log(commentHolder);
  }, []);

  return (
    <ThePost>
      <PostProfile current={current} myId={myId} date={date} />
      <WriteUp>{content}</WriteUp>
      <PostPictures src={avatar} />
      <LikeNameComment>
        <Onw>
          <LikeCoomp likeicon current={current} myId={myId} />
          <LikeCoomp youlike current={current} myId={myId} />
        </Onw>

        <LikeCoomp
          commenticon
          current={current}
          myId={myId}
          x={commentHolder.length}
        />
      </LikeNameComment>
      <LiveCommentIcon>
        <LikeCoomp like current={current} myId={myId} />
        <LikeClickHolder
          fs="15px"
          bg="gray"
          onClick={() => {
            changeToggle();
            changeComment();
          }}
        >
          <BiComment />
          <span>Comment</span>
        </LikeClickHolder>
      </LiveCommentIcon>
      {toggle ? (
        <CommentComp myId={myId} current={current} all />
      ) : (
        <CommentComp myId={myId} current={current} justone />
      )}

      <ProfileCommentStickers>
        <PictureBox>
          <Picture src={image} />
          <ActiveCircle></ActiveCircle>
        </PictureBox>
        <InputHolder>
          <MyComment
            placeholder="Write a comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <CommentSticker
            type="submit"
            onClick={(e) => {
              console.log(comment);
              e.preventDefault();
              createComment();
            }}
          >
            Send
          </CommentSticker>
        </InputHolder>
      </ProfileCommentStickers>
    </ThePost>
  );
};

export default ThePostComp;

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

const ActiveCircle = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #31a24c;
  border: 2px solid white;
  /* top: 0; */
  right: 0;
  bottom: 0;
`;
const PictureBox = styled.div`
  display: flex;
  position: relative;
  /* background-color: purple; */
  width: 40px;
  height: 35px;
  margin-right: 10px;
`;
const HomeMainPost = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OneSticker = styled.div``;
const CommentSticker = styled.button`
  display: none;
`;
const MyComment = styled.input`
  display: flex;
  padding-left: 10px;
  outline: none;
  border: none;
  background-color: transparent;
  height: 30px;
  width: 60%;

  ::placeholder {
    font-size: 12px;
    color: black;
  }
`;
const InputHolder = styled.form`
  width: 90%;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
`;
const LikeClickHolder = styled.div`
  display: flex;
  align-items: center;
  transform: scale(1);
  transition: all 350ms;
  font-size: ${({ fs }) => fs};
  color: ${({ bg }) => bg};
  :hover {
    transform: scale(1.02);
    cursor: pointer;
  }
  span {
    font-size: 12px;
    margin-left: 5px;
  }
`;

const CommentsNumber = styled.div`
  font-size: 12px;
  color: gray;
`;
const LikerName = styled.div`
  font-size: 12px;
  color: gray;
`;
const Like = styled(AiFillLike)`
  color: blue;
  font-size: 13px;
  margin-right: 5px;
`;
const Onw = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileCommentStickers = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  margin-bottom: 20px;
  margin-top: 10px;
`;
const LiveCommentIcon = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: solid 2px #eee;
  border-bottom: solid 2px #eee;
  margin-bottom: 10px;
  padding: 3px 0;
  margin-top: 10px;
`;
const LikeNameComment = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
`;
const PostPictures = styled.img`
  width: 100%;
  display: flex;
  object-fit: cover;
  height: 300px;
  background-color: black;
`;
const WriteUp = styled.div`
  width: 90%;
  display: flex;
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  margin-bottom: 10px;
  flex-wrap: wrap;
  letter-spacing: 0.4px;
  line-height: 20px;
`;
const FirstProfile = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 50%;
`;
const PicNameTime = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
`;
const ThePost = styled.div`
  width: 100%;
  margin: 10px 0;
  min-height: 300px;
  height: 100% auto;
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;
  border-radius: 7px;
`;
