import React from 'react'
import styled from "styled-components"
import {AiTwotoneDelete,AiFillLike} from "react-icons/ai"
import img from "./profile.jpg"
import {app} from "../base"
import moment from "moment"
import {NavLink} from "react-router-dom"
import { AuthContext } from '../components/AuthProvider'

const PostProfile = ({current,myId, date}) => {
  const {currentUser} = React.useContext(AuthContext)
  const [data, setData] = React.useState([])

  const getData = async ()=>{
    await app.firestore().collection("newuser").doc(current).get().then((val)=>{
      setData(val.data())
    })
  }

  React.useEffect(()=>{
    getData()
  },[])


  return (

    <PicNameTimeAndDelete>
    <PicNameTime>
    <FirstProfile src={data?.avatar}/>
    <NameTime>
        <PosterName to={`/detail/${current}`}>{data?.name} {data?.surname}</PosterName>
        <PosterDate>{moment(date).fromNow()}</PosterDate>
    </NameTime>
</PicNameTime>
{currentUser?.uid === current? <DeleteIcon/>:null}
    </PicNameTimeAndDelete>
 
  )
}

export default PostProfile


const PosterDate = styled.div`
font-size: 10px;
margin-top: 1px;
`
const PosterName = styled(NavLink)`
font-weight: bold;
font-size: 12px;
font-family: Arial, Helvetica, sans-serif;
color: black;
text-decoration:none;
`
const NameTime = styled.div``


const FirstProfile = styled.img`
width: 40px;
height: 40px;
object-fit: cover;
margin-right: 20px;
border-radius: 50%;
`
const PicNameTime = styled.div`
display: flex;
align-items: center;
`

const DeleteIcon = styled(AiTwotoneDelete)`
font-size: 13px;
cursor:pointer;
`
const PicNameTimeAndDelete = styled.div`
justify-content: space-between;
display: flex;
width: 90%;
align-items: center;
margin-top: 15px;
margin-bottom: 20px;
`
