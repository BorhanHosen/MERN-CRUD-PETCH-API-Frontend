import { useState } from "react";
import CreateProduct from "./components/CreateProduct";
import Table from "./components/Table";

export default function App() {
  const [data, setData] = useState([]);
  const [clickEdit, setClickEdit] = useState("");
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/GetProducts");
      const data = await response.json();
      setData(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-slate-800">
      <div className="flex flex-col md:flex-row w-10/12 sm:w-11/12 ">
        <CreateProduct
          fetchData={fetchData}
          clickEdit={clickEdit}
          setClickEdit={setClickEdit}
        />
        <Table
          fetchData={fetchData}
          data={data}
          clickEdit={clickEdit}
          setClickEdit={setClickEdit}
        />
      </div>
    </div>
  );
}
