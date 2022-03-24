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
                    https://developers.google.com/custom-search/v1/overview
                </p>
            </section>
            <section>
                <h2>Setting up the API</h2>
                <p>
                    For starters, in order to use the Programmable Search Engine, you must make a API key, to interace
                    with Google's cloud computing service. Users are able to create a free level of the API key, which
                    permits up to 100 searches a day, and it can then be scaled up from there to permit more searches
                    on paid tiers.
                </p>
            </section>
            <section>
                <h2>API Operations</h2>
                <p>
                    The Programmable Search operations features relatively simple operations, with only the "list" call,
                    which returns the search results. The returned data is in the form of JSON, which includes search
                    metadata, PSE metadata, and the actual search results.
                </p>
            </section>
        </div>
    );
}

export default ourTechnology;
