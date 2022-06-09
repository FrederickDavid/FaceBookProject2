import React,{useState, useEffect, useContext} from 'react'
import styled from "styled-components"
import logo from "./logo.svg"
import img from "./mainavatar.png"
import {NavLink,useNavigate} from "react-router-dom"
import * as yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import firebase from "firebase"
import {app} from "../base"
import {AuthContext} from "./AuthProvider"


const AddImage = () => {
    const {currentUser} = useContext(AuthContext)
    const [image, setImage] = useState(`${img}`)
    const [avatar, setAvatar] = useState("")
    const [loginDetail, setLoginDetail] = useState([])
    const navigate = useNavigate()

    const uploadImage = async (e)=>{
        const file = e.target.files[0]
        const save = URL.createObjectURL(file)
        setImage(save)

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
                setAvatar(url)
            })
        })
    }

    const getName = async()=>{
        await app.firestore().collection("newuser").doc(currentUser.uid).get().then((val)=>{
            setLoginDetail(val.data())
        })
    }

    useEffect(()=>{
            getName()
    },[])

    const schema = yup.object().shape({
        country: yup.string().required(),
        stateorigin: yup.string().required(),
        stateresidence: yup.string().required(),
        gender: yup.string().required(),
        status: yup.string().required(),
        religion: yup.string().required(),
    })
   
    const {register, handleSubmit, formState:{errors}, reset} = useForm({resolver: yupResolver(schema)})

    const done = handleSubmit(async (val)=>{
        console.log(val)
        const {country, stateorigin,stateresidence,gender,status,religion} = val

        await app.firestore().collection("newuser").doc(currentUser?.uid).update({
            avatar
        })

        await app.firestore().collection("newUser").doc(currentUser?.uid).collection("details").doc(currentUser?.uid).set({
            country,
            stateorigin,
            stateresidence,
            status,
            religion,
            gender
        })

        navigate("/addfriend")
        reset()
    })
    return (
        <Container>
             <Header>
                <Logo src={logo}/>
            </Header>
            <Wrapper onSubmit={done}>
                <Text>
                    <span>Dear {loginDetail?.name} {" "} {loginDetail?.surname}</span> would you love to
                    upload an image of yourself that all your
                    friends can see and recognize?
                </Text>
                <MyImage src={image}/>
                <InputHolder>
                <Label htmlFor="pix">Upload Image</Label>
                <Inputs type="file" id="pix" onChange={uploadImage}/>
                </InputHolder>
                <MainInput>
                <Input placeholder="Please enter your Country"
                {...register("country")}/>
                <Input placeholder="Please enter your State of Origin"
                {...register("stateorigin")}/>
                <Input placeholder="Please enter your State of Residence"
                {...register("stateresidence")}/>
                </MainInput>
                <SelectHolder>
                    <SelectAndLabel>
                        <SelectLabel>Gender</SelectLabel>
                       <Select {...register("gender")}>
                           <option>Male</option>
                           <option>Female</option>
                           <option>Others</option>
                       </Select>
                    </SelectAndLabel>
                    <SelectAndLabel>
                        <SelectLabel>Marital Status</SelectLabel>
                         <Select {...register("status")}>
                           <option>Married</option>
                           <option>Single</option>
                       </Select>
                    </SelectAndLabel>
                    <SelectAndLabel>
                        <SelectLabel>Religion </SelectLabel>
                       <Select {...register("religion")}>
                           <option>Chirstain</option>
                           <option>Muslim</option>
                           <option>others</option>
                       </Select>
                    </SelectAndLabel>
                </SelectHolder>
                <Button type="submit">Submit</Button>
            </Wrapper>
            <NextHolder>
                <Next to="/addfriend" >Next <span> >>> </span></Next>
            </NextHolder>
        </Container>
    )
}

export default AddImage
const Button = styled.button`
margin-bottom: 20px;
outline: none;
border: none;
padding: 10px 40px;
cursor: pointer;
background-color:blue;
transform: scale(1);
transition: all 350ms;
color: white;
font-size: 13px;
:hover{
    transform: scale(1.02);

}
`
const Select = styled.select`
width: 80px;
height: 27px;
font-size: 13px;
`
const SelectLabel = styled.div`
font-size: 10px;
font-weight: bold;
margin-bottom: 4px;
color: blue;
`
const SelectAndLabel = styled.div`
display: flex;
flex-direction: column;   
`
const SelectHolder = styled.div`
width: 90%;
display: flex;
margin-top: 10px;
justify-content:space-between;
margin-bottom: 20px;
`
const MainInput = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 90%;
margin-top: 10px;
`
const Input = styled.input`
width: 100%;
height: 32px;
text-transform: capitalize;
margin: 10px 0;
::placeholder{
    font-size: 12px;
}
`
const Label = styled.label`
padding: 10px 40px;
border-radius: 20px;
background-color: blue;
color: white;
font-size: 13px;
cursor: pointer;
transition: all 350ms;
transform: scale(1);
:hover{
    transform: scale(1.02);
}
`

const Next = styled(NavLink)`
color: blue;
font-size: 18px;
cursor: pointer;
/* font-weight: bold; */
transform: scale(1);
transition: all 350ms;
text-decoration: none;
span{
    font-weight: bold;
    transform: scale(1.03);
}
`
const NextHolder = styled.div`
width: 80%;
display: flex;
justify-content: flex-end;
padding-top: 30px;
`
const InputHolder = styled.div`
width: 100%; 
display: flex;
justify-content: center;
align-items: center;
margin-top: 10px;

/* margin: 30px 0; */
`

const Inputs = styled.input`
display: flex;
align-items: center;
width: 120px;
height: 35px;
display: none;



`

const MyImage = styled.img`
width: 170px;
height: 170px;
border-radius: 50%;
overflow: hidden;
object-fit: cover;
outline: 2px solid lightgray;
`

const Text = styled.div`
width: 90%;
letter-spacing: normal;
text-align: center;
margin-top :20px;
font-size: 15px;
font-family: Arial, Helvetica, sans-serif;
margin-bottom: 20px;
span{
    font-weight: bold;
    color: #1877F2;
}
`

const Logo = styled.img`
`

const Header = styled.div`
width: 100%;
height: 109px;
/* background-color: black; */
display: flex;
justify-content: center;
margin-bottom: 5px;
`

const Container = styled.div`
width: 100%;
height: 100vh;
background-color:  #f0f2f5;
display: flex;
flex-direction: column;
align-items: center;
`
const Wrapper = styled.form`
width: 400px;
display: flex;
flex-direction: column;
align-items: center;
background-color: white;
box-shadow: 1px 1px 5px 1px lightgray;
border-radius: 5px;
height: 100%auto;
/* background-color: blue; */
`
