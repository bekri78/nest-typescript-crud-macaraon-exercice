 
import CardProps from "./type";
import { Card, Button } from "antd";

export default function Cards(props:CardProps) {
  const sendId = () => {
    props.sendId(props.id);
 
    
  };

  
  const modif=()=>{
    let infoUpdate={
      title:props.title,
      description:props.description,
     price: props.price
    }
    props.sendIdForUpdate(props.id);
    props.infoUpdate(infoUpdate)
    props.openModaleForUpdate(true)
    props.modif("modif")
  }

  return (
    <>
      <Card title={props.title} style={{ width: 300 , margin:'1%',   boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'}}>
        <p> Description: {props.description}</p>
        <p>Price: {props.price}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "60%",
            margin:'auto'
          }}
        >
          <Button type="primary" onClick={sendId} style={{ padding: "2%" }}>
            Supprimer
          </Button>
           <Button type="primary" onClick={modif} style={{ padding: "2%" }}>
            Modifier
          </Button>
        </div>
      </Card>
    </>
  );
}
