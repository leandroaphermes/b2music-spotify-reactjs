import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import * as actionsPlayer from '../../../store/actions/player'
import * as actionsThunkPlayer from '../../../store/thunk/player'


import imageDefault from '../../../assets/img/music/default.jpg';
import { ReactComponent as IconPause } from "../../../assets/img/icons/pause-outline.svg";
import { ReactComponent as IconPlay } from "../../../assets/img/icons/play-outline.svg";

import "./PlaylistImage.css"

const PlaylistImage = function({ status, setStatus, player, setPlayer, ...props }) {

  function play(e, playlist_id){
    e.preventDefault();

    if(status && playlist_id === player.id) return setStatus(false)

    setPlayer(playlist_id, "playlist")
  }


  return (
    <article className="card-container">
      <Link to={`${props.prefixRoute}${props.data.id}`} className="d-block card-content">
        <div className="image-album">
          <img 
            className="cover"
            src={props.data.photo_url ? props.data.photo_url : imageDefault } 
            alt={props.data.name} 
          />
        </div>
        <div className="song-description mt-2">
          <div className="song-description-title">
            {props.data.name}
          </div>
          <div className="song-description-body hide-text-two-lines">{props.data.description}</div>
        </div>
        <div className="song-player">
          <button className="btn btn-primary btn-circle btn-shadow" onClick={(e) => play(e, props.data.id)}>
            {(status && props.data.id === player.id) ? <IconPause /> : <IconPlay />}
          </button>
        </div>
      </Link>
    </article>
  )
}

PlaylistImage.propTypes = {
  prefixRoute: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  status: state.player.status,
  player: state.player.player
})

const mapDispatchToProps = dispatch => ({
  setStatus: (status) => dispatch(actionsPlayer.status(status)),
  setPlayer: (id, type) => dispatch(actionsThunkPlayer.setNewPlaylist(id, type))
})

export default connect( mapStateToProps, mapDispatchToProps)(PlaylistImage)