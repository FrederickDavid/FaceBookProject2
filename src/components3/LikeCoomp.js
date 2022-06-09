import React,{useState,useContext,useEffect} from 'react'
import styled from "styled-components"
import {AiOutlineLike,AiFillLike} from "react-icons/ai"
import {AuthContext} from "../components/AuthProvider"
import {app} from "../base"

const LikeCoomp = ({like,likeicon,commenticon,myId,commentcount,youlike,younotlike,youandothers,x}) => {
    const {currentUser} = useContext(AuthContext)
    const [likeHolder, setLikeHolder] = useState([])
    const [commentData, setCommentData] = useState([])

    const createLike = async ()=>{
        await app.firestore().collection("mainpost").doc(myId).collection("like").doc(currentUser?.uid).set({
            likeBy: currentUser?.uid,
            toggle: true,
        })
    }

    const deleteLike = async ()=>{
        await app.firestore().collection("mainpost").doc(myId).collection("like").doc(currentUser?.uid).delete()
    }

    const getLike = async ()=>{
        await app.firestore().collection("mainpost").doc(myId).collection("like").onSnapshot((snapshot)=>{
            const r = []
            snapshot.forEach((doc)=>{
                r.push({...doc.data(), id: doc.id})
            })
            setLikeHolder(r)
        })
    }

    useEffect(()=>{
getLike()
console.log(likeHolder)
    },[])
  return (
    <div>
    {
        like? 
        <div>
        {likeHolder.every((el)=>el.id !== currentUser.uid)? 
            <LikeClickHolder fs="20px"
            onClick={()=>{
               createLike()
           }}>
           <AiOutlineLike/>
           <span>Like</span>
       </LikeClickHolder>
            : <div>
        {likeHolder?.map((props)=>(
            <div>
            {props.likeBy === currentUser.uid? 
                <div>
                {props.toggle? 
                    <LikeClickHolder fs="20px"
                onClick={()=>{
                    deleteLike()
               }} style={{color: "blue"}}>
               <AiFillLike/>
               <span>Like</span>
           </LikeClickHolder> : 
                <LikeClickHolder fs="20px"
                onClick={()=>{
                   createLike()
               }}>
               <AiOutlineLike/>
               <span>Like</span>
           </LikeClickHolder>}
                </div>
                : null}
            </div>
        ))}
        </div>}
        </div>
    :null
    }

    {likeicon?
        <Like/>
      :null}

      {
          youlike? <LikerName>You</LikerName>: null
      }

      {younotlike?<LikerName>19</LikerName>:null }

      {youandothers? <LikerName>and 5 others</LikerName>: null}

       {commenticon? 
      <CommentsNumber>
        6 comments
    </CommentsNumber>
        :null}
       
         </div>
  )
}

export default LikeCoomp

const InputHolder = styled.form`
width: 90%;
background-color: #eee;
display: flex;
align-items: center;
justify-content: space-between;
border-radius: 5px;
`
const LikeClickHolder = styled.div`
display: flex;
align-items: center;
transform: scale(1);
transition: all 350ms;
font-size: ${({fs})=>fs};
color: ${({bg})=>bg};
:hover{
    transform: scale(1.02);
    cursor: pointer;
}
span{
    font-size: 12px;
    margin-left: 5px;
}
`

const CommentsNumber = styled.div`
font-size: 12px;
color: gray;
`
const LikerName = styled.div`
font-size: 12px;
color: gray;
`
const Like = styled(AiFillLike)`
color: blue;
font-size: 13px;
margin-right: 5px;
`
const Onw = styled.div`
display: flex;
align-items: center;
`
