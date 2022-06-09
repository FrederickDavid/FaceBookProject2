import React,{useState, useEffect, useContext} from 'react'
import styled from "styled-components"
import logo from "./logo.svg"
import {app} from "../base"
import { NavLink, useNavigate } from 'react-router-dom'
import * as yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {AuthContext} from "./AuthProvider"

const Login = ({firstname,
    setFirstname,
    surname,
    setSurname,
    mobileNumber,
    setMobileNumber,
    password,
    setPassword}) => {

        const {currentUser,msg} = useContext(AuthContext)
        const navigate = useNavigate()
        const pushData = async ()=>{
            await app.firestore().collection("registrationData").add({
                firstname,
                surname,
                mobileNumber,
                password,
            })
            navigate("/home")
        }

        const schema = yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().required(),
        })

        const {register, handleSubmit, formState:{errors}, reset} = useForm({resolver: yupResolver(schema)})

        const done = handleSubmit(async (val)=>{
            console.log(val)
            const { email, password} = val
            await app.auth().signInWithEmailAndPassword(email,password)
        })

        navigate("/")
    return (
        <Container>
            <Header>
                <Logo src={logo}/>
            </Header>
            <Wrapper onSubmit={done}>
                <Top>
                    <Title>Login into your account</Title>
                    <SubTitle>It's quick and easy.</SubTitle>
                </Top>
                <Body>
                    <BodyItems>
                        <Inputs mg placeholder="Mobile number or email address"
                       {...register("email")}
                         />
                        <Inputs  placeholder="New password" 
                        {...register("password")}
                         />
              <SignUp>
                  <Button
                  type="submit"
                  >Login</Button>
              </SignUp>
              <Already to="/signup">
                  Don't have an account?
              </Already>
                    </BodyItems>

                </Body>
            </Wrapper>
        </Container>
    )
}

export default Login

const Already = styled(NavLink)`
text-align: center;
color: #1877f2;
line-height: 20px;
font-size: 15px;
letter-spacing: normal;
cursor: pointer;
text-decoration: none;
margin-bottom: 15px;
`


const Button = styled.button`
background-color: #00a400;
font-size: 18px;
font-weight: bold;
line-height: 22.68px;
letter-spacing: normal;
color: white;
padding: 9px 43px;
border-radius: 6px;
transform: scale(1);
transition: all 500ms ease;
font-family: SFProDisplay-Bold, Helvetica, Arial, sans-serif;
outline: none;
border: none;

:hover{
    cursor: pointer;
    transform: scale(1.03);
}
`

const SignUp = styled.div`
width: 100%;
display: flex;
justify-content: center;
margin: 14px 0;
`

const Inputs = styled.input`
width: ${({wd})=> (wd? "45%" : "97%") };
height: 38px;
border-radius: 5px;
border: none;
outline: 1px lightgray solid;
padding-left: 10px;
margin: ${({mg})=>(mg? "15px 0px" : "0px")};
::placeholder{
    color: lightgray;

}
`
const FirstInputs = styled.div`
display: flex;
justify-content: space-between;
`
const BodyItems = styled.div`
width: 95%;
display: flex;
flex-direction: column;

`
const SubTitle = styled.div`
font-family: SFProText-Regular, Helvetica, Arial, sans-serif;
font-size: 15px;
line-height: 24px;
letter-spacing: normal;
color: #606770;
`
const Title = styled.div`
font-size: 22px;
/* text-align: center; */
/* margin-bottom: 5px; */
letter-spacing: normal;
line-height: 32px;
color:#1c1e21;
font-family: SFProDisplay-Bold, Helvetica, Arial, sans-serif;
font-weight: bold;
`
const Logo = styled.img`
`
const Header = styled.div`
width: 100%;
height: 90px;
/* background-color: black; */
display: flex;
justify-content: center;
margin-bottom: 5px;
`
const Body = styled.div`
width: 100%;
background-color: white;
/* height: 412px; */
display: flex;
justify-content: center;
padding-top: 20px;
`
const Top = styled.div`
width: 100%;
height: 80px;
background-color: white;
border-bottom: lightgray 1px solid;
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
`
const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;
align-items: center;
background-color: #f0f2f5;
flex-direction: column;
justify-content: center;
/* align-items: center; */
`
const Wrapper = styled.form`
width: 400px;
flex-direction: column;
border-radius: 10px;
overflow: hidden;
box-shadow: lightgray 1px 1px 5px 2px;
/* height: 462px; */

`
