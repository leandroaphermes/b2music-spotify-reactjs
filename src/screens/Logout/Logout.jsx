import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actionsPlayer from '../../store/actions/player'
import { deleteSessionToken } from '../../utils/utils'

const Logout = function({ setPlayer }) {

    setPlayer(false)

    deleteSessionToken()

    return <Redirect to="/login" />
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    setPlayer: (playerData) => dispatch(actionsPlayer.status(playerData))
})


export default connect( mapStateToProps, mapDispatchToProps)(Logout)