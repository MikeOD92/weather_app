import '../App.css';
import React from 'react';

export default function SavedLocals(props){
    console.log('/////////////////////////');
    console.log(localStorage.getItem('savedWeather'));
    const locations = localStorage.getItem('savedWeather').split(',');
    console.log(locations);
    console.log('/////////////////////////');

    const viewSaved = (e) => {
        console.log(e.target)
        //props.setLocation(e.target.loc);
    }
    return(
    <div className="saved">
        {locations.map((loc)=>{
            return (<button loc={loc} onClick={viewSaved}>{loc}</button>)
        })}
    </div>
    )

}