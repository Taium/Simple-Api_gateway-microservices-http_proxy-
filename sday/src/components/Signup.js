import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';



const Signup = () => {
  let navigate = useNavigate();

    const [data, setData] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(email, password);
  
 

 const signup = async  (e)=>{
    
  e.preventDefault();
  let resValue;
  await axios.post(`http://localhost:5000/signup`, 
  {email:email , password:password})
  .then((response) => {
              console.log(response);
              setData(response.data);
               alert(response.data.message)
               navigate("/login");
        });
        
        
    
        

 }
    return (
      <>
       
        <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                
                                     {
                                      data.message
                                    }
                                
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Email: </label>
                                            <input value={email} className="form-control" placeholder="Email" name="email" onChange={e => setEmail(e.target.value)} />
                                            
                                        </div>
                                        <div className = "form-group">
                                            <label> Password: </label>
                                            <input value={password} className="form-control" placeholder="Password"  name="password" onChange={e => setPassword(e.target.value)} />
                                            
                                        </div>
                                        
                                        
                                        <button className="btn btn-danger" onClick={(e)=>signup(e)}> signup</button>
                                         
                                        

                                        
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
        
        </>
    );
};

export default Signup;