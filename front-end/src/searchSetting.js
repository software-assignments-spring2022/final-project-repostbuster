import "./styles.css";
import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
} from "react";
import axios from "axios";
import {useNavigate, Navigate, Link, useSearchParams, useParams } from "react-router-dom";
import { ReactDom, render } from "react-dom";
import DatePicker from "./DatePicker";

const SearchSetting = (props) => {
    const [image, setImage] = useState();
    const [checkedOne, setCheckedOne] = useState(false);
    const [checkedTwo, setCheckedTwo] = useState(false);
    const [checkedThree, setCheckedThree] = useState(false);
    const [checkedFour, setCheckedFour] = useState(false);

    const updateImage = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setImage(event.target.files[0]);
        }
    };

    const removeImage = (event) => {
        setImage();
    };

    const handleCheckOne = (event) => {
        setCheckedOne(!checkedOne);
    };

    const handleCheckTwo = (event) => {
        setCheckedTwo(!checkedTwo);
    };

    const handleCheckThree = (event) => {
        setCheckedThree(!checkedThree);
    };

    const handleCheckFour = (event) => {
        setCheckedFour(!checkedFour);
    };

    const Checkbox = ({ label, value, onChange }) => {
        return (
            <label>
                <input type="checkbox" checked={value} onChange={onChange} />
                {label}
            </label>
        );
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

          // make axios post request
        await axios.post("http://localhost:3000/searchSetting", {
            headers: {
                'Content-Type': 'application/json'
            }
          }).then((res) => {
                //console.log(res)
                console.log("FUCK")
                navigate('/login');
                
            }).catch((error) => {
                console.log(error);
            });
          
    };

    return (
        <div class="homeContent">
            <header className="navbar">

                <div className="navbar__title navbar__item"> Search Settings</div>

                {/* <section> */}
                {/* {imageFile.map((item) => (
                        <p> {item.name}</p>
                    ))} */}
                {/* {imageFile[0].name}
                </section> */}

                {/* Click submit --> redirect to searchSetting */}
                {/* Give the image & file name to searchSetting */}
                {/*
                <a
                    class="btn btn-primary navbar__item_right"
                    href="results"
                    role="button">
                        Submit
                </a>
                */}
            <a
                class="btn btn-primary navbar__item_left"
                href="uploadImage"
                role="button">
                    Back
            </a>
            </header>
            
            <h2>Original Image</h2>
                <img src ="http://localhost:3000/public/uploaded_image.png" width={175} height={175}/>

            <form action="http://localhost:3000/searchSetting" method="POST" enctype="multipart/form-data">
                <div className="container">

                    {image && (
                        <div className="preview">
                            <img
                                className="image"
                                src={URL.createObjectURL(image)}
                                alt="Thumb"
                            />
                            <button className="delete" onClick={removeImage}>
                                Remove This Image
                            </button>
                        </div>
                    )}
                    {/*<DatePicker />*/}
                    <div>
                        {/* <label>
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={handleCheck}
                            />
                            My Value
                            <p>is "My Value" checked? {checked.toString()}</p>
                        </label> */}
                        <li className="checkOption">
                            <Checkbox
                                label="Select One"
                                value={checkedOne}
                                onChange={handleCheckOne}
                            />
                            <Checkbox
                                label="Select Two"
                                value={checkedTwo}
                                onChange={handleCheckTwo}
                            />
                            <Checkbox
                                label="Select Three"
                                value={checkedThree}
                                onChange={handleCheckThree}
                            />
                            <Checkbox
                                label="Select Four"
                                value={checkedFour}
                                onChange={handleCheckFour}
                            />
                            <button type="submit">Submit</button>
                        </li>
                    </div>
                </div>
            </form>
            
        </div>

    );
};

export default SearchSetting;
