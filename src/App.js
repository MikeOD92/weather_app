import './App.css';
import React from 'react';
import { useEffect, useState, useRef } from 'react';
import WeatherPanel from './components/WeatherPanel';

function App() {

  const localInput = useRef('');

  const [ location, setLocation ] = useState('');
  const [ weather, setWeather ] = useState({});

  useEffect(() => {
    const call = async () => {
      try{
        console.log(location)
        const response = await fetch(`api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}&units=imperial`, {
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        await setWeather(data);
      }catch(err){
        console.error(err);
      }finally{
        console.log('weather');
        console.log(weather);
      }
    }
    call();
  }, [location])

  const searchLocal = (e) => {
    e.preventDefault();
    setLocation(localInput.current.value);
  }
 return(
  <div> 
    <h1> Weather app</h1>
    <form onClick={searchLocal}>
      <input ref={localInput} type="string"/>
      <input type="submit"/>
    </form>
    {Object.keys(weather).length? (
      <WeatherPanel data={weather}/>
    ):""
    }
  </div>
 )
}

export default App;
