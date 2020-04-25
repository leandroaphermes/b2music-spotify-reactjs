import React from 'react'

import "./Alert.css"

export default function Alert(props) {

    return (
        <div className={`alert ${ props.type && `alert-${props.type}` }`}>
            {props.text}
        </div>
    )
}
