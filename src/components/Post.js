import React,{useContext} from 'react'
import styled from "styled-components"
import a from "./feeling1.png"
import b from "./photo.png"
import b1 from "./tag.png"
import b2 from "./feeling.png"
import {AiOutlinePlus, AiFillCaretDown,AiOutlineClose} from "react-icons/ai"
import {MdLocationOn} from "react-icons/md"
import {GiMicrophone} from "react-icons/gi"
import {GoTextSize} from "react-icons/go"
import {app} from "../base"
import moment from "moment"
import { AuthContext } from './AuthProvider'
import firebase from "firebase"
import { Navigate } from 'react-router-dom'

const Post = ({


    firstname,
    surname,
    postToggle,
    postcontents,
    setPostContents,
    postImage,
    setPostImage,
    setPostToggle,}) => {

const {currentUser} = useContext(AuthContext)
const [image, setImage] = React.useState("")

const [personalData, setPersonalData] = React.useState([])

     const upload = async (e)=>{
         const file = e.target.files[0]
         const save = URL.createObjectURL(file)
         setImage(save)

         const fileRef = await app.storage().ref()
         const storageRef = fileRef.child("img/" + file.name).put(file)
         storageRef.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot)=>{
                 const count = (snapshot.bytesTransferred/snapshot.totalBytes) *100
                 console.log(count)
         },(err)=>{
             console.log(err)
         },()=>{
             storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                 console.log(url)
                 setImage(url)
             })
         })
     }  
     const pushData = async ()=>{
         await app.firestore().collection("mainpost").add({
               createdBy: currentUser?.uid,
               createdAt: firebase.firestore.FieldValue.serverTimestamp(),
               avatar: image,
               content: postcontents,
         })
         Navigate("/")
     }

     const getHeaderData = async ()=>{
        await app.firestore().collection("newuser").doc(currentUser?.uid).get().then((val)=>{
            setPersonalData(val.data())
        })
    }

    React.useEffect(()=>{
        getHeaderData()
    },[])
    return (
        <Container>
            <Wrapper>
                <Header>
                    <CreateCancel>
                        <Create>Create Post</Create>
                        <Circle>
                            <CancelIcon onClick={()=>{
                                setPostToggle(!postToggle)
                            }}>
                                <AiOutlineClose/>
                            </CancelIcon>
                        </Circle>
                    </CreateCancel>
                </Header>
              <PostItem>
              <ImageAndName>
                  <Profile src={personalData?.avatar}/>
                  <NameAndFriend>
                      <Name>{personalData?.name} {personalData?.surname}</Name>
                      <FriendsAndIcons>
                          <TheIcon/>
                          <Friend>Friends</Friend>
                          <TheIcon/>
                      </FriendsAndIcons>
                  </NameAndFriend>
              </ImageAndName>
                <WhatInput placeholder="What's on your mind?"
                value={postcontents}
                onChange={(e)=>{
                    setPostContents(e.target.value)
                }}/>
                <Sticker>
                    <GoTextSize/>
                    <IconF src={a}/>
                </Sticker>
                <AddPostAndSticker>
                    <StickerAndTextHolder>
                        <Add>Add to your post</Add>
                        <StickerIcon>
                            <input accept="image/*" id="icon-button-file" type="file" style={{display: "none"}} onChange={upload}/>
                            <label htmlFor="icon-button-file">
                            <Icon src={b}/>
                            </label>
                            
                            <Icon src={b1}/>
                            <Icon src={b2}/>
                            <MdLocationOn/>
                            <GiMicrophone/>
                            {/* <Icon/> */}
                        </StickerIcon>
                    </StickerAndTextHolder>
                </AddPostAndSticker>
                {image === ""?<PostButton bg="#eee"
                onClick={()=>{
                           
                               pushData()
                           }}>
                   Post
               </PostButton>:
               <PostButton bg="red"
               onClick={()=>{
                          
                              pushData()
                          }}>
                  Post
              </PostButton>}
              </PostItem>
            </Wrapper>
        </Container>
    )
}

