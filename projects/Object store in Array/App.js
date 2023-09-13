import React from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [inputarr, setInputarr] = useState([]);

  const [inputdata, SetInputdata] = useState({ name: "", email: "" });

  function changehandle(e) {
    SetInputdata({
      ...inputdata,
      [e.target.name]: e.target.value,
    });
  }

  let { name, email } = inputdata;
  function changhandle() {
    setInputarr([
      ...inputarr,
      {
        name,
        email,
      },
    ]);

    console.log(inputdata, "input data what we Enter");
    SetInputdata({ name: "", email: "" });
  }
  let delethandle = (i) => {
    let newdataArr = [...inputarr];
    newdataArr.splice(i, 1);
    setInputarr(newdataArr);
  };
  function changhandle2() {
    console.log("Object store in array", inputarr);

    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputdata),
    }).then((resp) => {
      resp.JSON().then((result) => {
        console.log("result", result);
      });
    });
  }
  return (
    <div className="App">
      <h1>React</h1>
      <p>
        <strong>
          Take value form user make a table using React.js Object store in Array
        </strong>
      </p>
      <input
        type="text"
        autoComplete="off"
        name="name"
        value={inputdata.name}
        onChange={changehandle}
        placeholder="Enter Name"
      />
      <input
        type="text"
        autoComplete="off"
        name="email"
        value={inputdata.email}
        onChange={changehandle}
        placeholder="Email ID"
      />

      <button onClick={changhandle}>Add It</button>
      <br />
      <button onClick={changhandle2}>Chaeck Array in console</button>
      <br />
      <br />

      <table border={1} width="30%" cellPadding={10}>
        <tbody>
          <tr>
            <th>Sr.No</th>
            <th>Name </th>
            <th>Email ID</th>
            <th>Options</th>
          </tr>
          {inputarr.length < 1 ? (
            <tr>
              <td colSpan={4}>NO data Enter yet !</td>
            </tr>
          ) : (
            inputarr.map((info, ind) => {
              return (
                <tr key={ind}>
                  <td>{ind + 1}</td>
                  <td>{info.name}</td>
                  <td>{info.email}</td>
                  <td>
                    <button onClick={() => delethandle(ind)}>Delete</button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
