import React from 'react'
import AddFriends from './AddFriend'
import AddImage from './AddImage'
import Header from './Header'
import Home from './Home'
import NewSignUp from './NewSignUp'
import Login from './Login'
import Post from './Post'
import profile from "./profile.jpg"
import avatar from "./avatar.png"
import PrivateRoute from "./PrivateRoute"
import DetailPage from "../components3/DetailPage"
import AddCoverPhoto from "../components3/AddCoverPhoto"
import AddBio from "../components3/AddBio"
import AddPhoto from "../components3/AddPhoto"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
const FacebookApp = () => {
    const [firstname, setFirstname] = React.useState("")
    const [surname, setSurname] = React.useState("")
    const [mobileNumber, setMobileNumber] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [image, setImage] = React.useState(`${avatar}`)
    const [postcontents, setPostContents] = React.useState("")
    const [postImage, setPostImage] = React.useState("")
    return (
        <div>
            
             
           
     
          {/* <Header/> */}
          
      
             <Router>
                 <Routes>
            <Route path="/signup" exact
        element={
        <NewSignUp/>
        }/>

          <Route path="/addimage" 
          element={ <AddImage
          image={image}
          setImage={setImage}
          firstname={firstname}/> }/>
          <Route path="/addfriend" element={<AddFriends
           firstname={firstname}
           surname={surname}
           image={image}/>}/>
          <Route path="/" element={
         <PrivateRoute>
              <Home
             image={image}
             setImage={setImage}
             firstname={firstname}
             surname={surname}
             postcontents={postcontents}
             setPostContents={setPostContents}
             postImage={postImage}
            setPostImage={setPostImage}/>
         </PrivateRoute>
            }/>
            <Route exact path="/login" element={<Login/>}/>
            <Route path="/detail/:id" element={<DetailPage/>}/>
            <Route path="/addcover" element={<AddCoverPhoto/>}/>
            <Route path="/addbio" element={<AddBio/>}/>
            <Route path="/addphoto" element={<AddPhoto/>}/>
                 </Routes>
             </Router>
       
        </div>
    )
}

export default FacebookApp
