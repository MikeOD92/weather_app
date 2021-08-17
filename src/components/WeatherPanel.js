import '../App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { WiFahrenheit } from "react-icons/wi";
import { MdRemoveRedEye, MdSave, MdSearch, MdViewHeadline} from "react-icons/md";



export default function WeatherPanel(props){

    const deleteSaved = (e) => {
        // e.preventDefault();
        console.log(props.weatherData.name);
        // console.log(props.saved)
        let listArr = props.saved.split(',');
        let del = listArr.indexOf(props.weatherData.name)
        listArr.splice(del, 1)

        const newSaved = listArr.join()

        localStorage.setItem('savedWeather', newSaved )

        props.setSaved(newSaved);
        
    }
    return(
        <div className="weather-tile">
            <div className="weather-head">
                <h2 className="loc"> {props.weatherData? `${props.weatherData.name}, ${props.weatherData.sys.country}` : ''} </h2>
                <p className="cords">{props.weatherData? `Lat: ${props.weatherData.coord.lat}, Lon: ${props.weatherData.coord.lon}`:''}</p>
                <h3 className="temp"> {props.weatherData? `${props.weatherData.main.temp}` : ''}<WiFahrenheit/></h3>
                <p> {props.weatherData? `feels like: ${props.weatherData.main.feels_like} `: ''}<WiFahrenheit/></p>
                <p className="condition"> {props.weatherData? `${props.weatherData.weather[0].description}` : ''}</p>
            </div>
            <div className="details">
                <p> {props.weatherData? `high: ${props.weatherData.main.temp_max} | low: ${props.weatherData.main.temp_min}`: ''}</p>
                <p> {props.weatherData? `humidity: ${props.weatherData.main.humidity}%`: ''}</p>
                <p> {props.weatherData? `wind: ${props.weatherData.wind.deg} deg  at ${props.weatherData.wind.speed}mph`: ''}</p>
                {props.saved.includes(props.weatherData.name)? <button className='btn btn-info' onClick={deleteSaved}>Delete</button>: ''}
            </div>
        </div>
    )
}