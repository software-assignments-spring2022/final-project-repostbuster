import "./searchSetting.css";
import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
} from "react";
// import axios from "axios";
import { Navigate, Link, useSearchParams, useParams } from "react-router-dom";
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

    return (
        // <article >
        //     <p>Search Settings</p>
        //     <h1>heading</h1>
        // </article>

        <div className="container">
            <input accept="image/*" type="file" onChange={updateImage} />

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
            <DatePicker />
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
            {/* <Try /> */}
        </div>
    );
};

export default SearchSetting;
