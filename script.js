window.addEventListener("load", () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
        console.log(long, lat);


        const url = `https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${long}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '91512d22a5msh9342f32e67a4fb7p11f303jsnc1277fbdc8fe',
                'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            UpdateWeatherUI(result);
        } catch (error) {
            console.error(error);
        }
    })
})


const btn = document.getElementById("searchBtn")
btn.addEventListener("click", async () => {

    const cityName = document.getElementsByName("cityName")[0].value;
    const url = `https://open-weather13.p.rapidapi.com/city/${cityName}`;


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '91512d22a5msh9342f32e67a4fb7p11f303jsnc1277fbdc8fe',
            'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
        }
    };

    try {
        isLoading = true;
        isLoading ? btn.innerHTML="Loading..." : btn.innerHTML = "Search"
        const response = await fetch(url, options);
        const result = await response.json();

        UpdateWeatherUI(result);
        isLoading = false;
        isLoading ? btn.innerHTML="Loading..." : btn.innerHTML = "Search"


    } catch (error) {
        console.error(error);
    }
    finally{
        isLoading = false;
        isLoading ? btn.innerHTML="Loading..." : btn.innerHTML = "Search"


    }

})

const farenhitetoCelcius = (f) => {
    return (f - 32) * 5 / 9;

}
const convertoCelcius = (unit) =>{
    if(unit=="k") {
        return kelvintoCelcius(unit);
    }
    else if (unit=="f"){
        return farenhitetoCelcius(unit);
    }
}
const kelvintoCelcius = (k) =>{
    return k-273.15;
}
const UpdateWeatherUI = (data, unit) => {

    // *temperature
    const temperature = document.getElementById("temperature");
    temperature.innerHTML = convertoCelcius(data.main.temp, unit).toFixed(2) + "°C";

    // *feelsLike
    const feels_like = document.getElementById("feelsLikeTemperature");
    feels_like.innerHTML = `Feels like: ${convertoCelcius(data.main.feels_like, unit).toFixed(2) + "°C"}`

    // *Minimum
    const minimum = document.getElementById("minimum");
    minimum.innerHTML = `Min: ${convertoCelcius(data.main.temp_min, unit).toFixed(2) + "°C"}`;


    // *Maximum
    const Maximum = document.getElementById("maximum");
    Maximum.innerHTML = `Max: ${convertoCelcius(data.main.temp_max, unit).toFixed(2) + "°C"}`


    // *Atmospheric Pressure
    const pressure = document.getElementById("pressure");
    pressure.innerHTML = `pressure: ${data.main.pressure}`

    // *Visibility
    const visibility = document.getElementById("visibility");
    visibility.innerHTML = `Visibility: ${data.visibility}`

    // *Wind Speed
    const windSpeed = document.getElementById("windSpeed");
    windSpeed.innerHTML = `Wind Speed: ${data.wind.speed}`

    // *Humidity
    const humidity = document.getElementById("humidity");
    humidity.innerHTML = `Humidity: ${data.main.humidity}`
}

