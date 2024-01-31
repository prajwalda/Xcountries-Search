import React, { useState, useEffect } from "react";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        alert("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ color: "green", marginBottom: "20px" }}>Employee Data</h1>
      <table
        style={{ width: "80%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() =>
            paginate(currentPage > 1 ? currentPage - 1 : currentPage)
          }
          disabled={currentPage === 1}
          style={{
            padding: "10px",
            fontSize: "14px",
            cursor: "pointer",
            backgroundColor: "green",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            marginRight: "10px",
          }}
        >
          Previous
        </button>
        <span style={{ lineHeight: "38px" }}>{`Page ${currentPage}`}</span>
        <button
          onClick={() =>
            paginate(
              currentPage < Math.ceil(employees.length / employeesPerPage)
                ? currentPage + 1
                : currentPage
            )
          }
          disabled={
            currentPage === Math.ceil(employees.length / employeesPerPage)
          }
          style={{
            padding: "10px",
            fontSize: "14px",
            cursor: "pointer",
            backgroundColor: "green",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            marginLeft: "10px",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
