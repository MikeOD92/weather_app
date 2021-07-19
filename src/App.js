import './App.css';
import React from 'react';
import { useEffect, useState, useRef } from 'react';
import WeatherPanel from './components/WeatherPanel';
import SavedLocals from './components/SavedLocals';

require('dotenv').config();

function App() {

  const localInput = useRef('');

  const [ location, setLocation ] = useState('');
  const [ weather, setWeather ] = useState({});
  const [ saved, setSaved ] = useState(localStorage.getItem('savedWeather')||[]);

  
  useEffect(() => {
    //let regEx = /1-9/ ;
    const call = async () => {
      /// can add ? here to see if location is letters or numbers use an regEX 
      // use proper  api url for zip , city name, etc. 
      
      // if(location.search(regEx) > 0){
      //   console.log('okaie dokie')
      // }
      try{
        // console.log(location)
        const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`;
        const response = await fetch(queryURL);
        const data = await response.json();
        await setWeather(data);
        await console.log(weather)
        await console.log(queryURL)
      }catch(err){
        console.error(err);
      } 
    }
    call();
  }, [location])

  const searchLocal = (e) => {
    e.preventDefault();
    setLocation(localInput.current.value);
  }

  const saveLocal = (e) => {
    e.preventDefault();
    if(localInput.current.value !== '' && saved.includes(localInput.current.value) === false){
      setSaved( saved => [saved,localInput.current.value ])
      localStorage.setItem('savedWeather', saved.toString() )
    }else {
      console.log('this is either am empty string or being repeted')
    }
    
      /// when we save a location it doesn't like to update immeditly, 
      // and it seems to take the location we had in previouslty
  }
  
return(
  <div> 
    <h1> Weather app</h1>
    <form onSubmit={searchLocal}>
      <input ref={localInput} type="string"/>
      <input type="submit"/>
    </form> 
    <button onClick={saveLocal}>SAVE</button>
      <div>
      { weather.name? <WeatherPanel weatherData={weather}/> : ''}
      </div>
      <div> 
        {localStorage.getItem('savedWeather')? <SavedLocals location={location} setLocation={setLocation}/>: ""}
      </div>

  </div>
)
}

export default App;
