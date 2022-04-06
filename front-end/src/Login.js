
import "./Login.css";

const Login = () =>{
    return (
        <div className="formContainer">
            <form action="/login" method="POST">
                <div class="form-outline mb-4">
                <input type="email" id="form2Example1" class="form-control" />
                <label class="form-label" for="form2Example1">Email address</label>
                </div>
            
                
                <div class="form-outline mb-4">
                <input type="password" id="form2Example2" class="form-control" />
                <label class="form-label" for="form2Example2">Password</label>
                </div>
            
                
                <div class="row mb-4">
                <div class="col d-flex justify-content-center">
                
                    <div class="form-check">
                    </div>
                </div>
            
                </div>
            
                
                <button type="submit"class="btn btn-primary btn-block mb-4">Sign in</button>
            
            
                <div class="text-center">
                <p>Not a member? <a href="/register">Register</a></p>
                </div>
            </form>
            
        </div>
        
    )
};

export default Login;