import React from 'react'
import './ProtectedRoute.module.css'
import Login from '../Login/Login'
export default function ProtectedRoute(props) {

return <>
  {localStorage.getItem('ecommToken') ? props.children : <Login/>}
  </>
}
