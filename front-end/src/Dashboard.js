import axios from "axios";
import React from "react";
import "./dashboardStyle.css"
import {useNavigate, Navigate } from 'react-router';


const Dashboard = ({setUser}) => {
    // [authenticated, setAuthenticated] = React.useState(false);
    const [info, setInfo] = React.useState(null);
    const [warning, setWarning] = React.useState({state: false, msg: ''});
    const [formValue, setformValue] = React.useState({
        username:'',
        email: '',
        oldPass: '',
        newPass:'',
        confPass:'',
        whitelist:'',
      });

     

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
        
    };

    const checkData = () => {
        if(formValue.newPass != formValue.confPass){
            setWarning({state: true, msg: 'Please make sure new password matches'})
            return false;
        }

        if(formValue.whitelist == ''){
            setformValue({...formValue, whitelist: null});
            console.log(formValue);
        }

        return true;
    };

    const handleSubmit = async (event) => {
        // store the states in the form data
        event.preventDefault();
        if(checkData()){
            setWarning({state:false, msg:''});
            const data = {...formValue};
            // make axios post request
          await axios.post("http://localhost:3000/dashboard", data, {
              headers: {
                  'Content-Type': 'application/json',
                  'token' :  JSON.parse(localStorage.getItem('user')).accessToken,
              }
            }).then((res) => {
                  localStorage.removeItem('user');
                  localStorage.setItem('user', JSON.stringify({name: res.data.username, accessToken: res.data.token}));
                  setInfo(JSON.parse(localStorage.getItem('user')).name);
                  setUser(JSON.parse(localStorage.getItem('user')));
  
              }).catch((error) => {
                  console.log(error);
              });
        }
       
    };


    React.useEffect(() => {
            axios.get("http://localhost:3000/dashboard", { 
                headers: { 
                    'token': JSON.parse(localStorage.getItem('user')).accessToken,
                }
            })
            .then((res) => {
                console.log(res.data);
                setInfo(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
           
    }, []);

   

  
    return (
            <div class="container">
                <div class="row justify-content-center">
                    {warning.state ? 
                        <div class="alert alert-danger" role="alert">
                            {warning.msg}
                        </div>
                    : ''}
                    <div class="col-12 col-lg-10 col-xl-8 mx-auto">
                        <h2 class="h3 mb-4 page-title">Settings</h2>
                        <div class="my-4">
                            <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false">Profile</a>
                                </li>
                            </ul>
                            <form onSubmit={handleSubmit}> 
                                <div class="row mt-5 align-items-center">
                                    <div class="col-md-3 text-center mb-5">
                                        <div class="avatar avatar-xl">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="..." class="avatar-img rounded-circle" />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="row align-items-center">
                                            <div class="col-md-7">
                                                <h4 class="mb-1">{info ? info.username: "John Doe"}</h4>
                                                <p class="small mb-3"><span class="badge badge-dark">New York, USA</span></p>
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div class="col-md-7">
                                                <p class="text-muted">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit nisl ullamcorper, rutrum metus in, congue lectus. In hac habitasse platea dictumst. Cras urna quam, malesuada vitae risus at,
                                                    pretium blandit sapien.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <div class="form-row">
                                    <div class="row mb-4">
                                        <div class="col-md-6">
                                        <div class="form-group col-md-6">
                                            <label for="username">Username</label>
                                            <input name= 'username' onChange={handleChange} type="text" id="username" class="form-control" placeholder="ex: Joe77" />
                                            
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="username">Email</label>
                                            <input  name= "email" onChange={handleChange} type="text" id="email" class="form-control" placeholder="xxx@yyy.com" />
                                            
                                        </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <hr class="my-4" />
                                
                                <div class="row mb-4">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="inputPassword4">Old Password</label>
                                            <input  name= "oldPass" onChange={handleChange} type="password" class="form-control" id="inputPassword5" />
                                        </div>
                                        <div class="form-group">
                                            <label for="inputPassword5">New Password</label>
                                            <input name= "newPass" onChange={handleChange} type="password" class="form-control" id="inputPassword5" />
                                        </div>
                                        <div class="form-group">
                                            <label for="inputPassword6">Confirm Password</label>
                                            <input  name= "confPass" onChange={handleChange} type="password" class="form-control" id="inputPassword6" />
                                        </div>   
                                    </div>
                                    <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="exampleFormControlTextarea1">Domain Whitelist</label>
                                                <textarea onChange={handleChange} id="whitelist" name="whitelist" class="form-control" rows="10"></textarea>
                                            </div>
                                        </div>
                                    <div class="col-md-6">

                                        <p class="mb-2">Password Recommendations</p>
                                        <p class="small text-muted mb-2">Recommended Guidelines for a strong password:</p>
                                        <ul class="small text-muted pl-4 mb-0">
                                            <li>Minimum 8 character</li>
                                            <li>At least one special character</li>
                                            <li>At least one number</li>
                                            <li>Can’t be the same as a previous password</li>
                                        </ul>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary">Save Change</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div> )
        
  };

  export default Dashboard;