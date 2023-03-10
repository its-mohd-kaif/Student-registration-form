import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
function Display() {
  return (
    <section className="display">
      <h1>Your Form Details</h1>
      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Highest Qualification</th>
            <th>PDF File</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {/* Display Using Map */}
          {JSON.parse(localStorage.getItem("data")).map((val, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{val.name}</td>
              <td>{val.age}</td>
              <td>{val.qualification}</td>
              <td>
                <a target={"_blank"} href={val.pdf.pdf} rel="noreferrer">
                  <i class="fas fa-file-pdf"></i>&nbsp;&nbsp;{val.pdf.name}
                </a>
              </td>
              <td>
                <img
                  style={{ width: "100px", height: "100px" }}
                  src={val.image.img}
                  alt="img"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to={"/"}>
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg">
            Add More
          </Button>
        </div>
      </Link>
    </section>
  );
}

export default Display;
