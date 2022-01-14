/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export default function Add(props:any) {
  useEffect(() => {
    if (props.create) {
      sendModif();
    }
  }, [props.create]);
  const sendModif = () => {
 
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props.create),
    };

    fetch("http://localhost:4000/products/", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return null;
}
