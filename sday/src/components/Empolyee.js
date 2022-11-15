import React, { useEffect, useState } from "react";
import Data from "./Data";
import axios from "axios";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";



function Empolyee() {
  const [modal, setModal] = React.useState(false);

  const [name, setName] = useState("");
  const [nid, setNid] = useState("");
  const [employee, setEmpolyee] = useState([]);
  const [hit, setHit] = useState('');
  const [eit, setEit] = useState(false);
  console.log(employee)


  const toggle = () =>{ 
    setModal(!modal);
    setHit(' ')
  }

 function set(){
  setEit(true)
 }

  const deleteData = async (id) => {
    console.log(id);
    if (id) {
      await axios
        .delete(`http://localhost:4000/datadelete/${id}`)
        .then((response) => {
          console.log(response.data.message);
          alert(response.data.message);
          
          fetch("http://localhost:4000/readdata")
            .then((res) => res.json())
            .then((data) => {
              setEmpolyee(data.data);
              setEit(true)
            });
        });
    }
  };
  const handleAdd = async (e) => {
    
    e.preventDefault();
      await axios
        .post(`http://localhost:4000/addEmployee`, { name: name, nid: nid })
        .then((response) => {
          console.log(response);
          setHit(response.data.message);
          fetch("http://localhost:4000/readdata")
            .then((res) => res.json())
            .then((data) => {
              setEmpolyee(data.data);
            });

          
        });
    
  };

  useEffect(() => {
    try {
      fetch("http://localhost:4000/readdata")
        .then((res) => res.json())
        .then((data) => {
          setEmpolyee(data.data);
          console.log(data.data);
          

        });
    } catch (err) {
      setEmpolyee([]);
    }
  }, [eit]);

  return (
    <div className="container">
      <h2 className="text-center">Employees List</h2>

      <br />
      <br />
      <div className="row">
      <div
            style={{
              display: "block",
              padding: "9px",
            }}
          >
            <Button color="primary" onClick={toggle}>
              Add Employee
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>Add New Employee
              <br />
              <p style={{color:"primary"}}>
              {
                hit && hit
              }
              </p>
              </ModalHeader>
              <ModalBody>
                <div className="container">
                  <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                      ADD EMPLOYEE
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
                              className=
                                'btn btn-primary'
                              
                              onClick={(e) => handleAdd(e)}
                              
                            >
                               add new
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
      </div>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th> Employee Name</th>
              <th> Employee Nid </th>
              <th> Employee Join Date</th>
              <th> Actions</th>
            </tr>
          </thead>
          <tbody>
            {employee &&
              employee.length > 0 &&
              employee.map((category , index) => (
                <Data deleteData={deleteData} set={set} index={index} setEit={setEit} cat={category}></Data>
              ))}
          </tbody>
        </table>
      </div>

      <div></div>
    </div>
  );
}

export default Empolyee;
