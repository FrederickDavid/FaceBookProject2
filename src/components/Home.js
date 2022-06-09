import React,{useState, useEffect, useContext} from 'react'
import img from "./profile.jpg"
import styled from "styled-components"
import Header from './Header'
import {AiOutlineSearch,AiFillCaretDown,
    AiOutlinePlus,AiOutlineLike,
    AiFillLike,AiOutlineArrowRight} from "react-icons/ai"
    import {BiComment} from "react-icons/bi"
import bg1 from "./story1.jpg"
import bg2 from "./story2.jpg"
import bg3 from "./story3.jpg"
import bg4 from "./story4.jpg"
import profile1 from "./profile1.jpg"
import profile2 from "./profile2.jpg"
import profile3 from "./profile3.jpg"
import profile4 from "./profile4.jpg"
import a from "./contact.png"
import a1 from "./flag.png"
import a2 from "./video.png"
import a3 from "./star.png"
import a4 from "./group1.png"
import a5 from "./clock.png"
import b1 from "./video1.png"
import b2 from "./photo.png"
import b3 from "./feeling.png"
import Post from './Post'
import {app} from "../base"
import {AuthContext} from "./AuthProvider"
import ThePostComp from '../components3/ThePostComp'
const Home = ({image,
    setImage,
    surname,
    postcontents,
    setPostContents,
    postImage,
    setPostImage,
    firstname}) => {
        const {currentUser} = useContext(AuthContext)
        const [likeToggle, setLikeToggle] = React.useState(false)
        const [postToggle, setPostToggle] = React.useState(true)
        const [data1, setData1] = React.useState([])
        const [data, setData] = React.useState([])
      const [personalData, setPersonalData] = useState([])
        

        const onPostToggle = ()=>{
            setPostToggle(!postToggle)
        }
        const onLikeToggle = ()=>{
            setLikeToggle(!likeToggle)
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

    
  

    const getData = async ()=>{
        await app.firestore().collection("newuser")
        .onSnapshot((snapshot)=>{
            const store1 = []
            snapshot.forEach((doc)=>{
                store1.push({...doc.data(), id: doc.id})
            })
            setData1(store1)
        })
        // console.log(data1)
}

const getHeaderData = async ()=>{
    await app.firestore().collection("newuser").doc(currentUser?.uid).get().then((val)=>{
        setPersonalData(val.data())
    })
}


 React.useEffect(()=>{
    myData()
    getData()

 },[])

 useEffect(()=>{
    getHeaderData()
    console.log(personalData)
 },[])

    return (
        <MainContainer>
            {postToggle?    
             <Container>
            <Header image={image} setImage={setImage} firstname={firstname}/>
            <Wrapper>
                <Left>
                    <LeftItem>
                        <IconAndText>
                                <Icon src={personalData?.avatar}br/>
                            <span>{personalData?.name} {" "} {personalData?.surname}</span>
                        </IconAndText>
                        <IconAndText mt mb>
                                <Icon src={a}/>
                            <span>Friends</span>
                        </IconAndText>
                        <IconAndText>
                                <Icon src={a1}/>
                            <span>Pages</span>
                        </IconAndText>
                        <IconAndText mt mb>
                                <Icon src={a4}/>
                            <span>Groups</span>
                        </IconAndText>
                        <IconAndText>
                                <Icon src={a2}/>
                            <span>Watch</span>
                        </IconAndText >
                        <IconAndText mt mb>
                                <Icon src={a5}/>
                            <span>Memories</span>
                        </IconAndText>
                        <IconAndText>
                                <Icon b/>
                            <span>See more</span>
                        </IconAndText>
                    </LeftItem>
                </Left>
                <Center>
                    <Story>
                        <MoveStory></MoveStory>
                        <FirstStory>
                            <Image src={personalData?.avatar}/>
                            <Circle>
                                <PlusIcon>
                                    <AiOutlinePlus/>
                                </PlusIcon>
                            </Circle>
                            <Create>Create Story</Create>
                        </FirstStory>
                        <FriendStory ml ma>
                           <BackgroundI>
                           <TheirProfile src={profile1}/>
                            <TheirName>Hon Rapheal Ikuyiminu</TheirName>
                           </BackgroundI>
                        </FriendStory>
                        <FriendStory mb ml>
                           <BackgroundI>
                           <TheirProfile src={profile2}/>
                            <TheirName>Joshua O. Erute</TheirName>
                           </BackgroundI>
                        </FriendStory >
                        <FriendStory mc ml>
                           <BackgroundI>
                           <TheirProfile src={profile3}/>
                            <TheirName>Mi Vocal</TheirName>
                           </BackgroundI>
                        </FriendStory>
                        <FriendStory ml>
                           <BackgroundI>
                           <TheirProfile src={profile4}/>
                            <TheirName>Kechiosa Believe</TheirName>
                           </BackgroundI>
                        </FriendStory>
                    </Story>
                    <HomePost>
                    <PIcAndWhat>
                        <ThePic src={personalData?.avatar}/>
                        <Inputs placeholder={`What's on your mind ${personalData?.name  +" " + personalData?.surname} `}/>
                    </PIcAndWhat>
                    <WhatIconHolder>
                        <IconText>
                            <LiveIcon src={b1}/>
                            <TheText>Live Video</TheText>
                        </IconText>
                        <IconText mg>
                            <LiveIcon src={b2}/>
                            <TheText>Photo/Video</TheText>
                        </IconText>
                        <IconText>
                            <LiveIcon src={b3}/>
                            <TheText>Feeling/Activity</TheText>
                        </IconText>
                    </WhatIconHolder>
                    </HomePost>
                    <HomeMainPost></HomeMainPost>
                </Center>
                <Right>
                    <ContactSearch>
                        <Contacts>Contacts</Contacts>
                        <TheSearchIcon>
                            <SearchIcon>
                                <AiOutlineSearch/>
                            </SearchIcon>
                            <Continue>...</Continue>
                        </TheSearchIcon>
                    </ContactSearch>
                    <ActiveItems>
                        <ActivePicName>
                            <PictureBox>
                                <Picture src={personalData?.avatar}/>
                                <ActiveCircle></ActiveCircle>
                            </PictureBox>
                            <ActiveName>
                                Muomaife Fred Erik
                            </ActiveName>
                        </ActivePicName>
                    </ActiveItems>
                </Right>
            </Wrapper>
    </Container> :
      <Post image={image}
      setImage={setImage}
       firstname={firstname}
        surname={surname}
        postToggle={postToggle}
        setPostToggle={setPostToggle}
        postcontents={postcontents}
        setPostContents={setPostContents}
        postImage={postImage}
        setPostImage={setPostImage}/>
}             <Container>
            <Header image={image} setImage={setImage} firstname={firstname}/>
            <Wrapper>
                <Left>
                    <LeftItem>
                        <IconAndText>
                                <Icon src={personalData?.avatar}br/>
                            <span>{personalData?.name} {" "} {personalData?.surname}</span>
                        </IconAndText>
                        <IconAndText mt mb>
                                <Icon src={a}/>
                            <span>Friends</span>
                        </IconAndText>
                        <IconAndText>
                                <Icon src={a1}/>
                            <span>Pages</span>
                        </IconAndText>
                        <IconAndText mt mb>
                                <Icon src={a4}/>
                            <span>Groups</span>
                        </IconAndText>
                        <IconAndText>
                                <Icon src={a2}/>
                            <span>Watch</span>
                        </IconAndText >
                        <IconAndText mt mb>
                                <Icon src={a5}/>
                            <span>Memories</span>
                        </IconAndText>
                        <IconAndText>
                                <SeemoreCircle>
                                    <AiFillCaretDown/>
                                </SeemoreCircle>
                            <span>See more</span>
                        </IconAndText>
                    </LeftItem>
                </Left>
                <Center>
                    <Story>
                        <MoveStory>
                            <AiOutlineArrowRight/>
                        </MoveStory>
                        <FirstStory>
                            <Image src={personalData?.avatar}/>
                            <Circle>
                                <PlusIcon>
                                    <AiOutlinePlus/>
                                </PlusIcon>
                            </Circle>
                            <Create>Create Story</Create>
                        </FirstStory>
                        <FriendStory ml ma>
                           <BackgroundI>
                           <TheirProfile src={profile1}/>
                            <TheirName>Hon Rapheal Ikuyiminu</TheirName>
                           </BackgroundI>
                        </FriendStory>
                        <FriendStory mb ml>
                           <BackgroundI>
                           <TheirProfile src={profile2}/>
                            <TheirName>Joshua O. Erute</TheirName>
                           </BackgroundI>
                        </FriendStory >
                        <FriendStory mc ml>
                           <BackgroundI>
                           <TheirProfile src={profile3}/>
                            <TheirName>Mi Vocal</TheirName>
                           </BackgroundI>
                        </FriendStory>
                        <FriendStory ml>
                           <BackgroundI>
                           <TheirProfile src={profile4}/>
                            <TheirName>Kechiosa Believe</TheirName>
                           </BackgroundI>
                        </FriendStory>
                    </Story>
                    <HomePost>
                    <PIcAndWhat>
                        <ThePic src={personalData?.avatar}/>
                        <Inputs placeholder= "What's on your mind?"
                        onClick={onPostToggle}/>
                    </PIcAndWhat>
                    <WhatIconHolder>
                        <IconText>
                            <LiveIcon src={b1}/>
                            <TheText>Live Video</TheText>
                        </IconText>
                        <IconText mg>
                            <LiveIcon src={b2}/>
                            <TheText>Photo/Video</TheText>
                        </IconText>
                        <IconText>
                            <LiveIcon src={b3}/>
                            <TheText>Feeling/Activity</TheText>
                        </IconText>
                    </WhatIconHolder>
                    </HomePost>
                    <HomeMainPost>
                       {data.map((props)=>(
                           <ThePostComp current={props.createdBy} myId={props.id} date={props.createdAt} content={props.content} avatar={props.avatar} toggle={props.toggle}/>
                       ))}
                    </HomeMainPost>
                </Center>
                <Right>
                    <ContactSearch>
                        <Contacts>Contacts</Contacts>
                        <TheSearchIcon>
                            <SearchIcon>
                                <AiOutlineSearch/>
                            </SearchIcon>
                            <Continue>...</Continue>
                        </TheSearchIcon>
                    </ContactSearch>
                    <ActiveItems>
                        {data1.map((props)=>(
                            <div>
                                {props.createdBy === currentUser?.uid? null: 
                                <ActivePicName>
                                <PictureBox>
                                    <Picture src={props.avatar}/>
                                    <ActiveCircle></ActiveCircle>
                                </PictureBox>
                                <ActiveName>
                                    {props.name}
                                </ActiveName>
                            </ActivePicName>}
                            </div>
                        ))}
                    </ActiveItems>
                </Right>
            </Wrapper>
    </Container>
        </MainContainer>
    )
}

export default Home

const OneSticker = styled.div``
const CommentSticker = styled.div``
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
const InputHolder = styled.div`
width: 90%;
background-color: #eee;
display: flex;
align-items: center;
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
width: 90%;
align-items: center;
margin-top: 15px;
margin-bottom: 20px;
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
const MainContainer = styled.div`
position: relative;
width: 100%;
height: 100%;
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
const ActiveName = styled.div`
font-weight: bold;
font-size: 12px;
font-family: Arial, Helvetica, sans-serif;

`
const ActivePicName = styled.div`
display: flex;
align-items: center;
margin-bottom: 15px;
`
const ActiveItems = styled.div`
display: flex;
flex-direction: column;
width: 100%;
`
const ContactSearch = styled.div`
display: flex;
width: 100%;
color: gray;
align-items: center;
margin-bottom: 20px;
`
const Contacts = styled.div`
font-size: 14px;
font-weight: bold;
letter-spacing: 0.4px;
display: flex;
flex:1;
`
const TheSearchIcon = styled.div`
display: flex;
align-items: center;

`
const SearchIcon = styled(AiOutlineSearch)`
font-size: 18px;
color: gray;
margin: 0 20px;
display: flex;
align-items: center;
`
// const Search = styled.img``
const Continue = styled.div`
display: flex;
align-items: center;
font-size: 20px;
margin-top: -15px;
justify-content: center;
font-weight: bold;
letter-spacing: 0.8px;
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
const BackgroundI = styled.div`
width: 100%;
height: 100%;
background-color: rgb(0,0,0,0.3);
transition: all 350ms;
:hover{
    background-color: rgb(0,0,0,0.5);  
    cursor: pointer;
}
`
const TheirName = styled.div`
font-weight: bold;
font-size: 10px;
font-family: arial,sans-serif;
margin-left: 8px;
color: white;
line-height: 12px;
letter-spacing: 0.2px;
margin-bottom: 5px;
`
const TheirProfile = styled.img`
width: 20px;
height: 20px;
border-radius: 50%;
border: 2px solid blue;
margin-top: 8px;
margin-left: 8px;
margin-bottom: 78px;
object-fit: cover;
`
const FriendStory = styled.div`
margin-left: ${({ml})=>(ml? "10px" : "0")};
margin-right: ${({mr})=>(mr? "10px" : "0")};
height: 100%;
width: 105px;
background-color: white;
background-image: url(${({ma,mb,mc})=>((ma)? bg1 : mb? bg2 : mc? bg3 : bg4)});
background-size: cover;
background-repeat: no-repeat;
border-radius: 10px;
overflow: hidden;
`
const Create = styled.div`
font-size: 10px;
font-weight: bold;
`
const Plus = styled.img``
const PlusIcon = styled(AiOutlinePlus)`
color: white;
`
const Circle = styled.div`
width: 25px;
height:25px;
background-color: blue;
border: solid 2.5px white;
border-radius: 50%;
position: absolute;
top: 80px;
left: 35px;
display: flex;
justify-content: center;
align-items: center;
/* z-index: 1; */
`
const Image = styled.img`
width: 100%;
object-fit: cover;
height: 70%;
display: flex;
margin-bottom: 20px;

`
const FirstStory = styled.div`
width: 100px;
height: 100%;
background-color: white;
overflow: hidden;
border-radius: 10px;
object-fit: cover;
position: relative;
align-items: center;
display: flex;
flex-direction: column;
`
const MoveStory = styled.div`
width: 30px;
height: 30px;
border-radius: 50%;
background-color: white;
position: absolute;
right: -15px;
top: 43%;
display: flex;
justify-content: center;
align-items: center;
`
const HomeMainPost = styled.div`
width: 100%;
height: 100%;
/* background-color: white; */
display: flex;
flex-direction: column;
justify-content: center;
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
margin: 20px 0;
`
const Story = styled.div`
width: 100%;
height: 150px;
/* background-color: red; */
position: relative;
border-radius: 10px;
/* overflow: hidden; */
display: flex;
`
const SeemoreCircle = styled.div`
width: 28px;
height: 28px;
border-radius: 50%;
background-color: lightgray;
margin-right: 15px;
display: flex;
justify-content: center;
align-items: center;
`
const SeeIcon = styled.img``
const Icon = styled.img`
width: 28px;
height: 28px;
border-radius: ${({br})=>(br? "50%" : "0%")};
/* background-color: blue; */
margin-right: 15px;
object-fit: cover;

`
const IconAndText = styled.div`
display: flex;
align-items: center;
margin-top: ${({mt})=>(mt? "15px" : "0px")};
margin-bottom: ${({mb})=>(mb? "15px" : "0px")};
span{
    color: black;
    font-size: 13px;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    cursor: pointer;
}
`
const LeftItem = styled.div`
width: 100%;
display: flex;
flex-direction: column;
`
const Right = styled.div`
width: 23%;
/* background-color: white; */
display: flex;
flex-direction: column;
`
const Center = styled.div`
width: 40%;
display: flex;
/* background-color: white; */
flex-direction: column;
`
const Left = styled.div`
width: 22%;
display: flex;
/* background-color: white; */
`
const Container = styled.div`
width: 100%;
min-height: 100vh;
height: 100%auto;
display: flex;
background-color: #f0f2f5;
align-items: center;
flex-direction: column;
position: absolute;
`
const Wrapper = styled.div`
width: 99%;
display: flex;
min-height: calc(100vh - 75px);
height: 100%auto;
/* background-color: red; */
justify-content: space-between;
margin-top: 70px;
`
