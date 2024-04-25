import React, { useContext, useEffect, useState } from 'react'
import './Footer.module.css'
import { AuthContext } from '../../Contexts/AuthContextProvider';


export default function Footer() {

  const {navDisplay} = useContext(AuthContext);

  return <>
    {navDisplay &&
    <section className='bg-main-light pb-5 z-3 position-relative'>
      <div className='px-5 pb-3 pt-5'>
          <h4 className=''>Get the FreshCart app</h4>
          <p className='text-muted'>We will send you a link, open it on your phone to download the app</p>
      </div>
      <div className='container'>
          <div>
            <input className='rounded w-75 me-2 border-0 border-success py-1 px-2' placeholder='..Email' type="text" />
            <button className='btn bg-main px-3 py-1 text-white'>Share App Link</button>
          </div>
      </div>
    </section>
    }
  </>
}
