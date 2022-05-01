import React, { useEffect, useState } from "react";
import "../styles.css";

var foundImage = "https://picsum.photos/150/150"

function Result(props) {
    const { image, url, pageTitle, fullMatchingImages, partialMatchingImages} = props.data;
    console.log(props.data);
    console.log(fullMatchingImages[0] );
    if (typeof fullMatchingImages[0] !== "undefined"){
        console.log(fullMatchingImages[0].url);
        // change picsum random image to props.image
        // change link to actual link
    
        // remove unicode characters
        var cleanTitle = pageTitle.replaceAll("/", "");
        cleanTitle = cleanTitle.replaceAll("\u003cb\u003e", "");
        foundImage = fullMatchingImages[0].url
    }

    else if (typeof partialMatchingImages[0] !== "undefined"){
        console.log(partialMatchingImages[0].url);
        // change picsum random image to props.image
        // change link to actual link
    
        // remove unicode characters
        var cleanTitle = pageTitle.replaceAll("/", "");
        cleanTitle = cleanTitle.replaceAll("\u003cb\u003e", "");
        foundImage = partialMatchingImages[0].url
    }
    
    return (
        <div className="result" key={props.link}>
            <div className="result-image">
                
                <img
                    //src="https://picsum.photos/150/150"
                    //src="http://localhost:3000/public/uploaded_image.png"
                    src = {foundImage}
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
