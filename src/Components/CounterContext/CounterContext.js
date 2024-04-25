import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export let CounterContext = createContext();
export default function CounterContextProvider(props) {
  const [counter, setcounter] = useState(0);

  function changeCounter() {
    setcounter(counter + 1);
    // console.log("hi");
  }

  async function getCart() {
    if (
      localStorage.getItem("ecommToken") ||
      localStorage.getItem("cstNnameFreeCart")
    ) {
      try {
        const { data } = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/cart",
          {
            headers: {
              token: localStorage.getItem("ecommToken"),
            },
          }
        );
        localStorage.getItem("ecommToken")
          ? setcounter(data.numOfCartItems)
          : setcounter();
      } catch (error) {
        // console.log("error");
      }
    }
  }

  useEffect(() => {
    getCart();
    console.log(Cookies.get("access_token"));
  }, [
    localStorage.getItem("ecommToken"),
    localStorage.getItem("cstNnameFreeCart"),
  ]);

  return (
    <>
      <CounterContext.Provider value={{ counter, changeCounter, setcounter }}>
        {props.children}
      </CounterContext.Provider>
    </>
  );
}
