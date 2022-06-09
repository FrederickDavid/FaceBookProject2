import React,{useState,useEffect,useContext} from 'react'
import styled from "styled-components"
import img from "./background.jpg"
import {AiFillCaretDown,AiFillLike,AiOutlineLike,AiFillCamera} from "react-icons/ai"
import {BiComment} from "react-icons/bi"
import PostProfile from './PostProfile'
import LikeCoomp from './LikeCoomp'
import ThePostComp from './ThePostComp'
import Header from "../components/Header"
import {app} from "../base"
import {NavLink,Link,useParams} from "react-router-dom"
import {AuthContext} from "../components/AuthProvider"

const DetailPage = () => {
  const {id} = useParams()
  const {currentUser} = useContext(AuthContext)
  const [data, setData] = useState([])
  const [personalData, setPersonalData] = useState([])
  const [detailData, setDetailData] = useState([])
    const [likeToggle, setLikeToggle] = useState(false)
    const [image, setImage]= React.useState(img)
    const [comment, setComment] = useState("")

    const onLikeToggle = ()=>{
      setLikeToggle(!likeToggle)
    }

    const getPersonal = async ()=>{
      await app.firestore().collection("newuser").doc(id).get().then((val)=>{
        setPersonalData(val.data())
      })
    }

    const getDetails = async ()=>{
      await app.firestore().collection("newUser").doc(id).collection("details").doc(id).get().then((val)=>{
        setDetailData(val.data())
      })
    }

    const myData = async ()=>{
      await app.firestore().collection("mainpost").onSnapshot((snapshot)=>{
          const store = []
          snapshot.forEach((doc)=>{
              store.push({...doc.data(), id: doc.id})
          })
          setData(store)
      })
      // console.log(data)
}
    const upload = (e)=>{
        const file = e.target.files[0]
        const save = URL.createObjectURL(file)
        setImage(save)
    }

    React.useEffect(()=>{
myData()
getPersonal()
getDetails()
    },[])
    React.useEffect(()=>{
getDetails()
    },[])
  return (
    <MainContainer>
    <Header/>
    <Container>
    <Wrapper>
      <UpperPart>
      <TopMost bg={personalData?.coveravatar}>
      <Overlay>
      <CoverPhoto src={personalData?.coveravatar}/>
      {id === currentUser?.uid? 
        <EditCover to="/addcover">
        <Icon/>
        <EditText>Edit Cover Photo </EditText>
        </EditCover>:null}
      <input type="file" id="pix" onChange={upload} style={{display: "none"}}/>
      </Overlay>
      </TopMost>
      <ImageNameAndButton>
      <LeftPart>
      <ProfileAndIcon>
      <ProfileImg src={personalData?.avatar}/>
      <ProfileIcon/>
      </ProfileAndIcon>
      <NameTotalImg>
      <UserName>{personalData?.name} {" "} {personalData?.surname}</UserName>
      <TotalFriends>2k friends</TotalFriends>
      <FriendsImage>
      </FriendsImage>
      </NameTotalImg>
      </LeftPart>
      <RightPart>
      <AddStoryButton bg="blue" cl="lightgray">Add to Story</AddStoryButton>
      <AddStoryButton bg="rgb(0,0,0,0.9)" cl="lightgray">Edit profile</AddStoryButton>
      </RightPart>
      </ImageNameAndButton>
      <ProfileNavs>
      <ProfileNavLeft>
      <Navs>Posts</Navs>
      <Navs>About</Navs>
      <Navs>Friends</Navs>
      <Navs>Photos</Navs>
      <Navs>Videos</Navs>
      <Navs>Check Ins</Navs>
      <Navs1>
      More
      <span>
      <AiFillCaretDown/>
      </span>
      </Navs1>
      </ProfileNavLeft>
      <ProfileNavRight>
      ...
      </ProfileNavRight>
      </ProfileNavs>
      </UpperPart>
      <NextPart>
      <LeftNextPart>
      <PersonalData>
      <Intro>Intro</Intro>
      <AboutContent>{personalData?.bio}</AboutContent>
      <EditBio>Edit Bio</EditBio>
      <DetailsContainer>
      <IconAndText>
      <DetailIcon/>
      <DetailText>Self Employed</DetailText>
      </IconAndText>
      <IconAndText>
      <DetailIcon/>
      <DetailText>{detailData?.stateresidence}, <span>{detailData?.country}</span></DetailText>
      </IconAndText>
      <IconAndText>
      <DetailIcon/>
      <DetailText>Gender  <span>{detailData?.gender}</span> </DetailText>
      </IconAndText>
      <IconAndText>
      <DetailIcon/>
      <DetailText>Lives in <span>{detailData?.stateresidence},{detailData?.country}</span></DetailText>
      </IconAndText>
      <IconAndText>
      <DetailIcon/>
      <DetailText>From: <span>{detailData?.stateorigin}</span></DetailText>
      </IconAndText>
      <IconAndText>
      <DetailIcon/>
      <DetailText>Status: <span>{detailData?.status}</span></DetailText>
      </IconAndText>
      <IconAndText>
      <DetailIcon/>
      <DetailText>Followed by <span>76 people</span></DetailText>
      </IconAndText>
      </DetailsContainer>
      <EditBio>Edit Detail</EditBio>
      </PersonalData>
      <PhotosContainer>
        <PhotoHead>
          <Photos>Photos</Photos>
          <SeePhoto>See All Photos</SeePhoto>
        </PhotoHead>
        <PhotoDisplay>
        <PhotoUploaded src={img}/>
        <PhotoUploaded src={img}/>
        <PhotoUploaded src={img}/>
        <PhotoUploaded src={img}/>
        <PhotoUploaded src={img}/>
        <PhotoUploaded src={img}/>
        </PhotoDisplay>
      </PhotosContainer>
      </LeftNextPart>
      <RightNextPart>
      <HomePost>
                    <PIcAndWhat>
                        <ThePic src={img}/>
                        <Inputs placeholder="What's on your mind Confidence"/>
                    </PIcAndWhat>
                    <WhatIconHolder>
                        <IconText>
                            <LiveIcon/>
                            <TheText>Live Video</TheText>
                        </IconText>
                        <IconText mg>
                            <LiveIcon />
                            <TheText>Photo/Video</TheText>
                        </IconText>
                        <IconText>
                            <LiveIcon />
                            <TheText>Feeling/Activity</TheText>
                        </IconText>
                    </WhatIconHolder>
                    </HomePost>
                    <HomeMainPost>
                    {data.map((props)=>(
                      <ThePostComp current={props.createdBy} myId={props.id} date={props.createdAt} content={props.content} avatar={props.avatar} toggle={props.toggle}/>
                  ))}
                    </HomeMainPost>
      </RightNextPart>

      </NextPart>
    </Wrapper>
    </Container>
    </MainContainer>
  )
}

