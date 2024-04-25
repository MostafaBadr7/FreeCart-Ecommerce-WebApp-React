import React, { useContext } from 'react'

import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import './UserProfile.module.css'
import UserInfo from '../UserInfo/UserInfo';
import { ProfileContext } from '../../Contexts/ProfileContextProvider';
import { jwtDecode } from 'jwt-decode';

export default function UserProfile() {
  
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});

  // const getUserDetails = async (accessToken) => {
  //   const response = await fetch(
  //     `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
  //   );
  //   const data = await response.json();
  //   console.log(data)
  //   setUserDetails(data);
  // };

  // useEffect(() => {
  //   const accessToken = Cookies.get("access_token");
  //   console.log(accessToken)

  //   if (accessToken) {
  //     getUserDetails(accessToken);
  //   }else if(localStorage.getItem('ecommToken')){
  //     navigate("/");
  //   }

    
  // }, [navigate]);
  const { cstNname, setcstNname } = useContext(ProfileContext);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const accessToken = Cookies.get('access_token');
  //     if (!accessToken) {
  //       handleNoAccessToken();
  //     } else {
  //       try {
  //         const resp = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`);
  //         if (!resp.ok) {
  //           throw new Error('Failed to fetch user details');
  //         }
  //         const data = await resp.json();
  //         setUserDetails(data);
  //       } catch (err) {
  //         handleNoAccessToken();
  //       }
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(()=>{
    console.log(userDetails, cstNname )
  },[userDetails, cstNname])

  // const handleNoAccessToken = () => {
  //   if (!localStorage.getItem('ecommToken')) {
  //     navigate('/Login');
  //   } else {
  //     setcstNname(jwtDecode(localStorage.getItem('ecommToken')));
  //   }
  // };
  
  return (
    <>
        <main className='row mt-3 tabpanel bg-success-subtle rounded mx-1 ps-1'>
        {userDetails ? (
          <>
            <nav className='col-3 bg-light navbar-nav nav-userinfo  list-group my-2 ' id="myList" role="tablist">
              <ul>
                <li className='my-3 list-group-item list-group-item-action cursor-pointer'><Link to="">My Info</Link></li>
                <li  className='my-3 list-group-item list-group-item-action cursor-pointer'><Link to="AllOrders">AllOrder</Link></li>
                <li  className='my-3 list-group-item list-group-item-action cursor-pointer'><Link to="Cart"> Cart</Link></li>
              </ul>
            </nav>
            <div className="tab-content col-9 ">
            <Outlet/>
            </div>
          </>
              ) : (
                <div>
                  <h1>Loading...</h1>
                </div>
              )}
        </main>
    </>
  );
}

