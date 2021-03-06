import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import React from 'react';
import { useEffect, useState, useRef } from 'react';
import WeatherPanel from './components/WeatherPanel';
import SavedLocals from './components/SavedLocals';
import { MdSave, MdSearch} from "react-icons/md";


require('dotenv').config();

function App() {

  const localInput = useRef('');

  const [ location, setLocation ] = useState('');
  const [ weather, setWeather ] = useState({});
  const [ saved, setSaved ] = useState(localStorage.getItem('savedWeather')||"");

  useEffect(() => {

    let regEx = /^[0-9]{5}(?:-[0-9]{4})?$/;

    const call = async () => {
      // having trouble with deployed version accessing env apikey through netlify, either look into fixing this or host elsewhere. 
      if(regEx.test(location)){
        try{
          const queryURL = `https://api.openweathermap.org/data/2.5/weather?zip=${location},us&units=imperial&appid=${process.env.REACT_APP_API_KEY}`;
          const response = await fetch(queryURL);
          const data = await response.json();
          await setWeather(data);
        }catch(err){
          console.error(err);
        } 
      }else{
        try{
          const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`;
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
    let savingName = ''
    if(weather.name){
      savingName = weather.name;
    }else{
      savingName = localInput.current.value;
    }
    if(saved.toLowerCase().includes(savingName.toLowerCase())){
      alert(`location '${savingName}' already saved`);
    } else {
      let newStorage = `${saved},${savingName}`

      localStorage.setItem('savedWeather', newStorage )

      setSaved(newStorage)

    }
  }
  
return(
  <div className="container-fluid text-center"> 
    <div className="app-header">
      <h1> Rain Check</h1>
        <form onSubmit={searchLocal}>
          <input className='search' ref={localInput} type="string"/>
          <div className="btn-group">
            <button  className="btn btn-info main-app-btn" type="submit"> <MdSearch className="main-icon" /> </button>
            <button className="btn btn-info main-app-btn" onClick={saveLocal} value={localInput.current.value}> <MdSave className="main-icon"/></button>
          </div>
        </form> 
    </div>
 
    <div>
      { weather.name? <WeatherPanel weatherData={weather} saved={saved} setSaved={setSaved}/> : ''}
    </div>
    <div>
      {saved? <SavedLocals list={saved} location={location} setLocation={setLocation}/>: ""}
    </div>

  </div>
)
}

export default App;
