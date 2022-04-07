
function arrayToCSV(objArray) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';

    return array.reduce((str, next) => {
        str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
        return str;
       }, str);
}

function Download ({ data }) {

    const getCSV = () => {
        // download csv of results
        //let csvContent = "data:text/csv;charset=utf-8," + results.map(e => e.join(",")).join("\n");
        //var encodedUri = encodeURI(csvContent);
        //window.open(encodedUri);

        
        // Convert Object to JSON
        var jsonObject = JSON.stringify(data);

        let csvContent = "data:text/csv;charset=utf-8," + arrayToCSV(data)
        var encodedUri = encodeURI(csvContent);
        
        var link=document.createElement('a');
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "results.csv");
        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file named "my_data.csv".
      }
    
    return (
        <button onClick={getCSV}>
            Download Results
        </button>
    )
}

export default Download;