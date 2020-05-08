import React from 'react'
import { connect } from 'react-redux'

import * as actionsAlert from '../../../store/actions/alert'

import "./Alert.css"

const Alert = function ({ alert }) {
    return (
        alert.status ? (
            <div className={`alert ${ alert.float && `alert-floating` } ${ alert.type && `alert-${alert.type}` }`}>
                {alert.message}
            </div>
        ) : ""
    )
}

const mapStateToProps = state => ({
    alert: state.alert
})

const mapDispathToProps = dispatch => ({
    setAlert: (alertData) => dispatch(actionsAlert.set(alertData))
})

export default connect( mapStateToProps, mapDispathToProps)(Alert)
