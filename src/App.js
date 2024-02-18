import React, { useState } from "react";
import { CSVLink } from "react-csv";
import RoutePages from "./Routes/RoutePages";

function App() {
  // const [response, setResponse] = useState([]);

  // const handleDownload = async () => {
  //   try {
  //     const res = await fetch('https://fakestoreapi.com/products');
  //     const data = await res.json();
  //     setResponse(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  
  // console.log("res",response);
  // const headers = [
  //   { label: "id", key: "id" },
  //   { label: "title", key: "title" },
  //   // Add more headers if needed based on your API response structure
  // ];

  return (
    <>
    <RoutePages/>
      {/* <h1>Hello</h1>
      <button onClick={handleDownload}>Download Data</button>
      <CSVLink data={response} headers={headers} filename={"data.csv"}>
        Download as CSV
      </CSVLink> */}
    </>
  );
}

export default App;
