import React, { useEffect, useState } from "react";
import "./Results.css";

function Result (props) {
    const { image, url, pageTitle, fullMatchingImages } = props.data;
    // change picsum random image to props.image
    // change link to actual link

    // remove unicode characters
    var cleanTitle = pageTitle.replaceAll("\/", "");
    cleanTitle = cleanTitle.replaceAll("\u003cb\u003e", "");


    return (
        <div className="result" key={props.link}>
            <div className="result-image">
            <img src="https://picsum.photos/150/150" Image1 alt={props.source} random={1}/>
            </div>
            <div className="details">
                <p>{cleanTitle}</p>
                <a href={url}>Go to Image</a>
            </div>
        </div>
    )
}

export default Result;