import "./styles.css";
import axios from 'axios';
import React from "react";
import {useNavigate, Navigate } from 'react-router';

const Registration = () =>{

    const navigate = useNavigate();
    const [formValue, setformValue] = React.useState({
        email: '',
        password: '',
        name:'',
        username:'',
      });
    const [warning, setWarning] = React.useState({state: false, msg: ''});
    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
        
    };

      const handleSubmit = async (event) => {
        event.preventDefault();
        // store the states in the form data
        const data = {...formValue};
          // make axios post request
        await axios.post("/register", data, {
            headers: {
                'Content-Type': 'application/json'
            }
          }).then((res) => {
                console.log(res)
                navigate('/login');
                
            }).catch((error) => {
                console.log(error);
                setWarning({state: true, msg: error.response.data.errorMessage});
            });
          
    };
    
    return (
        
        <div className="formContainer">
            {warning.state ? 
                        <div class="alert alert-danger" role="alert">
                            {warning.msg}
                        </div>
                    : ''}
            <form onSubmit={handleSubmit}>
                <div class="form-outline mb-4">
                    <input  onChange={handleChange}  name= "name" type="text" id="registerName" class="form-control" />
                    <label class="form-label" for="registerName">Name</label>
                </div>


                <div class="form-outline mb-4">
                    <input  onChange={handleChange}  name= "username" type="text" id="registerUsername" class="form-control" />
                    <label class="form-label" for="registerUsername">Username</label>
                </div>


                <div class="form-outline mb-4">
                    <input onChange={handleChange} name= "email" type="email" id="registerEmail" class="form-control" />
                    <label class="form-label" for="registerEmail">Email</label>
                </div>


                <div class="form-outline mb-4">
                    <input  onChange={handleChange}  name="password" type="password" id="registerPassword" class="form-control" />
                    <label class="form-label" for="registerPassword">Password</label>
                </div>

                <div class="form-check d-flex justify-content-center mb-4">
                    <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
                    aria-describedby="registerCheckHelpText" />
                    <label class="form-check-label" for="registerCheck">
                    I have read and agree to the terms
                    </label>
                </div>
                <button type="submit" class="btn btn-primary btn-block mb-4">Sign Up</button>
            </form>
        </div>
    )
};

export default Registration;
