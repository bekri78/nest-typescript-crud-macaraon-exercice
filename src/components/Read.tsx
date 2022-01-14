import React, { useState, useEffect } from "react";
import Modale from "./Modale";
import Cards from "./Card";
import Update from "./Update";
import Add from "./Add";
import Produit from "./Produit";
import { Button } from "antd";

export default function Read(props: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [readDb, setReadDb] = useState<Produit[]>([]);
  const [modif, setModification] = useState<object>();
  const [create, setCreate] = useState<object>();
  const [info, setInfo] = useState<object>();
  const [infoForUpdate, setIdForUpdate] = useState<string>();
  const [modifOrCreate, setModifOrCreate] = useState<string>();
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [update, props.deleteOk]);

  const url = "http://localhost:4000/products/";
  const openModal = () => {
    setOpen(true);
    setModifOrCreate("create");
  };
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setReadDb(json);
      setUpdate(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div
        style={{
          width: "5%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          flexDirection: "column",
          margin: "auto",
        }}
      >
        <Button style={{ margin: "5%" }} type="primary" onClick={openModal}>
          Ajouter un produit
        </Button>
      </div>
      <div
        style={{
          width: "100%",

          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "auto",
          paddingTop: "2%",
        }}
      >
        {readDb &&
          readDb.map((el, index) => {
            return (
              <Cards
                key={index}
                id={el.id}
                title={el.title}
                description={el.description}
                price={el.price}
                sendId={(id: number) => props.delete(id)}
                openModaleForUpdate={(open: boolean) => setOpen(open)}
                infoUpdate={(info: object) => setInfo(info)}
                sendIdForUpdate={(id: string) => setIdForUpdate(id)}
                modif={(id: string) => setModifOrCreate(id)}
              />
            );
          })}
      </div>
      <Modale
        infoUpdate={info}
        open={open}
        modif={modifOrCreate}
        modaleClose={(el: boolean) => setOpen(el)}
        create={(el: object) => setCreate(el)}
        modification={(el: object) => setModification(el)}
      />
      <Add create={create} />
      <Update
        updateId={infoForUpdate}
        modif={modif}
        updateOk={(id: boolean) => setUpdate(id)}
      />
    </>
  );
}
