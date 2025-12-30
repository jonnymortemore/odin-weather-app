import "./styles.css" // all css files need to be imported into js

//To import images using JS, import as any file: import odinImage from "./odin.png";

/* https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/melbourne?
  unitGroup=us
  &include=days
  &key=YOUR_API_KEY
  &contentType=json
*/

const API_KEY = "7SNA3APJGQ2MGH23XEHQABXQ3"
const URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
const UNIT_GROUP = "metric"
const INCLUDE = "current"

function getWeatherData(location) {
    const fetchURL = `${URL}${location}?unitGroup=${UNIT_GROUP}&include=${INCLUDE}&key=${API_KEY}&contentType=json`

    fetch(fetchURL)
    .then(response => {
	    return response.json();
    })
    .then(data => {
        return console.log(data)
    })
    .catch(error => console.log(error));
}

console.log(getWeatherData("Melbourne"));