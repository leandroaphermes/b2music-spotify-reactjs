import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import * as actionsPlayer from '../../../store/actions/player'
import api from '../../../services/Api'

import imageDefault from '../../../assets/img/music/default.jpg';
import { ReactComponent as IconPause } from "../../../assets/img/icons/pause-outline.svg";
import { ReactComponent as IconPlay } from "../../../assets/img/icons/play-outline.svg";

import "./PlaylistImage.css"

const PlaylistImage = function({ status, setStatus, player, setPlayer, ...props }) {

  function play(e, playlistId){
    e.preventDefault();

    if(status && playlistId === player.id) return setStatus(false)

    api.get(`/playlists/${playlistId}`, {
        validateStatus: (status) => status === 200
    })
    .then( response => {
        if(response.data.tracks.length > 0){
          
          const data = {
            id: response.data.id,
            playingIndex: 0,
            playing: { },
            playlist: response.data.tracks
          }

          if(data.playlist[0] && Object.keys(data.playing).length === 0){
            data.playing = data.playlist[0];
          }

          localStorage.setItem('last_player_id', response.data.id)
          localStorage.setItem('last_player_type', "playlists")
          setPlayer(data);
          setStatus(true);
        }
    })
    .catch( dataError => {
        alert(`Erro de processo. Code: ${dataError.status}`)
    })
  
  }



  return (
    <article className="card-container">
      <a href={`${props.prefixRoute}${props.data.id}`} className="d-block card-content">
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
      </a>
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
  setPlayer: (dataPlayer, actionLocation) => dispatch(actionsPlayer.newPlaylist(dataPlayer, actionLocation))
})

export default connect( mapStateToProps, mapDispatchToProps)(PlaylistImage)