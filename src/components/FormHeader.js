import React from 'react'
import styled from "styled-components"

const FormHeader = () => {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    return (
        <Container>
            <Wrapper>
                <Logo>facebook</Logo>
                <RightItems>
                    <FirstItems>
                        <Email>Email or phone</Email>
                        <Inputs
                        value={email}
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}/>
                    </FirstItems>
                    <SecondItems>
                        <PassWord>Password</PassWord>
                        <Inputs mb type="password"
                        value={password}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }} />
                        <Forgotten>Forgotten account?</Forgotten>
                    </SecondItems>
                    <LogIn
                    onClick={()=>{
                        setEmail("")
                        setPassword("")
                    }}>Log in</LogIn>
                </RightItems>
            </Wrapper>
        </Container>
    )
}

export default FormHeader

const Forgotten = styled.div`
font-size: 7px;
color: lightgray;
`
const PassWord = styled.div`
color: white;
font-size: 10px;
font-weight: bold;
`
const Inputs = styled.input`
outline: none;
border: 1px solid black;
color: black;
width: 170px;
height: 20px;
margin-top: 5px;
margin-bottom: ${({mb})=>(mb? "5px" : "0px")};
margin-left: ${({ml})=>(ml? "10px" : "0px")};
margin-right: ${({mr})=>(mr? "10px" : "0px")};

`
const Email = styled.div`
color: white;
font-size: 10px;
font-weight: bold;
`
const LogIn = styled.div`
display: flex;
justify-content: center;
align-items: center;
background-color: rgb(0,0,255,0.6);
color: white;
width: 45px;
height: 25px;
font-size: 12px;
font-weight: bold;
border-radius: 3px;
transform: scale(1);
transition: all 350ms;
:hover{
    transform: scale(1.03);
    cursor: pointer;
}
`
const SecondItems = styled.div`
flex-direction: column;
margin: 0px 28px;
align-items:center
`
const FirstItems = styled.div`
flex-direction: column;
align-items: center;
margin-top: -10px;
`
const RightItems = styled.div`
display: flex;
align-items: center;
`
const Logo = styled.div`
width: 150px;
height: 50px;
font-family: Montserrat;
font-size: 40px;
font-weight: 400;
line-height: 15px;
color: rgb(33, 37, 41);

`
const Container = styled.div`
width: 100%;
/* background-color: rgb(0,0,255,0.7); */
background-color: #3B5998;

height: 70px;
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 30px;
`
const Wrapper = styled.div`
width: 90%;
height: 100%;
display: flex;
justify-content: space-between;
align-items: center;
/* background-color: blue; */
`
