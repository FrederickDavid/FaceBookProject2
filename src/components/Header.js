import React,{useState, useEffect, useContext} from 'react'
import styled from "styled-components"
import {AiFillHome, AiOutlineSearch,AiFillCaretDown, AiFillContact,AiOutlineHome} from "react-icons/ai"
import {HiHome} from "react-icons/hi"
import {IoMdContacts} from "react-icons/io"
import {RiGroup2Line} from "react-icons/ri"
import {FaFacebookMessenger} from "react-icons/fa"
import {BsFacebook} from "react-icons/bs"
import a from "./headerdot.png"
import a1 from "./headnot.png"
import {AuthContext} from "./AuthProvider"
import {app} from "../base"
import {NavLink} from "react-router-dom"


const Header = ({image,
    setImage,
    firstname,}) => {
    const [toggle, setToggle] = React.useState(false)
    const [data, setData] = useState([])
    const {currentUser} = useContext(AuthContext)

    const getHeaderData = async ()=>{
        await app.firestore().collection("newuser").doc(currentUser?.uid).get().then((val)=>{
            setData(val.data())
        })
    }

    useEffect(()=>{
        getHeaderData()
    },[])
    return (
        <Container>
        <Wrapper>
            <First>
                <Logo/>
                <SearcHolder>
                    <SearchIcon>
                        <AiOutlineSearch/>
                    </SearchIcon>
                    <Input placeholder="Search Facebook"/>
                </SearcHolder>
            </First>
            <Second>
               <IconHolder to="/">
                    <TheIcon>
                    <AiOutlineHome />
                </TheIcon>
               </IconHolder>
               <IconHolder mg to="/detail">
            <TheIcon>
                       <IoMdContacts/>
                   </TheIcon>
               </IconHolder>
               <IconHolder to="/detail">
                   <TheIcon>
                    <RiGroup2Line/>
                </TheIcon>
               </IconHolder>
            </Second>
            <Third>
                <FindHolder>
                    Find Friends
                </FindHolder>
                <ConfidencePicHolder>
                    <Profile src={data?.avatar}/>
                    <Name>{data?.name} {" "} {data?.surname}</Name>
                </ConfidencePicHolder>
                <ChattingIconHOlder>
                    <TheCicles>
                        <ChattingIcon>
                            <IconImage src={a}/>
                        </ChattingIcon>
                    </TheCicles>
                    <TheCicles ml mr>
                        <ChattingIcon>
                            <FaFacebookMessenger/>
                        </ChattingIcon>
                    </TheCicles>
                    <TheCicles>
                        <ChattingIcon>
                            <IconImage src={a1}/>
                        </ChattingIcon>
                    </TheCicles>
                    <TheCicles ml>
                        <ChattingIcon>
                            <Carett/>
                        </ChattingIcon>
                    </TheCicles>
                </ChattingIconHOlder>
            </Third>
        </Wrapper>
    </Container>
    )
}

export default Header

const Carett = styled(AiFillCaretDown)`
font-size:18px;
`
const  IconImage = styled.img`
width: 15px;
height: 15px;
object-fit: contain;
`
const  ChattingIcon = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
const  TheCicles = styled.div`
display: flex;
justify-content: center;
align-items: center;
justify-content: center;
width: 38px;
height: 38px;
border-radius: 50%;
color: black;
background-color: #E4E6EB;
margin-left: ${({ml})=>(ml? "8px": "0px")};
margin-right: ${({mr})=>(mr? "8px": "0px")};
`
const  ChattingIconHOlder = styled.div`
display: flex;
align-items: center;
`
const  Name = styled.div`
font-weight: bold;
font-size: 12px;
color: rgb(0,0,0,0.7);
`
const  Profile = styled.img`
width: 30px;
height: 30px;
border-radius: 50%;
object-fit: cover;
margin-right: 7px;
`
const  ConfidencePicHolder = styled.div`
display: flex;
align-items: center;
margin: 0 10px;
`
const  FindHolder = styled.div`
color: black;

background-color: #E4E6EB;
border-radius: 15px;
padding: 6px 10px;
font-size: 13px;
font-weight: bold;
`

const TheIcon = styled.div`
:hover{
    cursor: pointer;
}
`
const IconHolder = styled(NavLink)`
width: 90px;
height: 95%;
display: flex;
justify-content: center;
align-items: center;
transition: all 350ms;
color: black;
margin: ${({mg})=>(mg? "0 7px" : "0px")};
font-size: 22px;
/* background-color: yellow; */
:hover{
    border-bottom:solid 3px blue;
    color: blue;
}
`
const Input = styled.input`
outline: none;
border: none;
background-color: transparent;
::placeholder{
    color: gray;
    font-size: 12px;
}
`
const SearchIcon = styled(AiOutlineSearch)`
font-size: 20px;
margin:0 10px;
color: gray;
`
const SearcHolder = styled.div`
display: flex;
background-color: #F0F2F5;
align-items: center;
height: 35px;
border-radius: 15px;
width: 230px;
`
const Logo = styled(BsFacebook)`
width: 35px;
height: 35px;
border-radius: 50%;
object-fit: contain;
color: rgb(0,0,255,0.8);
margin-right: 10px;
`
const Third = styled.div`
width: 29%;
display: flex;
/* background-color: whitesmoke; */
height: 100%;
align-items: center;
padding: 0 5px;
`
const Second = styled.div`
width: 30%;
display: flex;
/* background-color: red; */
height: 100%;
color: white;
justify-content: center;
`
const First = styled.div`
width: 22%;
display: flex;
/* background-color: red; */
height: 100%;
align-items: center;
`
const Container = styled.div`
width: 100%;
height: 55px;
display: flex;
background-color: white;
justify-content: center;
box-shadow: gray 1px 1px 2px 1px;
position: fixed;
margin-bottom: 20px;
z-index: 3;

`
const Wrapper = styled.div`
width: 99%;
display: flex;
justify-content: space-between;
align-items: center;
`