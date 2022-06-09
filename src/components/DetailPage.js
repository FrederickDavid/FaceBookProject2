import React from "react"
import styled from "styled-components"
import Header from "./Header"
const DetailPage = ()=>{
    return(
        <Container>
            <Header/>
            <Wrapper>
                
            </Wrapper>
        </Container>
    )
}
export default DetailPage 

const Wrapper = styled.div`
width: 100%;
min-height: 100vh;
height: 100%;
background-color:blue;
`
const Container = styled.div`
width: 100%;
min-height: 100vh;
background-color: #eee;
height: 100%;
display: flex;
align-items: center;
flex-direction: column;
`