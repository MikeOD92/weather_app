import '../App.css';
import React from 'react';
import { useEffect, useState } from 'react';


export default function SavedLocals(props){

    const viewSaved = (e) => {
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
            return (<button className="btn btn-info" value={loc} onClick={viewSaved}>{loc}</button>)
        })}
    </div>
    )

}