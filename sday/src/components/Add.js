import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Add = () => {
  const [name, setName] = useState("");
  const [nid, setNid] = useState("");
  const { id } = useParams();
  let navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (id) {
        
        await axios
        .put(`http://localhost:4000/updatedata/${id}`, { name: name, nid: nid })
        .then((response) => {
            alert(response.data.message)
            navigate("/");
          console.log(response);
        });
    } else {
      await axios
        .post(`http://localhost:4000/addEmployee`, { name: name, nid: nid })
        .then((response) => {
          console.log(response);
          alert(response.data.message)
          navigate("/");
        });
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

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
      
      
      <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    id ? "UPDATE FORM" : "ADD EMPLOYEE"
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label>  Name: </label>

                                                <input
                                                className="form-control"
                                                placeholder=" Name"
                                                      value={name}
                                                      name="name"
                                                      onChange={(e) => setName(e.target.value)}
                                                    />
                                        </div>
                                        <div className = "form-group">
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
                                          <button className={id ? "btn btn-success" : "btn btn-primary"} onClick={(e) => handleAdd(e)}>
                                            {id ? "update" : "add new"}
                                          </button>
                                        </div> 
                                        
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
    </>
  );
};

export default Add;
