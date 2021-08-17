import '../App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useEffect, useState } from 'react';

import { MdViewHeadline} from "react-icons/md";

export default function SavedLocals(props){

    const [show, setShow] = useState(false);

    const toggle = (e) =>{
        e.preventDefault();
        if (show){
            
            setShow(false)
        }else{

            setShow(true); 
    }}

    const viewSaved = (e) => {
        props.setLocation(e.target.value);
    }

    const arr = props.list.split(',');
    arr.shift();
    
    const [list, setList] = useState(arr);

    useEffect(() => {
        setList(arr)
        console.log(arr)
    }, [props])

    if(show){
        return(

        <div className="saved"onClick={toggle}>
            <div className="tab"><MdViewHeadline className="tab-icon"/> </div>
            {list.map((loc)=>{
                return (<button className="btn btn-info" value={loc} onClick={viewSaved}>{loc}</button>)
            })}
        </div>
        )
    }else{
        return(
            <div className="saved hide"onClick={toggle}>
            <div className="tab"> <MdViewHeadline className="tab-icon"/> </div>
            {list.map((i, loc)=>{
                return (<button key={i} className="btn btn-info" value={loc} onClick={viewSaved}>{loc}</button>)
            })}
        </div> 
        )
    }


}