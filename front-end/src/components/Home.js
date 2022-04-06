import React, { useRef, useState, useEffect } from "react";
import "./Home.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
//import 'bootstrap/dist/css/bootstrap.min.css';

const Home = (props) => {
    /* // Reference to original input element
    const hiddenFileInput = React.useRef(null);

    // Adds input functionality to desired element
    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };
    // Function to handle the user selected file
    const handleChange = (event) => {
        const fileUploaded = event.target.files[0];
        //props.handleFile(fileUploaded);
    }; */

    const [image, setImage] = useState([]);
    const [error, setError] = userState("");

    // function to handle the selected file
    const uploadHandler = (event) => {
        // create an instance of FormData
        const data = new FormData();

        // appending the file
        data.append("file", event.target.files[0]);
        // see the file details
        console.log(event.target.files[0]);

        axios
            .post("/uploadImage", data)
            .then((res) => {
                setImage(res.data);
            })
            .catch((err) => {
                console.log("ERROR!!!!!!!");
                setError(err);
            });
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
            <div></div>

            <div id="ImageUploadButton">
                {/* <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange} // File Explorer pops up
                    style={{ display: "none" }}
                /> */}

                {/* button  */}
                <input
                    type="file"
                    name="imageFile"
                    onChange={this.uploadHandler}
                />

                <Button
                    class="uploadImageBtn"
                    href="uploadImage"
                    variant="primary"
                    size="lg"
                    onClick={handleClick} // to /uploadImage
                >
                    Upload an Image
                </Button>
            </div>

            <InputGroup className="mb-3">
                <FormControl
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1"
                    placeholder="Enter Image URL..."
                />

                <Button variant="outline-secondary" id="button-addon1">
                    Search
                </Button>
            </InputGroup>
        </div>
    );
};

export default Home;
