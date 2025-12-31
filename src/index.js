import "./styles.css" // all css files need to be imported into js

//To import images using JS, import as any file: import odinImage from "./odin.png";

/* https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/melbourne?
  unitGroup=us
  &include=days
  &key=YOUR_API_KEY
  &contentType=json
*/


class WeatherAppController {

    API_KEY = "7SNA3APJGQ2MGH23XEHQABXQ3"
    URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
    UNIT_GROUP = "metric"
    INCLUDE = "current"

    conditionColors = {
        "Overcast": "#72797bff",
        "Clear": "#78c0d6ff"
    }

    constructor(location) {
        this.processNewRequest(location)
    }

    async processNewRequest(location) {
        this.updateWeatherLocation(location)
        this.weatherJson = await this.fetchWeatherJson()
        this.displayWeatherData()
    }

    async fetchWeatherJson() {
        const fetchURL = `${this.URL}${this.location}?unitGroup=${this.UNIT_GROUP}&include=${this.INCLUDE}&key=${this.API_KEY}&contentType=json`
        const response = await fetch(fetchURL)
        const data = await response.json()
        return data
    }

    displayWeatherData() {
        const conditions = this.weatherJson.currentConditions.conditions;
        document.querySelector('body').style.backgroundColor = this.conditionColors[conditions];
        document.querySelector('.location').innerText = this.weatherJson.address;
        document.querySelector('.weather-data').querySelectorAll("*").forEach((el) => {
            const dataName = el.dataset.type;
            const dataPoint = this.weatherJson.currentConditions[dataName];
            el.innerText = `${dataPoint}${el.dataset.end}` 
        })
    }

    updateWeatherLocation(newLocation) {
        this.location = newLocation
    }

    set location(value) {
        this._location = value
    }

    get location() {
        return this._location
    }

}



console.log(new WeatherAppController("Melbourne"));