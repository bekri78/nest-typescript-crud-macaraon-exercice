/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

export default function Update(props: any) {
  useEffect(() => {
    if (props.modif && props.updateId) {
      sendModif();
    }
  }, [props.update, props.modif]);
  const sendModif = () => {
    props.updateOk(true);
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(props.modif),
    };

    fetch(`http://localhost:4000/products/${props.updateId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return <></>;
}
