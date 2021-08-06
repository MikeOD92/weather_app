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

  // console.log(saved)
  
  useEffect(() => {
    //let regEx = /1-9/ ;
    const call = async () => {
      /// can add ? here to see if location is letters or numbers use an regEX 
      // use proper  api url for zip , city name, etc. 
      
      // if(location.search(regEx) > 0){
      //   console.log('okaie dokie')
      // }
      try{
        const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`;
        const response = await fetch(queryURL);
        const data = await response.json();
        await setWeather(data);
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
    if(saved.toLowerCase().includes(e.target.value.toLowerCase())){
      alert(`location '${e.target.value}' already saved`);
    } else {
      let newStorage = `${saved},${localInput.current.value}`

      localStorage.setItem('savedWeather', newStorage )

      setSaved(newStorage)

    }
  }
  
return(
  <div> 
    <h1> Weather app</h1>
    <form onSubmit={searchLocal}>
      <input ref={localInput} type="string"/>
      <input type="submit"/>
    </form> 
    <button onClick={saveLocal} value={localInput.current.value}>SAVE</button>
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
