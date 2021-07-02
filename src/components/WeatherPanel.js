import '../App.css';
import React from 'react';

export default function WeatherPanel(props){
    return(
        <div>
            <p> {props.data.name? props.data.name : ''}</p>
            <p> {props.data.main? props.data.main.temp : ''} F</p>
            <p> {props.data.weather? props.data.weather : ''}</p>
        </div>
    )
}