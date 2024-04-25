import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useMemo, useState } from "react";

export const ProfileContext = createContext();

export default function ProfileContextProvider(props) {
  const [cstNname, setcstNname] = useState(null);

  useEffect(() => {
    setcstNname(JSON.parse(localStorage.getItem("cstNnameFreeCart")));

    // let data = JSON.parse(localStorage.getItem("cstNnameFreeCart")) || null;
    // setcstNname(data);
    // console.log(props);
    // console.log("contextName", cstNname); // Verify cstNname change
    // console.log(localStorage.getItem("cstNnameFreeCart")); // Verify cstNname change
  }, []);

  return (
    <ProfileContext.Provider value={{ cstNname, setcstNname }}>
      {props.children}
    </ProfileContext.Provider>
  );
}
