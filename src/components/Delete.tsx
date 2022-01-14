/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export default function Delete(props: any) {
  useEffect(() => {
    if (props.deleteUser) {
      requete();
    }
  }, [props.deleteUser]);
  const requestOptions = {
    method: "DELETE",
  };
  let requete = () => {
    fetch(
      `http://localhost:4000/products/${props.deleteUser} `,
      requestOptions
    ).then((response) => props.deleteOk(true));
  };
  return <></>;
}
