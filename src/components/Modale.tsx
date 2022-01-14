import React, { useState, useEffect } from "react";
import { Modal, Input, InputNumber } from "antd";

export default function Modale(props: any) {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [price, setPrice] = useState<number>(0);
  const [info1, setInfo1] = useState<string>("");
  const [info2, setInfo2] = useState<string>("");
  const [info3, setInfo3] = useState<number>(0);

  let value = {
    title: title,
    description: description,
    price: price,
  };

  useEffect(() => {
    if (props.infoUpdate) {
      setInfo1(props.infoUpdate.title);
      setInfo2(props.infoUpdate.description);
      setInfo3(props.infoUpdate.price);
    }
  }, [info1, info2, info3, props.infoUpdate, props.open]);

  const handleOk = () => {
    if (props.modif === "create") {
      props.modaleClose(false);
      props.create(value);
    }
    if (props.modif === "modif") {
      props.modification(value);
      props.modaleClose(false);
    }
  };

  const handleCancel = () => {
    props.modaleClose(false);
  };
  return (
    <Modal
      title="Basic Modal"
      visible={props.open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input
        placeholder="title"
        defaultValue={info1}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="description"
        defaultValue={info2}
        onChange={(e) => setDescription(e.target.value)}
      />
      <InputNumber
        min={1}
        max={100}
        defaultValue={info3}
        placeholder="price"
        onChange={(value) => setPrice(value)}
      />
    </Modal>
  );
}
