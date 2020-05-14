import React from 'react'

import "./Results.css"

export default function Results(props) {
    return (
        <div className="card-results-list">
            <div className="card-results-photo">
                <img className="img-shadow" src={props.img} alt={props.title}/>
            </div>
            <div className="card-results-details">
                <h3>{props.title}</h3>
                <p className="mt-1">{props.description}</p>
            </div>
        </div>
    )
}
