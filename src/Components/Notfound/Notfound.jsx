import React, { lazy, useContext, useEffect, useState } from 'react'
import Nfound from '../../Assets/images/error.svg'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContextProvider';
import axios from 'axios';
export default function Notfound() {

  const navigate = useNavigate();
  const [Loaading, setLoaading] = useState('tokenLoad')
  const [userDetails, setUserDetails] = useState({});
  const {setToken} = useContext(AuthContext)
  
/* Solving a problem.. I couldn't move the google url to a specific component 
otherwise the NotFound ,so from here I am moving it to another URL then I can 
control it */
  if(window.location.href.includes('access_token=')){
    // console.log(window.location)
    navigate(`/login/${window.location.hash}`)
  }

  useEffect(()=>{
    if(window.location.href.includes('access_token=')){
      // console.log(window.location)
      navigate(`/login/${window.location.hash}`)
    }
    setLoaading("false")
  },[window.location.href] )

  // const Nfound = lazy(()=> import('../../Assets/images/error.svg')) 

  

  return <>
    {Loaading === 'tokenLoad' ? <h1>Loading ...</h1>
  :
    <div className='text-center pt-5 text-white fs-1 d-flex justify-content-center flex-column h-100'>
    <img className='w-50 m-auto' src={Nfound} alt="" />
    <h1 className='text-success'>Page Is Not Found</h1>
    </div>
  }
</>
}
