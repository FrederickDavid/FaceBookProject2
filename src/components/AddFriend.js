import React,{useState, useEffect, useContext} from 'react'
import { AiOutlineCaretDown} from 'react-icons/ai'
import styled from "styled-components"
import logo from "./logo.svg"
import {app} from "../base"
import {NavLink} from "react-router-dom"
import {AuthContext} from "./AuthProvider"
const AddFriends = () => {
    const {currentUser} = useContext(AuthContext)
    const [toggle, setToggle] = React.useState(false)
    const [data, setData] = React.useState([])
    const [headerData, setHeaderData] = useState([])
  

    const getData = async ()=>{
        await app.firestore().collection("newuser")
        .onSnapshot((snapshot)=>{
            const store = []
            snapshot.forEach((doc)=>{
                store.push({...doc.data(), id: doc.id})
            })
            setData(store)
        })
        console.log(data)
    }

    const getHeaderData = async ()=>{
        await app.firestore().collection("newuser").doc().get().then((val)=>{
            setHeaderData(val.data())
        })
    }

 const MakeTrue = async (id)=>{
     await app.firestore().collection("newuser").doc(id).update({
            toggle: true
     })
 }
 const MakeFalse = async (id)=>{
     await app.firestore().collection("newuser").doc(id).update({
            toggle: false
     })
 }

//  const DeleteFriend = async (id)=>{
//      await app.firestore().collection("newUser").doc(currentUser).delete()
//  }


    React.useEffect(()=>{
            getData()
            getHeaderData()
           
    },[])
    return (
        <Container>
            <Header>
                <HeaderItems>
                    <Logo src={logo}/>
                    <RightItem>
                        <Name>{headerData?.name} {" "} {headerData?.surname}</Name>
                        <Image src={headerData?.avatar}/>
                        <Icon/>
                     
                    </RightItem>
                </HeaderItems>
            </Header>
        <Wrapper>
            <NextPeople>
            <People>People you may know</People>
            <Next to="/" >Next <span> >>> </span></Next>
            </NextPeople>
            <AddHolder>
            {data?.map((props)=>(
                  toggle===props.toggle?
                  <AddContents key={props.id}>
                  <Other>
                  <FriendProfile src={props?.avatar}/>
                    <NameMutual>
                    <FriendName>{props?.name}</FriendName>
                      <Joined>Joined {props.year} year ago</Joined>
                    </NameMutual>
                  </Other>
                  <ButtonHolder>
                          <Button onClick={()=>{
                              MakeTrue(props.id)
                          }}>Add Friend</Button>
                          <DeleteButton onClick={()=>{
                            //   DeleteFriend(props.id)
                          }}>Delete</DeleteButton>
                      </ButtonHolder>
              </AddContents>:
               <SendContent key={props.id}>
                <Other>
                    <FriendProfile src={props.avatar}/>
                      <NameMutual>
                      <FriendName>{props.name}</FriendName>
                        <Joined>Joined {props.year}year ago</Joined>
                      </NameMutual>
                    </Other>
                    <ButtonHolder>
                    <Request onClick={()=>{
                        MakeFalse(props.id)
                    }}>Cancel Request</Request>
                        </ButtonHolder>

                </SendContent>
         ))} 
                
            </AddHolder>
        </Wrapper>
    </Container>
    )
}

export default AddFriends
const NextPeople = styled.div`
display: flex;
justify-content: space-between;
`
const Next = styled(NavLink)`
color: blue;
font-size: 18px;
cursor: pointer;
text-decoration: none;
transform: scale(1);
transition: all 350ms;
/* margin-left: 20px; */
span{
    font-weight: bold;
    transform: scale(1.03);
}
`
const Request = styled.div`
padding: 5px 25px;
border-radius: 3px;
color: gray;
font-size: 13px;
cursor: pointer;
transform: scale(1);
transition: all 350ms;
border:2px solid rgb(24,119,242);
:hover{
    transform: scale(1.02);
    background-color:rgb(24,119,242);
    color: white;
}
`
const SendContent = styled.div``
const NameMutual = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
`
const Joined = styled.div`
font-size: 10px;
color: gray;
`
const DeleteButton = styled.div`
background-color: red;
padding: 7px 15px;
border-radius: 3px;
color: white;
font-size: 12px;
cursor: pointer;
transform: scale(1);
transition: all 350ms;
:hover{
    transform: scale(1.02);
}
`
const Button = styled.div`
background-color: rgb(24,119,242);
padding: 7px 15px;
border-radius: 3px;
color: white;
font-size: 12px;
margin-right: 10px;
cursor: pointer;
transform: scale(1);
transition: all 350ms;
:hover{
    transform: scale(1.02);
}
`
const ButtonHolder = styled.div`
display: flex;
`
const FriendName = styled.div`
font-weight: bold;
font-family: Arial, Helvetica, sans-serif;
font-size: 20px;
margin-bottom: 3 px;
`
const Other = styled.div`
display: flex;
margin-bottom: 15px;
`
const FriendProfile = styled.img`
width: 60px;
height: 60px;
object-fit: cover;
margin-right: 20px;
border-radius: 50%;
`
const AddContents = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
margin: 15px 0;
`
const AddHolder = styled.div`
width: 100%;
/* min-height: calc(100vh - 100px); */
min-height: calc(100vh - 150px);
height: 100%;

`

const Image = styled.img`
width: 35px;
height: 35px;
border-radius: 50%;
object-fit: cover;
margin: 0 10px;
`
const Icon = styled(AiOutlineCaretDown)`
margin-left: 30px;
font-size: 18px;
`
const Name = styled.div`
font-family: Arial, Helvetica, sans-serif;
font-weight:bold;

`
const RightItem = styled.div`
display: flex;
align-items: center;
`
const Logo = styled.img`
display: flex;
width: 200px;
object-fit: contain;
`
const HeaderItems = styled.div`
display: flex;
width: 90%;
justify-content: space-between;
`

const People = styled.div`
color: gray;
font-weight: bold;
font-family: arial, Helvetica, sans-serif;
font-size: 23px;
margin-bottom: 20px;
`

const Header = styled.div`
width: 100%;
height: 60px;
display: flex;
justify-content: center;
background-color: white;
box-shadow: gray 1px 1px 2px 1px;
margin-bottom: 30px;
position: fixed;
z-index: 3;
`
const Container = styled.div`
width: 100%;
min-height: 100%;
display: flex;
align-items: center;
background-color: #f0f2f5;
flex-direction: column;
`
const Wrapper = styled.div`
width: 85%;
/* background-color: white; */
min-height: calc(100vh - 100px);
height: 100%;
background-color: white;
padding-top: 10px;
padding-left: 20px;
padding-right: 20px;
margin-top: 80px;
`