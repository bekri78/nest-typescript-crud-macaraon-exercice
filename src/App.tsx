import React, { useState } from "react";
import "./App.css";
import Read from "./components/Read";
import Add from "./components/Add";
import Delete from "./components/Delete";

function App() {
  const [deletee, setDelete] = useState(null);
  const [deleteOk, setdeleteOk] = useState<boolean>(false);

  return (
    <div className="App">
      <Read
        delete={(id: any) => {
          setDelete(id);
        }}
        deleteOk={deleteOk}
      />
      <Add />
      <Delete
        deleteUser={deletee}
        deleteOk={(id: boolean) => {
          setdeleteOk(id);
        }}
      />
    </div>
  );
}
export default App;
