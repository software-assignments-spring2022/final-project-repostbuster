import React, { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
import "../styles.css"
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

        //console.log(fileUploaded);
        //detectWeb("test");
        //props.handleFile(fileUploaded);
    }; */

    const [image, setImage] = useState(null);
    /* const [error, setError] = useState("");
    const [loaded, setLoad] = useState(false);
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(); */

    const handleClick = () => {
        axios.post("http://localhost:3000/image-upload", image).then((res) => {
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

    /*  -------------------------------------------------- Attempt 2
     // function to handle the selected file
    const uploadHandler = async (event) => {
        event.preventDefault();

        // Send the file and description to the server

        // create an instance of FormData
        const data = new FormData();

        // just append all of the data that want to send to the object
        data.append("image", file);
        data.append("description", description);

        // send to server with FormData object
        const result = await axios.post("/home", data, {
            headers: { "Content-Type": "multipart/form-data" }, // let server knows the kind of data sending
        });

        console.log(result.data);
        setImage(result.data.imagePath);

    }; --------------------------------------------------
     */

    /* -------------------------------------------Attempt 1
    // appending the file
    data.append("image", event.target.files[0]);
    // see the file details
    console.log(event.target.files[0]);

      axios
        .post("/home", data)
        .then((res) => {
            // res.data --> object with details about the file that was saved
            const imgList = [res.data, ...images];
            setImage(imgList); // add object to a 'images' array
        })
        .catch((err) => {
            console.log("ERROR!!!!!!!");
            setError(err);
        })
        .finally(() => {
            // The response has been received... so remove loading icon
            setLoad(true);
        });
        -------------------------------------------*/

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

            <form action="http://localhost:3000/home" method="POST" enctype="multipart/form-data">
                <div>
                    <label for="name">Image Title</label>
                    <input type="text" id="name"name="name" required></input>
                </div>
                <div>
                    <label for="desc">Image Description</label>
                    <textarea id="desc" name="desc" rows="2" 
                             required>
                    </textarea>
                </div>
                <div>
                    <label for="image">Upload Image</label>
                    <input type="file" id="image" 
                        name="image" required></input>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>

            <h1>Uploaded Images</h1>
        
        </div>
            

    );
};

export default Home;
