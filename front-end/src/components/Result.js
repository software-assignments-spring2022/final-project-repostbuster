import React, { useEffect, useState } from "react";
import "../styles.css";

function Result(props) {
    const { image, url, pageTitle, fullMatchingImages } = props.data;
    // change picsum random image to props.image
    // change link to actual link

    // remove unicode characters
    var cleanTitle = pageTitle.replaceAll("/", "");
    cleanTitle = cleanTitle.replaceAll("\u003cb\u003e", "");

    return (
        <div className="result" key={props.link}>
            <div className="result-image">
                <img
                    /*src="https://picsum.photos/150/150"*/
                    src="http://localhost:3000/public/uploaded_image.png"
                    Image1
                    alt={props.source}
                    random={1}
                    width={175} height={175}
                />
            </div>
            <div className="details">
                <p>{cleanTitle}</p>
                <a href={url}>Go to Image</a>
            </div>
        </div>
    );
}

export default Result;
