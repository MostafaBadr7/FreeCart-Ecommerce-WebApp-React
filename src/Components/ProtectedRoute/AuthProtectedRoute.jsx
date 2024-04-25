import React from 'react'
import './ProtectedRoute.module.css'
import {Navigate} from 'react-router-dom'

export default function AuthProtectedRoute(props) {


    return <>
      {localStorage.getItem('ecommToken') ? <Navigate to="/Home"/> : props.children  }
      </>
}
