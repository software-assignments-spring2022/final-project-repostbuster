import axios from 'axios';
import React from "react";
import "./styles.css";

const Login = () =>{
    const [formValue, setformValue] = React.useState({
        email: '',
        password: ''
      });

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
        
    };

      const handleSubmit = async (event) => {
        event.preventDefault();
        // store the states in the form data
        const loginFormData = new FormData();
        loginFormData.append("email", formValue.email)
        loginFormData.append("password", formValue.password)
        const data = {...formValue};
        console.log(loginFormData.getAll("email"));
          // make axios post request
        await axios.post("http://localhost:3001/login", data, {
            headers: {
                'Content-Type': 'application/json'
            }
          }).then((res) => {
                console.log(res);
                
            }).catch((error) => {
                console.log(error);
            });
          
    };
    
    return (
        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                <input onChange={handleChange} name= "email" type="email" id="form2Example1" className="form-control" />
                <label className="form-label" for="form2Example1">Email address</label>
                </div>


                <div className="form-outline mb-4">
                <input onChange={handleChange} name="password" type="password" id="form2Example2" className="form-control" />
                <label className="form-label" for="form2Example2">Password</label>
                </div>


                <div className="row mb-4">
                <div className="col d-flex justify-content-center">

                    <div className="form-check">
                    </div>
                </div>

                </div>


                <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>


                <div class="text-center">
                <p>Not a member? <a href="/register">Register</a></p>
                </div>
            </form>

        </div>

    )
};

export default Login;
