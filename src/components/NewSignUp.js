import React from 'react'
import styled from "styled-components"
import logo from "./logo.svg"
import {app} from "../base"
import { NavLink, useNavigate } from 'react-router-dom'
import * as yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import firebase from "firebase"

const NewSignUp = ({firstname,
    setFirstname,
    surname,
    setSurname,
    mobileNumber,
    setMobileNumber,
    password,
    setPassword}) => {
        const navigate = useNavigate()
        // const pushData = async ()=>{
        //     await app.firestore().collection("registrationData").add({
        //         firstname,
        //         surname,
        //         mobileNumber,
        //         password,
        //     })
        //     navigate("/addimage")
        // }

        const schema = yup.object().shape({
            name: yup.string().required(),
            surname: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
            dob: yup.date().required(), 
        })

        const {register, handleSubmit, formState:{errors}, reset} = useForm({resolver: yupResolver(schema)})

        const done = handleSubmit(async(val)=>{
            console.log(val)
            const {name, surname, email, password,dob} = val
            const user = await app.auth().createUserWithEmailAndPassword(email,password)
            console.log(user)
            if(user){
                await app.firestore().collection("newuser").doc(user.user.uid).set({
                    name,
                    surname,
                    email,
                    password,
                    dob,
                    createdBy: user.user.uid,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    toggle: false,
                })
            }

            navigate("/addimage")
            reset()
        })


    return (
        <Container>
            <Header>
                <Logo src={logo}/>
            </Header>
            <Wrapper onSubmit={done}>
                <Top>
                    <Title>Create a new account</Title>
                    <SubTitle>It's quick and easy.</SubTitle>
                </Top>
                <Body>
                    <BodyItems>
                        <FirstInputs>
                            <Inputs wd placeholder="First name"
                            {...register("name")}
                            />
                            <Inputs wd placeholder="Surname"
                             {...register("surname")}
                             />
                        </FirstInputs>
                        <Inputs mg placeholder="Mobile number or email address"
                         {...register("email")}
                         />
                        <Inputs  placeholder="New password" 
                        {...register("password")}
                         />
                        <BirthItems>
                            <BirthTitle>
                                <span>Date of birth</span>
                                <Circle>?</Circle>
                            </BirthTitle>
                            <Inputs type="date" 
                            {...register("dob")}/>
                        </BirthItems>
                        <GenderItems>
                        <BirthTitle>
                                <span>Gender</span>
                                <Circle>?</Circle>
                            </BirthTitle>
                            <Genders>
                            <FemaleHolder>
                                <span>Female</span>
                                <RadioInput type="radio"/>
                            </FemaleHolder>
                            <FemaleHolder>
                                <span>Male</span>
                                <RadioInput type="radio"/>
                            </FemaleHolder>
                            <FemaleHolder>
                                <span>Others</span>
                                <RadioInput type="radio"/>
                            </FemaleHolder>
                            </Genders>
                        </GenderItems>
                        <Rules>
                  By clicking Sign Up, you agree to our Terms, Data Policy
                  and  Cookie Policy. You may recieve SMS notifications 
                  from us and can opt out at any time
              </Rules>
              <SignUp>
                  <Button
                  type="submit"
                  >Sign Up</Button>
              </SignUp>
              <Already to="/login">
                  Already have an account?
              </Already>
                    </BodyItems>

                </Body>
            </Wrapper>
        </Container>
    )
}

export default NewSignUp

const Already = styled(NavLink)`
text-align: center;
color: #1877f2;
line-height: 20px;
font-size: 15px;
letter-spacing: normal;
cursor: pointer;
margin-bottom: 15px;
text-decoration: none;
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

const Rules = styled.div`
color: #777777;
font-size: 11px;
font-family: Helvetica, Arial, sans-serif;
letter-spacing: normal;
text-align: start;
line-height: 14.74px;

`

const Genders = styled.div`
width: 100%;
justify-content: space-between;
align-items: center;
display: flex;
`

const RadioInput = styled.input`
`
const FemaleHolder = styled.div`
display: flex;
align-items: center;
width: 30%;
justify-content: space-around;
border: solid 1px lightgray;
padding: 5px 0;
border-radius: 5px;


span{
    font-size: 15px;
    font-family: arial;

}
`
const GenderItems = styled.div`
margin-top: 5px;
margin-bottom: 12px;
`
const Circle = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 12px;
height: 12px;
background-color: #606770;
font-size: 10px;
border-radius: 50%;
color: white;
opacity: 0.8;

`
const BirthTitle = styled.div`
display: flex;
align-items: center;
margin-bottom: 3px;
span{
    font-size: 12px;
    line-height: 20px;
    letter-spacing: normal;
    text-align: start;
    color: #606770;

    margin-right: 3px;
}
`
const BirthItems = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
margin-top: 20px;
margin-bottom: 10px;
`
const Inputs = styled.input`
width: ${({wd})=> (wd? "45%" : "97%") };
height: 33px;
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
height: 109px;
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
