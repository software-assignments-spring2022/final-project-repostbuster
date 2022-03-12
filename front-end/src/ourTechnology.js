import "./ourTechnology.css"

const ourTechnology = () => {
    return (
        <div className="content-wrapper">
            <section>
                <h1>The Google Images API</h1>
                <p>
                    How does our code work? Our code is powered by the Google Programmable Search Engine API. This
                functions similarly to the Google Search by Image API, which allows users to drag and drop an image
                into the Google Image search bar and find similar images or other copies of the image online. The Google
                Reverse Image search API was deprecated in 2010, so we instead are using the Custom Search JSON API
                </p>
            </section>
            <section>
                <h1>Custom Search JSON API</h1>
                <p>
                    The Google Custom Search JSON API allows applications to tap into the powerful Google image search
                    engine to garner either web search or image search results in a JSON file format, utilizing the
                    RESTful request API.
                </p>
            </section>
            <section>
                <h1>Privacy Policy</h1>
                <p>

                </p>
            </section>
        </div>
    );
}

export default ourTechnology;
