import React, { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
import "../styles.css";
import styled from "styled-components";
//import 'bootstrap/dist/css/bootstrap.min.css';

const Home = (props) => {
    const [image, setImage] = useState(null);

    const Button = styled.button`
        background: ${(props) => (props.primary ? "palevioletred" : "white")};
        color: ${(props) => (props.primary ? "white" : "palevioletred")};

        font-size: 1em;
        margin: 1em;
        padding: 0.25em 1em;
        border: 2px solid palevioletred;
        border-radius: 3px;
    `;

    const handleClick = () => {
        axios.post("http://localhost:3000/home", image).then((res) => {
            console.log("Axios response ", res);
        });
    };

    const handleFileInput = (e) => {
        console.log("handleFileInput working");
        console.log(e.target.files[0]);

        const formData = new FormData();

        formData.append("image", e.target.files[0], e.target.files[0].name);
        setImage(formData);
    };

    return (
        <div className="homeContent">
            <div>
                <h1>Reverse Image Search</h1>
                <p>
                    {" "}
                    A tool that uses pictures to find pictures on the internet
                </p>
                <p></p>
                <Button variant="secondary" size="lg" href="HowItWorks">
                    Learn how it works!
                </Button>
            </div>

            <form
                action="http://localhost:3000/home"
                method="POST"
                enctype="multipart/form-data"
            >
                <div>
                    <label for="image">Upload Image</label>
                    <input
                        /*onChange={handleFileInput} */ type="file"
                        id="image"
                        name="image"
                        required
                    ></input>
                </div>
                <div>
                    {/* <button type="submit">Submit</button> */}
                    <Button>Upload a file</Button>
                    <input type="file" style={{ display: "none" }} />
                </div>
            </form>
        </div>
    );
};

export default Home;
