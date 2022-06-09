import React,{useState,useEFfect,useContext} from "react"
import styled from "styled-components"
import {app} from "../base"
import Header from "../components/Header"
import img from "./background.jpg"
import {AuthContext} from "../components/AuthProvider"
import firebase from "firebase"
import {useNavigate} from "react-router-dom"

const AddPhoto = ()=>{

    const navigate = useNavigate()
    const {currentUser} = useContext(AuthContext)
    const [image, setImage] = useState("")
    const [avatar, setAvatar] = useState(img)

    const uploadImage = async (e)=>{
        const file = e.target.files[0]
        const save = URL.createObjectURL(file)
        setAvatar(save)

        const fileRef = await app.storage().ref()
        const storageRef = fileRef.child("img/" + file.name).put(file)
        storageRef.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot)=>{
            const count = (snapshot.bytesTransferred/snapshot.totalBytes)*100
            console.log(count)
        },(error)=>{
                console.log(error)
        },()=>{
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                console.log(url)
                setImage(url)
            })
        })
    }

    const pushCover = async ()=>{
        await app.firestore().collection("gallery").doc(currentUser?.uid).set({
            image
        })

      setAvatar(img)
    }
    return(
        <Container>
        <Header/>
        <Wrapper>
        <Card>
        <Text>Upload Photo Gallery</Text>
        <Image src={avatar}/>
        <Upload htmlFor="pix">Upload Image</Upload>
        <input type="file" style={{display: "none"}} id="pix" onChange={uploadImage}/>
        {image === ""? <Submit bg="blue">Submit</Submit>: <Submit bg="red" onClick={()=>{
            pushCover()
        }}>Submit</Submit>}
        </Card>
        </Wrapper>
        </Container>
    )
}

export default AddPhoto
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