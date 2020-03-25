import React from 'react'

import "./ProgressBar.css";

const ProgessBar = (props) => {

    const propssx = {
        className : "progress" ,
        id : props.id,
        min : (props.min > 0) ? props.min : 0 ,
        max : props.max,
        step :  (props.step) ? props.step : 1 ,
        value : props.now,
    }

    if(props.onChange){
        propssx.onChange= props.onChange;
    }
    if(props.onMouseUp){
        propssx.onMouseUp= props.onMouseUp;
    }
    if(props.onMouseDown){
        propssx.onMouseDown= props.onMouseDown;
    }

    return (
        <input type="range"
            {...propssx}
        />
    )
}


export default ProgessBar