import React,{useState,useEFfect,useContext} from "react"
import styled from "styled-components"
import {app} from "../base"
import Header from "../components/Header"
import img from "./background.jpg"
import {AuthContext} from "../components/AuthProvider"
import firebase from "firebase"
import {useNavigate,useParams} from "react-router-dom"

const AddBio = ()=>{

    const navigate = useNavigate()
    const {currentUser} = useContext(AuthContext)
    const [bio, setBio] = useState("")

    
    const pushCover = async ()=>{
        await app.firestore().collection("newuser").doc(currentUser?.uid).update({
            bio,
        })

        navigate("/detail")
    }
    return(
        <Container>
        <Header/>
        <Wrapper>
        <Card>
        <Text>Upload Bio Note</Text>
        <Input placeholder="Enter Bio"
        value={bio}
        onChange={(e)=>{
            setBio(e.target.value)
        }}/>
        <Submit bg="blue" onClick={()=>{
            pushCover()
        }}>Submit</Submit>
        </Card>
        </Wrapper>
        </Container>
    )
}

export default AddBio
const Input = styled.textarea`
width: 260px;
height: 45px;
margin-bottom: 20px;
`
const Submit = styled.div`
padding: 9px 60px;
background-color: ${({bg})=>bg};
color: white;
cursor: pointer;
font-size: 13px;
:hover
{
    background-color: gray
    ;}
; 
`
const Upload = styled.label`
font-size: 13px;
padding: 9px 30px;
border-radius: 15px;
background-color: blue;
color: white;
cursor: pointer;
margin-bottom: 30px;
`
const Image = styled.img`
width: 400px;
height: 300px;
object-fit: cover;
margin-bottom: 20px;
`
const Text = styled.div`
font-size: 20px;
font-weight: bold;
color: blue;
margin-bottom: 40px;
`
const Card = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const Wrapper = styled.div`
width: 100%;
min-height: calc(100vh - 55px);
height: 100%;
display: flex;
justify-content: center;
align-items: center;
`
const Container = styled.div`
width: 100%;
min-height: 100vh;
height: 100%;
background-color: #eee;
display: flex;
flex-direction: column;
align-items: center;
`