export default DetailPage

const MainContainer = styled.div`
display:flex;
align-items: center;
width: 100%;
height: 100%;
min-height: 100vh;
flex-direction: column;
background-color: #eee;
`
const Picture = styled.img`
width: 35px;
height: 35px;
border-radius: 50%;
object-fit: cover;
/* background-color: blue; */

`
const ActiveCircle = styled.div`
position: absolute;
width: 8px;
height: 8px;
border-radius: 50%;
background-color: #31A24C;
border: 2px solid white;
/* top: 0; */
right: 0;
bottom: 0;
`
const PictureBox = styled.div`
display: flex;
position: relative;
/* background-color: purple; */
width: 40px;
height: 35px;
margin-right: 10px;
`
const HomeMainPost = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
`

const OneSticker = styled.div``
const CommentSticker = styled.button`
display: none;
`
const MyComment = styled.input`
display: flex;
padding-left: 10px;
outline: none;
border: none;
background-color:transparent;
height: 30px;
width: 60%;

::placeholder{
font-size: 12px;
color: black;
}
`
const InputHolder = styled.form`
width: 90%;
background-color: #eee;
display: flex;
align-items: center;
justify-content: space-between;
border-radius: 5px;
`
const LikeClickHolder = styled.div`
display: flex;
align-items: center;
transform: scale(1);
transition: all 350ms;
font-size: ${({fs})=>fs};
color: ${({bg})=>bg};
:hover{
    transform: scale(1.02);
    cursor: pointer;
}
span{
    font-size: 12px;
    margin-left: 5px;
}
`

const CommentsNumber = styled.div`
font-size: 12px;
color: gray;
`
const LikerName = styled.div`
font-size: 12px;
color: gray;
`
const Like = styled(AiFillLike)`
color: blue;
font-size: 13px;
margin-right: 5px;
`
const Onw = styled.div`
display: flex;
align-items: center;
`


const PosterDate = styled.div`
font-size: 10px;
margin-top: 1px;
`
const PosterName = styled.div`
font-weight: bold;
font-size: 12px;
font-family: Arial, Helvetica, sans-serif;
`
const NameTime = styled.div``
const ProfileCommentStickers = styled.div`
display: flex;
align-items: center;
width: 95%;
margin-bottom: 20px;
margin-top: 10px;
`
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

`
const LikeNameComment = styled.div`
width: 90%;
display: flex;
align-items: center;
justify-content: space-between;
margin:5px 0;
`
const PostPictures = styled.img`
width: 100%;
display: flex;
object-fit: cover;
height: 300px;
background-color: black;

`
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
`
const FirstProfile = styled.img`
width: 40px;
height: 40px;
object-fit: cover;
margin-right: 20px;
border-radius: 50%;
`
const PicNameTime = styled.div`
display: flex;
align-items: center;
/* justify-content: space-between; */
`
const ThePost = styled.div`
width: 100%;
min-height: 300px;
height: 100%auto;
display: flex;
flex-direction: column;
background-color: white;
align-items: center;
border-radius: 7px;
`



const HomePost = styled.div`
width: 100%;
display: flex;
height: 110px;
background-color: white;
display: flex;
flex-direction: column;
align-items: center;
border-radius: 8px;
justify-content: center;
margin-bottom: 30px;

