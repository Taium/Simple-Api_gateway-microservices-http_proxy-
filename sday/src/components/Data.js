import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";

const Data = (props) => {
  let navigate = useNavigate();
  const [modal, setModal] = React.useState(false);
  const [hit, setHit] = useState("");

  // Toggle for Modal
  const toggle = () =>{ 
    setModal(!modal);
    setHit(' ')
    props.setEit(false)
  }
  const [name, setName] = useState("");
  const [nid, setNid] = useState("");
  // const [id, setId] = useState("");
  

  const { id } = props.cat;

  console.log(props)

  const handleAdd = async (e) => {
    e.preventDefault();
    if (id) {
      await axios
        .put(`http://localhost:4000/updatedata/${id}`, { name: name, nid: nid })
        .then((response) => {
          setHit(response.data.message);
          navigate("/");
          console.log(response);
          props.setEit(true)

        });
    } else {
      await axios
        .post(`http://localhost:4000/addEmployee`, { name: name, nid: nid })
        .then((response) => {
          console.log(response);
          alert(response.data.message);
          navigate("/");
        });
    }
  };

  useEffect(() => {
    handleGetData();
  }, [id]);

  const handleGetData = async () => {
    if (id) {
      await axios
        .get(`http://localhost:4000/readData/${id}`)
        .then((response) => {
          setName(response.data.data[0].name);
          setNid(response.data.data[0].nid);
        });
    }
  };

  return (
    <>
      {" "}
      <tr key={props.cat.id}>
        <td> {props.cat.name} </td>
        <td> {props.cat.nid}</td>
        <td> {props.cat.joinDate}</td>

        <td>
          <div
            style={{
              display: "block",
              padding: "9px",
            }}
          >
            <Button color="success" onClick={toggle}>
              edit
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>Edit Employee Info
              <br />
              <p style={{color:"blue"}}>
              {
                hit &&  hit 
              }
              </p>
              </ModalHeader>
              <ModalBody>
                <div className="container">
                  <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                      {id ? "UPDATE FORM" : "ADD EMPLOYEE"}
                      <div className="card-body">
                        <form>
                          <div className="form-group">
                            <label> Name: </label>

                            <input
                              className="form-control"
                              placeholder=" Name"
                              value={name}
                              name="name"
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label> Nid: </label>

                            <input
                              className="form-control"
                              placeholder="Nid no"
                              value={nid}
                              name="nid"
                              onChange={(e) => setNid(e.target.value)}
                            />
                          </div>

                          <div>
                            <button
                              className={
                                id ? "btn btn-success" : "btn btn-primary"
                              }
                              
                              onClick={(e) => {
                                handleAdd(e);
                            
                              }}
                              
                            >
                              {id ? "update" : "add new"}
                              
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggle}>
                  Okay
                  
                </Button>
              </ModalFooter>
            </Modal>
          </div>
          <button
            style={{ marginLeft: "10px" }}
            className="btn btn-danger"
            onClick={() => {
              props.deleteData(`${props.cat.id}`);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default Data;
