import React, { useState } from "react";
import "./table.scss";

export default function FormData() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
  });

  const [tableData, setTableData] = useState([
    {
      name: "John Doe",
      number: "1234567890",
      email: "john@example.com",
    },
    {
      name: "Jane Smith",
      number: "9876543210",
      email: "jane@example.com",
    },
    {
      name: "Alice Johnson",
      number: "5555555555",
      email: "alice@example.com",
    },
    {
      name: "Bob Johnson",
      number: "5555555555",
      email: "bob@example.com",
    },
    {
      name: "Charlie Brown",
      number: "9999999999",
      email: "charlie@example.com",
    },
    {
      name: "David Davis",
      number: "1111111111",
      email: "david@example.com",
    },
    {
      name: "Eva Wilson",
      number: "2222222222",
      email: "eva@example.com",
    },
    {
      name: "Frank Wilson",
      number: "2222222222",
      email: "frank@example.com",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name === "" ||
      formData.number === "" ||
      formData.email === ""
    ) {
      alert("Please fill in all fields.");
    } else if (!/^\d{10}$/.test(formData.number)) {
      alert("Number must be a 10-digit number.");
    } else {
      const newData = { ...formData };
      setTableData([...tableData, newData]);
      setFormData({ name: "", number: "", email: "" });
    }
  };

  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <h1 className="heading">Piquota Digital Solutions</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="inputt">
          <input
            type="text"
            value={formData.name}
            name="name"
            autoComplete="off"
            placeholder="Enter Name"
            onChange={handleInputChange}
          />
          <input
            type="text"
            value={formData.number}
            name="number"
            autoComplete="off"
            placeholder="Enter Number (10 digits)"
            onChange={handleInputChange}
          />
          <input
            type="email"
            value={formData.email}
            name="email"
            autoComplete="off"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
          <button type="submit">Add data</button>
        </div>
      </form>

      <br />

      <table border="1">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Email</th>
          </tr>
          {currentItems.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.number}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      {/* Pagination */}
      <div className="pagination">
        {totalPages > 1 && (
          <span>
            Total Pages: {totalPages} :
            {Array.from({ length: totalPages }, (_, index) => (
              <span
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {`${index + 1}`}
              </span>
            ))}
          </span>
        )}
      </div>
    </div>
  );
}