`


const IconText = styled.div`
display: flex;
align-items: center;
margin: ${({mg})=>(mg)? "0 50px" : "0px"};
`
const LiveIcon = styled.img`
width: 20px;
height: 20px;
object-fit: contain;
margin-right: 10px;
`
const TheText = styled.div`
color: gray;
font-family: Arial, Helvetica, sans-serif;
font-size: 11px;
`

const Inputs = styled.input`
width: 85%;
height: 35px;
border-radius: 20px;
background-color: #f0f2f5;
border: none;
outline: none;
padding-left: 10px;
::placeholder{
    padding-left: 10px;
    font-size: 12px;
    color: gray;
}
`
const ThePic = styled.img`
display: flex;
object-fit: cover;
width: 40px;
height: 40px;
margin-right: 20px;
border-radius: 50%;
`
const PIcAndWhat = styled.div`
width: 98%;
/* background-color: purple; */
height: 45px;
margin-bottom: 10px;
display: flex;
align-items:center;
`
const WhatIconHolder = styled.div`
width: 98%;
height: 45px;
display: flex;
align-items: center;
justify-content: center;
`


const PhotoUploaded = styled.img`
width: 98px;
height: 98px;
object-fit: cover;
margin: 5px;
`
const PhotoDisplay = styled.div`
width: 95%;
margin-bottom: 10px;
display: flex;
flex-wrap: wrap;
justify-content: center;
`
const SeePhoto = styled.div`
font-size: 12px;
color: blue;
cursor: pointer;
`
const Photos = styled.div`
font-weight: bold;
font-size: 15px;

`
const PhotoHead = styled.div`
width: 95%;
margin-bottom: 15px;
margin-top: 10px;

align-items: center;
display: flex;
justify-content: space-between;
`
const DetailIcon = styled.img`
margin-right: 7px;
width: 20px;
height: 20px;
background-color: red;
`
const DetailText = styled.div`
font-size: 13px;
span{
  font-weight: bold;
}
`
const IconAndText = styled.div`
width: 100%;
display: flex;
align-items: center;
margin: 6px 0;
`
const DetailsContainer = styled.div`
display: flex;
width: 95%;
flex-direction: column;
margin-bottom: 10px;
`
const EditBio = styled.div`
width: 95%;
color: white;
text-decoration: none;
background-color:rgb(0,0,0,0.8);
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 15px;
color: lightgray;
height: 40px;
border-radius: 7px;
transform:scale(1);
font-size: 14px;
transition: all 350ms;
:hover{
  transform:scale(1.01);
  cursor: pointer;
}
`
const AboutContent = styled.div`
width: 60%;
text-align: center;
line-height: 23px;
font-size: 13px;
letter-spacing: 0.3px;
font-family: arial;
color: black;
margin-bottom: 20px;
`
const Intro = styled.div`
font-weight: bold;
margin-bottom: 15px;
font-size: 18px;
color: black;
/* margin-left: 10px; */
width: 95%;
margin-top: 10px;
`
const PhotosContainer = styled.div`
width: 100%;
background-color: white;;
display: flex;
flex-direction: column;
align-items: center;
border-radius: 7px;
margin-bottom: 20px;
`
const PersonalData = styled.div`
width: 100%;
 background-color: white;;
display: flex;
flex-direction: column;
align-items: center;
border-radius: 7px;
margin-bottom: 20px;
`
const RightNextPart = styled.div`
width: 58%;

