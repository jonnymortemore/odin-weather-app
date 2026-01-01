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
        "Clear": "#78c0d6ff",
        "Partially cloudy": "#91b0b9ff",
        "Rain": "#3e6fd1ff",
        "Snow": "#edeef1ff"
    }

    constructor(location) {
        this.setupFormButtons()
        this.processNewRequest(location)
    }

    async processNewRequest(location) {
        this.updateWeatherLocation(location)
        this.clearDisplayedData()
        this.weatherJson = await this.fetchWeatherJson()
        this.displayWeatherData()
    }

    async fetchWeatherJson() {
        try {
            const fetchURL = `${this.URL}${this.location}?unitGroup=${this.UNIT_GROUP}&include=${this.INCLUDE}&key=${this.API_KEY}&contentType=json`
            const response = await fetch(fetchURL)
            const data = await response.json()
            return data
        }
        catch(error) {
            console.log(error)
            return this.weatherJson
        }
    }

    setupFormButtons() {
       const form =  document.querySelector('form');
       form.addEventListener('submit', (event) => {
        event.preventDefault();
        const FormObj = new FormData(event.target);
        const data = Object.fromEntries(FormObj.entries());
        this.processNewRequest(data.city);
       });
       const formInput = document.querySelector('#city')
       formInput.addEventListener('input', () => {
        if (formInput.validity.patternMismatch) {
            formInput.setCustomValidity("A City name must contain letters only.")
        } else {
            formInput.setCustomValidity("")
        }
        
       }) 
    }

    clearDisplayedData() {
        document.querySelector('.loader').hidden = false;
        document.querySelector('.weather-data').hidden = true;
        document.querySelector('.location').hidden = true;
    }

    displayWeatherData() {
        const conditions = this.weatherJson.currentConditions.conditions.split(", ");
        document.querySelector('.weather-data').hidden = false;
        const location = document.querySelector('.location')
        location.hidden = false;
        location.innerText = this.weatherJson.address;
        document.querySelector('body').style.backgroundColor = this.conditionColors[conditions[0]];
        document.querySelector('.weather-data').querySelectorAll("*").forEach((el) => {
            const dataName = el.dataset.type;
            const dataPoint = this.weatherJson.currentConditions[dataName];
            el.innerText = `${dataPoint}${el.dataset.end}` 
        })
        document.querySelector('.loader').hidden = true;
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