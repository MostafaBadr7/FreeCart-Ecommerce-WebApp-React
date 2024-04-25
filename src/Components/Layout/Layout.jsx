import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useContext } from 'react';
import { CounterContext } from '../CounterContext/CounterContext';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Offline, Online } from "react-detect-offline";
import { AuthContext } from '../../Contexts/AuthContextProvider';


export default function Layout() {

  let {changeCounter} = useContext(CounterContext);
  const {navDisplay} = useContext(AuthContext);

 

  return <>
  <Navbar changeCounter= {changeCounter}/>
      <main className={navDisplay ? 'm-auto mt-4 pt-4 min-vh-100' : 'm-auto  min-vh-100'}>
        <Outlet />
      </main>

      <div className=' text-danger-emphasis rounded-end  shadow-lg fixed-bottom w-25 justify-content-start d-flex'>
      <Offline className='mx-2 p-2 ' >
        <div className='d-flex align-items-center pe-2'>
          <strong className='fas fa-wifi mx-2 d-inline p-2  m-1'></strong>
          <strong >You are Offline</strong>
        </div>
      </Offline>
    </div>

  <Footer/>
 </>
    }