`
const LeftNextPart = styled.div`
width: 38%;
`
const NextPart = styled.div`
width: 60%;
display: flex;
justify-content: space-between;

`
const UpperPart = styled.div`
display: flex;
flex-direction: column;
width: 100%;
align-items: center;
margin-bottom: 20px;
`
const Navs1 = styled.div`
padding: 8px 10px;
display: flex;
justify-content: center;
align-items: center;
font-size: 14px;
span{
  font-size: 13px;
  color: gray;
  cursor: pointer;
}
margin-right: 5px;
transition: all 350ms;
:hover{
  cursor: pointer;
  border-bottom: solid 3px blue;
}
`
const Navs = styled.div`
padding-top: 8px;
padding-bottom: 30px;
padding-left: 10px;
padding-right: 10px;

font-size: 14px;
transition: all 350ms;
margin: 0 3px;
:hover{
  cursor: pointer;
  border-bottom: solid 3px blue;
}
`
const ProfileNavRight = styled.div`
color: white;
cursor: pointer;
background-color: rgb(0,0,0,0.7);
display: flex;
justify-content: center;
align-items: center;
width: 40px;
height: 35px;
border-radius: 3px;
`
const ProfileNavLeft = styled.div`
display: flex;
width: 70%;
`
const ProfileNavs = styled.div`
width: 58%;
display: flex;
/* background-color: red; */
height: 30px;
margin-top: 20px;
border-top: 2px solid lightgray;
padding-top: 10px;
justify-content: space-between;
`
const Fimg = styled.img`
width: 25px;
height: 25px;
border-radius: 50%;
`
const FriendsImage = styled.div`
display: flex;
`
const TotalFriends = styled.div`
margin: 3px 0;
font-size: 14px;
color: gray;
`
const UserName = styled.div`
font-weight: bold;
font-size: 30px;
`
const NameTotalImg = styled.div`
display: flex;
flex-direction: column;
margin-left: 20px;
/* align-items: flex-end; */
`
const ProfileIcon = styled(AiFillCamera)`
position: absolute;
width: 25px;
height: 25px;
border-radius: 50%;
color: white;
position: absolute;
right: -8px;
bottom: 10px;
background-color: rgb(0,0,0,0.8);
border: solid 2px black;
`
const ProfileImg = styled.img`
width: 130px;
border: solid 2px white;
height: 130px;
object-fit: cover;
position: absolute;
top: -40px;
right: 0px;
left: -120px;
border-radius: 50%;
`
const ProfileAndIcon = styled.div`
display: flex;
position: relative;  

`
const AddStoryButton = styled.div`
background-color: ${({bg})=>bg};
color: ${({cl})=>cl};
cursor: pointer;
padding: 8px 20px;
border-radius: 4px;
font-size: 15px;
margin:0 5px;
transform:scale(1);
transition: all 350ms;
:hover{
  transform:scale(1.02);
  cursor: pointer;
}
`
const RightPart = styled.div`
display: flex;
align-items: flex-end;
height: 100%;
`
const LeftPart = styled.div`
display: flex;
/* background-color: red; */
margin-left: 100px;
position: relative;

`
const ImageNameAndButton = styled.div`
display: flex;
justify-content: space-between;
width: 55%;
`
const EditText = styled.div`
font-size: 14px;
font-family: arial;

`
const Icon = styled(AiFillCamera)`
margin-right: 5px;
width: 20px;
font-size: 20px;
/* background-color: red; */
`
const EditCover = styled(NavLink)`
position: absolute;
display: flex;
padding: 10px 20px;
bottom: 20px;
background-color: white;
border-radius: 5px;
text-decoration: none;
color: black;
right: 300px;
transform: scale(1);
transition: all 350ms;
:hover{
    transform: scale(1.03);
    cursor: pointer;
}
`
const CoverPhoto = styled.img`
width: 66%;
object-fit: cover;
height: 100%;
border-radius: 10px;
`
const Overlay = styled.div`
backdrop-filter: blur(50px);
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
box-shadow: 1px 1px 25px 1px lightgray;
position: relative;

`
const TopMost = styled.div`
width: 100%;
height: 60vh;
background-image: url(${({bg})=>bg});
background-size: cover;
background-repeat: no-repeat;
box-shadow: 1px 1px 25px 1px lightgray;
`
const Wrapper = styled.div`
display: flex;
align-items: center;
width: 100%;
flex-direction: column;
height: 100%;
`
const Container = styled.div`
width: 100%;
/* height: 100%; */
background-color: #eee;
display: flex;
margin-top: 60px;
`