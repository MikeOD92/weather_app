import './App.css';
import React from 'react';
import { useEffect, useState, useRef } from 'react';
import WeatherPanel from './components/WeatherPanel';
require('dotenv').config();

function App() {

  const localInput = useRef('');

  const [ location, setLocation ] = useState('');
  const [ weather, setWeather ] = useState({});

  // const [query, updateQuery] = useState({
	// 	baseURL: 'api.openweathermap.org/data/2.5/weather?',
  //   location: 'q=' + location,
	// 	apiKey: '&appid=' + process.env.API_KEY,
	// 	searchURL: ''
	// });

  useEffect(() => {
    const call = async () => {
      try{
        console.log(location)
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.API_KEY}`);
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
