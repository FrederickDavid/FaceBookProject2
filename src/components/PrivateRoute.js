import React,{useState, useEffect, useContext} from 'react'
import {Navigate} from "react-router-dom"
import {AuthContext} from "./AuthProvider"

const PrivateRoute = ({children}) => {
    const {currentUser} = useContext(AuthContext)

    return currentUser? children : <Navigate to="/signup"/>
}

export default PrivateRoute
