import "./styles.css";

const Registration = () =>{
    return (
        <div className="formContainer">
            <form  action="http://localhost:3001/register" method="POST">
                <div class="form-outline mb-4">
                    <input name= "name" type="text" id="registerName" class="form-control" />
                    <label class="form-label" for="registerName">Name</label>
                </div>


                <div class="form-outline mb-4">
                    <input name= "username" type="text" id="registerUsername" class="form-control" />
                    <label class="form-label" for="registerUsername">Username</label>
                </div>


                <div class="form-outline mb-4">
                    <input name= "email" type="email" id="registerEmail" class="form-control" />
                    <label class="form-label" for="registerEmail">Email</label>
                </div>


                <div class="form-outline mb-4">
                    <input name="password" type="password" id="registerPassword" class="form-control" />
                    <label class="form-label" for="registerPassword">Password</label>
                </div>


                <div class="form-outline mb-4">
                    <input name="repeatPassword" type="password" id="registerRepeatPassword" class="form-control" />
                    <label class="form-label" for="registerRepeatPassword">Repeat password</label>
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
