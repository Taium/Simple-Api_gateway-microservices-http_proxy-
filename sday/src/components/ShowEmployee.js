import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const ShowEmpolyee = (props) => {
  const { name, nid, joinDate , id} = props.employee;
  const handleAdd = () => {
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("nid", nid);
    fetch("http://localhost:4000/addEmpolyee", {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        props.handleShow();
      });
  };
  return (
    <div>
      <h1>name : {name}</h1>
      <p>Nid :{nid}</p>
      <Link to="/add">
        <Button className="btn btn-primary">add</Button>
      </Link>
      <Link to={`add/${id}`}>
        <Button className="btn btn-primary">Edit</Button>
      </Link>
    </div>
  );
};

export default ShowEmpolyee;
