import '../App.css';
import React from 'react';

export default function WeatherPanel(props){


    return(
        <div className="weather-tile">
            <div className="weather-head">
                <h2> {props.weatherData? `${props.weatherData.name}, ${props.weatherData.sys.country}` : ''}</h2>
                <p>{props.weatherData? `Lat: ${props.weatherData.coord.lat}, Lon: ${props.weatherData.coord.lon}`:''}</p>
                <h3> {props.weatherData? `${props.weatherData.main.temp} F` : ''}</h3>
                <p> {props.weatherData? `feels like: ${props.weatherData.main.feels_like} F`: ''}</p>
                <p> {props.weatherData? `${props.weatherData.weather[0].description}` : ''}</p>
            </div>
            <div className="deatails">
                <p> {props.weatherData? `high: ${props.weatherData.main.temp_max} | low: ${props.weatherData.main.temp_min}`: ''}</p>
                <p> {props.weatherData? `humidity: ${props.weatherData.main.humidity}%`: ''}</p>
                <p> {props.weatherData? `wind: ${props.weatherData.wind.deg} deg  at ${props.weatherData.wind.speed}mph`: ''}</p>
            </div>

        </div>
    )
}