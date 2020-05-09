import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import * as actionsAlert from '../../../store/actions/alert'

import "./Alert.css"

const Alert = function ({ type, status, float, message, setAlert }) {
    const [fade, setFade ] = useState(false)

    useEffect(() => {
        console.log("Entrou no useEffect");
        if(status){

            
            setTimeout(() => {
                setFade(true)
            }, 100)
            setTimeout(() => {
                setAlert({
                    status: false
                })
            }, 5000)
            setTimeout(() => {
                setFade(false)
            }, 4000)

        }

    }, [ status, setAlert ])
    
    return (
        status && (
            <div className={`alert ${ float && `alert-floating`} ${ (fade) ? `alert-active` : ``} ${ type && `alert-${type}` }`}>
                {message}
            </div>
        )
    )
}

const mapStateToProps = ({ alert }) => ({
    type: alert.type,
    float: alert.float,
    message: alert.message,
    status: alert.status
})

const mapDispathToProps = dispatch => ({
    setAlert: (alert) => dispatch(actionsAlert.set(alert))
})

export default connect( mapStateToProps, mapDispathToProps)(Alert)
