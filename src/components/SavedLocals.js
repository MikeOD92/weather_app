import '../App.css';
import React from 'react';
import { useEffect, useState } from 'react';


export default function SavedLocals(props){
    // console.log('//////////////////in local storage ///');
    // console.log(localStorage.getItem('savedWeather'));
    // const savedLocations = localStorage.getItem('savedWeather');
    // const locations = savedLocations.split(',');
    // console.log('////////// in locations varible/////////')

    // lets try passing our saved list as props to trigger rerender


    /// by taking our local storage and seprating it to another var, ie not editing the actual storeage
    // im able to avoid the s,p,l,i,i,t,i,n,g this also seems tied to the spreading in of the locations for the 
    // save locals see app.js line 50
   // console.log(locations);
    //console.log('/////////////////////////');

    const viewSaved = (e) => {
        console.log(e.target.value)
        props.setLocation(e.target.value);
    }

    const arr = props.list.split(',');
    arr.shift();
    
    const [list, setList] = useState(arr);

    useEffect(() => {
        setList(arr)
    }, [props])

    return(
    <div className="saved">
        {list.map((loc)=>{
            return (<button value={loc} onClick={viewSaved}>{loc}</button>)
        })}
    </div>
    )

}