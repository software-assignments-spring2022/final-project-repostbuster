import React from "react";
import "./Results.css";
import { LoremPicsum } from "react-lorem-picsum";

function Results() {
    
    // fetch random results (limit of 200 requests per day so don't leave this code on...)
    /*const results = []
    fetch('https://my.api.mockaroo.com/reverse_image.json?key=093a4150')
    .then(response => response.json())
    .then(function (result) {
        for (var i = 0; i < result.length; i++) {
        results.push(result[i])
        }
    })
    .catch(error => console.log('error', error));
    */

    const results = [{
        "source": "Alphazap",
        "date": "01/21/2022",
        "link": "soup.io"
      }, {
        "source": "Namfix",
        "date": "02/16/2022",
        "link": "feedburner.com"
      }, {
        "source": "Holdlamis",
        "date": "05/15/2021",
        "link": "ucoz.com"
      }, {
        "source": "Namfix",
        "date": "03/22/2021",
        "link": "patch.com"
      }, {
        "source": "Subin",
        "date": "12/04/2021",
        "link": "narod.ru"
      }, {
        "source": "Viva",
        "date": "06/30/2021",
        "link": "blogspot.com"
      }, {
        "source": "Cardify",
        "date": "08/07/2021",
        "link": "mozilla.org"
      }, {
        "source": "Temp",
        "date": "02/25/2022",
        "link": "un.org"
      }, {
        "source": "Sonair",
        "date": "03/20/2021",
        "link": "google.com"
      }, {
        "source": "Temp",
        "date": "03/17/2021",
        "link": "webeden.co.uk"
      }
    ];

    for (var i = 0; i < results.length; i++) {
       console.log(results[i])
    }
    

    return (
        <div className="container">
            <div className="original">
                <h3>Original Image</h3>
                <LoremPicsum width={175} height={175} />
            </div>

            <h3>Found Matches</h3>
            <div className="result-container">
                {results && results.map(result =>
                    <div className="result" key={result.id}>
                        <div className="result-image">
                        <img src="https://picsum.photos/150/150" Image1 alt="Logo" random={1}/>
                        </div>
                        <div className="details">
                            <p>{result.source}</p>
                            <p>{result.date}</p>
                            <a href={"//" + result.link}>Go to Image</a>
                        </div>
                    </div>
                )}
            </div>

            <button className="download">Download Results</button>
        </div>
    )
}

export default Results;




