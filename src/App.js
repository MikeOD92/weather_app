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
        console.log(location)
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`);
        const data = await response.json();
        await setWeather(data);
        await console.log(weather)
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
    setSaved( saved => [...saved,localInput.current.value ])
    localStorage.setItem('savedWeather', saved.toString() )
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
        {localStorage.getItem('savedWeather')? <SavedLocals setLocation={setLocation}/>: "nope"}
      </div>
      {/* <div>
        check local storage for an array = to saved locations if it exists load
        <SavedsLocals with props location and setLocation to we can update the 
        page with the buttons this will make
        />
      </div> */}

  </div>
)
}

export default App;
