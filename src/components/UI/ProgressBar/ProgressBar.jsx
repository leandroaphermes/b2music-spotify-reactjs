import React from 'react'
import PropTypes from 'prop-types'

import "./ProgressBar.css";

const ProgessBar = (props) => {

    const propssx = {
        className : "progress" ,
        min : (props.min > 0) ? props.min : 0 ,
        max : props.max,
        step :  (props.step) ? props.step : 1 ,
        value : props.now
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

ProgessBar.prototype = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseDown: PropTypes.func
}

export default ProgessBar