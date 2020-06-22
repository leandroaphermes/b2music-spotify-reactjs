import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'


import * as actionsPlayer from '../../../store/actions/player'
import * as actionsThunkPlayer from '../../../store/thunk/player'

import ComponentUILinkOfComma from '../../UI/LinkOfComma/LinkOfComma'
import imageDefault from '../../../assets/img/music/default.jpg';
import { ReactComponent as IconPause } from "../../../assets/img/icons/pause-outline.svg";
import { ReactComponent as IconPlay } from "../../../assets/img/icons/play-outline.svg";

import "./AlbumImage.css"

const AlbumImage = function({ status, setStatus, player, setPlayer, ...props }) {

  function play(e, album_id){
    e.preventDefault();

    if(status && album_id === player.id && player.type_list === 'album') return setStatus(false)
    
    setPlayer(album_id, "album")
  }
  
  return (
    <article className="card-container">
      <div className="d-block card-content">
        <div className="image-album">
          <Link to={`${props.prefixRoute}${props.data.id}`}>
            <img 
              className="cover"
              src={props.data.photo_url ? props.data.photo_url : imageDefault } 
              alt={props.data.name} 
            />
          </Link>
        </div>
        <div className="song-description mt-2">
          <div className="song-description-title">
            <Link to={`${props.prefixRoute}${props.data.id}`}>{props.data.name}</Link>
          </div>
          <div className="song-description-body">
            <ComponentUILinkOfComma
              data={[ props.data.author ]}
              prefixRoute="/author/"
            />
          </div>
        </div>
        <div className="song-player">
          <button className="btn btn-primary btn-circle btn-shadow" onClick={(e) => play(e, props.data.id)}>
            {(status && props.data.id === player.id && player.type_list === 'album') ? <IconPause /> : <IconPlay />}
          </button>
        </div>
      </div>
    </article>
  )
}

AlbumImage.propTypes = {
  prefixRoute: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  status: state.player.status,
  player: state.player.player
})

const mapDispatchToProps = dispatch => ({
  setStatus: (status) => dispatch(actionsPlayer.status(status)),
  setPlayer: (id, type) => dispatch(actionsThunkPlayer.setNewPlaylist(id, type))
})


export default connect( mapStateToProps, mapDispatchToProps)(AlbumImage)