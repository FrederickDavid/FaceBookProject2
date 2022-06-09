import React,{useState, useEffect, useContext, createContext} from "react"
import {app} from "../base"

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(()=>{
        app.auth().onAuthStateChanged((val)=>{
                setCurrentUser(val)
        })
    },[])
    return(
        <AuthContext.Provider value={{currentUser, msg: "Hwllo"}}>
            {children}
        </AuthContext.Provider>
    )
}
