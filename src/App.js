import 'bootstrap/dist/css/bootstrap.min.css';
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
  const [ saved, setSaved ] = useState(localStorage.getItem('savedWeather')||"");

  useEffect(() => {

    let regEx = /^[0-9]{5}(?:-[0-9]{4})?$/;

    const call = async () => {

      if(regEx.test(location)){
        try{
          const queryURL = `http://api.openweathermap.org/data/2.5/weather?zip=${location},us&units=imperial&appid=${process.env.REACT_APP_API_KEY}`;
          const response = await fetch(queryURL);
          const data = await response.json();
          await setWeather(data);
        }catch(err){
          console.error(err);
        } 
      }else{
        try{
          const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`;
          const response = await fetch(queryURL);
          const data = await response.json();
          await setWeather(data);
        }catch(err){
          console.error(err);
        } 
      }

    }
    call();
  }, [location])

  const searchLocal = (e) => {
    e.preventDefault();
    setLocation(localInput.current.value);
    localInput.current.value = "";
  }

  const saveLocal = (e) => {
    e.preventDefault();
    if(saved.toLowerCase().includes(weather.name.toLowerCase())){
      alert(`location '${weather.name}' already saved`);
    } else {
      let newStorage = `${saved},${weather.name}`

      localStorage.setItem('savedWeather', newStorage )

      setSaved(newStorage)

    }
  }
  
return(
  <div className="container-fluid text-center"> 
    <h1> Weather app</h1>
    <form onSubmit={searchLocal}>
      <input ref={localInput} type="string"/>
      <input type="submit"/>
      <button onClick={saveLocal} value={localInput.current.value}>SAVE</button>
    </form> 
   
      <div>
      { weather.name? <WeatherPanel weatherData={weather}/> : ''}
      </div>
      <div>
        {saved? <SavedLocals list={saved} location={location} setLocation={setLocation}/>: ""}
      </div>

  </div>
)
}

export default App;
