import React from "react";
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

function Home() {
    return (
        <div>
            <a>THIS IS SOME TEST TEXT LOL THIS IS THE HOME PAGE</a>
            <div className="d-grid gap-2">
                <Button variant="primary" size="lg">
                    Upload an Image
                </Button>
            </div>
            <InputGroup className="mb-3">
                <FormControl
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                placeholder = "Enter Image URL..."
                />
                <Button variant="outline-secondary" id="button-addon1">
                Search
                </Button>
            </InputGroup>
            
            
        </div>
        
        
        
    );
}

export default Home;