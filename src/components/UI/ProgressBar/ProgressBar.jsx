import React from 'react'

import "./ProgressBar.css";

const FillerCicle = (props) => {
    return <div className="progress-cicle" style={ { left: `${props.now}%` } }></div>
}
const FillerBar = (props) => {
    return <div className="progress-bar" style={ { width: `${props.now}%` } }></div>
}

const ProgessBar = (props) => {
    return (
        <div className="progress" onClick={props.onClick} id={props.id} >
            { props.cicle &&
                <FillerCicle now={props.now} />
            }
            <FillerBar now={props.now} />
        </div>
    )
}


export default ProgessBar