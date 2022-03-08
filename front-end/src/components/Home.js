import React, { useRef } from 'react';
import './Home.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
//import 'bootstrap/dist/css/bootstrap.min.css';



const  Home = props => {

    // Reference to original input element
    const hiddenFileInput = React.useRef(null);
    
    // Adds input functionality to desired element
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    // Function to handle the user selected file
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        props.handleFile(fileUploaded);
    };

    return (
        <div className="homeContent">
            <div id="ImageUploadButton">
                <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    style={{display: 'none'}}
                />
                <Button variant="primary" size="lg" onClick={handleClick}>
                    Upload an Image
                </Button>
            </div>
            
            <InputGroup className="mb-3">
                
                <FormControl
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                placeholder= "Enter Image URL..."
                />
                
                <Button variant="outline-secondary" id="button-addon1">
                Search
                </Button>
            </InputGroup>
            
            
                

                
        </div>
        
        
    );
}

export default Home;