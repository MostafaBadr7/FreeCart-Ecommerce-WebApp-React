import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export let AuthContext = createContext();

export default function AuthContextProvider(props) {
  const [Token, setToken] = useState(null);
  const [inHome, setinHome] = useState(null);
  const [navDisplay, setnavDisplay] = useState(true);

  useEffect(() => {
    const URL = window.location.href;
    if (!URL.includes("Login") || !URL.includes("Register")) {
      setnavDisplay(true);
    } else {
      setnavDisplay(false);
    }
  }, [URL]);

  return (
    <>
      <AuthContext.Provider
        value={{ Token, setToken, navDisplay, setnavDisplay }}
      >
        {props.children}
      </AuthContext.Provider>
    </>
  );
}
