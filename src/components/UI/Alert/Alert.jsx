import React from 'react'
import { connect } from 'react-redux'

import * as actionsAlert from '../../../store/actions/alert'

import "./Alert.css"

const Alert = function ({ type, status, float, message }) {
    
    return (
        status ? (
            <div className={`alert ${ float && `alert-floating` } ${ type && `alert-${type}` }`}>
                {message}
            </div>
        ) : null
    )
}

const mapStateToProps = ({ alert }) => ({
    type: alert.type,
    float: alert.float,
    message: alert.message,
    status: alert.status,
})

const mapDispathToProps = dispatch => ({
    setAlert: (alert) => dispatch(actionsAlert.set(alert))
})

export default connect( mapStateToProps, mapDispathToProps)(Alert)
