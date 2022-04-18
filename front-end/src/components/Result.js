import React, { useEffect, useState } from "react";

function Result (props) {
    const { image, description, score, link } = props.data;
    // change picsum random image to props.image
    // change link to actual link
    return (
        <div className="result" key={props.link}>
            <div className="result-image">
            <img src="https://picsum.photos/150/150" Image1 alt={props.source} random={1}/>
            </div>
            <div className="details">
                <p>{description}</p>
                <p>{score}</p>
                <a href={link}>Go to Image</a>
            </div>
        </div>
    )
}

export default Result;
