import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'

const WeatherView = ({lat, lon}) => {
    const api_key = import.meta.env.VITE_OPENWTHR_API_KEY

    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
            .then(response => {
                console.log(response.data)
                setWeatherData(response.data)
            }) 
    }, [])

    if(!weatherData){
        return null
    }

    return (
        <>
            temperature {weatherData.main.temp} Celcius <br />
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather Icon" />
            <br />
            wind {weatherData.wind.speed} m/s
        </>
    )

}

export default WeatherView