export default Post
const Friend = styled.div`
font-weight: bold;
font-size: 10px;
`
const TheIcon = styled(AiFillCaretDown)`
font-size: 12px;
margin: 0 5px;
`
const CancelIcon = styled(AiOutlineClose)`
font-size: 15px;
`
const Create = styled.div`
font-weight: bold;
font-size: 14px;
letter-spacing: 0.5px;
`
const Circle = styled.div`
width: 25px;
height: 25px;
border-radius: 50%;
background-color: #eee;
display: flex;
justify-content: center;align-items: center;
transform: scale(1);
transition: all 350ms;
:hover{
    background-color: red;
    cursor: pointer;
    transform: scale(1.01);
}
`
const CreateCancel = styled.div`
display: flex;
align-items: center;
width: 50%;
/* background-color:red; */
margin-right: 15px;
justify-content: space-between;
`
const Add = styled.div`
font-size: 10px;
color: gray;
font-family: Arial, Helvetica, sans-serif;
font-weight: bold;
`
const Icon = styled.img`
width: 20px;
height: 20px;
object-fit: contain;
margin: 0 5px;
`
const StickerIcon = styled.div`
display: flex;
align-items: center;
color: red;
font-size: 20px;
`
const StickerAndTextHolder = styled.div`
width: 95%;
display: flex;
justify-content: space-between;
align-items: center;
`
const IconF = styled.img`
width: 25px;
height: 25px;
object-fit: contain;
`
const FriendsAndIcons = styled.div`
width: 75px;
height: 20px;
border-radius: 3px;
display: flex;
background-color: lightgray;
align-items: center;
opacity: 0.7;
`
const Name = styled.div`
font-size: 12px;
font-family: Arial, Helvetica, sans-serif;
margin-bottom: 3px;
`
const NameAndFriend = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
font-weight: bold;
`
const Profile = styled.img`
width:40px;
height: 40px;
border-radius: 50%;
object-fit: cover;
margin-right: 15px;
`
const PostItem = styled.div`
display: flex;
/* background-color: red; */
flex-direction: column;
width: 90%;
`
const PostButton = styled.div`
width: 100%;
height: 30px;
display: flex;
justify-content: center;
align-items: center;
background-color: ${({bg})=>bg};
border-radius: 3px;
margin-bottom: 10px;
transform: scale(1);
transition: all 350ms;
color: gray;
font-size: 12px;
letter-spacing: 0.4px;
:hover{
    opacity: 0.6;
    cursor: pointer;
}
`
const AddPostAndSticker = styled.div`
width: 100%;
display: flex;
height: 40px;
border: solid 2px lightgray;
border-radius: 5px;
justify-content: center;
margin: 10px 0;
`
const Sticker = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
`
const WhatInput = styled.textarea`
/* margin-left: 15px; */
width: 355px;
min-height: 140px;
height: 100%auto;
font-size: 14px;
outline: none;
background-color: transparent;
border: none;
margin-bottom: 10px;
font-family: Arial, Helvetica, sans-serif;
::placeholder{
    padding-top: 0px;
    font-size: 17px;
    color: gray;
    font-family: Arial, Helvetica, sans-serif;
    
}
`
const ImageAndName = styled.div`
display: flex;
width: 100%;
margin-bottom: 15px;
`
const Header = styled.div`
width: 100%;
height: 45px;
display: flex;
border-bottom: solid 1px lightgray;
margin-bottom: 10px;
align-items: center;
justify-content: flex-end;
`
const Container = styled.div`
width: 100%;
min-height: 100vh;
display: flex;
background-color: rgb(255,255,255,0.5);
align-items: center;
justify-content: center;
position: absolute;
top: 0;
left: 0;
z-index: 10;
`
const Wrapper = styled.div`
width: 430px;;
/* height: 350px; */
background-color: white;
box-shadow: lightgray 0px 4px 12px 0px;
display: flex;
flex-direction: column;
align-items: center;

`
