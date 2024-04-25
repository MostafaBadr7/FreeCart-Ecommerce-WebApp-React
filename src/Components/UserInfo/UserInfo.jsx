import React, { useContext, useEffect } from 'react';
import style from './UserInfo.module.css';
import { ProfileContext } from '../../Contexts/ProfileContextProvider';

export default function UserInfo() {
  const { cstNname } = useContext(ProfileContext);

useEffect(() => {
  
}, [cstNname])


  return (
    <div className="user-profile tab-pane active bg-success-subtle py-2 " id="home" role="tabpanel">
      <div className="card text-center bg-success-subtle ">
        {( cstNname?.picture) ? (
          <img
            src={ cstNname?.picture}
            alt={( cstNname?.given_name) + "'s profile"}
            className="profile-pic w-25 d-inline-block m-auto my-3 rounded-circle shadow"
          />
        ) : (
          <div className={`${style.profilePhotoDiv} my-3 m-auto rounded-circle bg-warning-subtle d-flex align-items-center justify-content-center shadow`}>
             <h1 className='fw-bolder '>{cstNname?.name?.slice(0,1)}</h1> 
          </div>
        )}
        <p className='fw-bold'>Welcome</p>
        {!window.location.hash.includes('UserProfile') ?
            <h6 className="name fw-bolder">
            {/* {console.log(userDetails, cstNname)} */}
            {(cstNname && cstNname?.name)}
            </h6>
        :
            <h1 className="name">
            {(cstNname && cstNname?.name)}
            </h1>}
       
        <p className="email">{ cstNname?.email}</p>
      </div>
    </div>
  );
}