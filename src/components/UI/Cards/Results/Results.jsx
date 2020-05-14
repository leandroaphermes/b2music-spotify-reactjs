import React from 'react'

import "./Results.css"

export default function Results(props) {
    return (
        <div className="card-results-list">
            <div className="card-results-photo">
                { props.img && props.img !== "" && (<img className="img-shadow" src={props.img} alt={props.title}/>)}
                { props.svg && props.svg !== "" && (props.svg)}
            </div>
            <div className="card-results-details">
                {props.href ? (
                    <a href={props.href}><h3>{props.title}</h3></a>
                ) : (
                    <h3>{props.title}</h3>
                )}
                <p className="mt-1">{props.description}</p>
            </div>
        </div>
    )
}
