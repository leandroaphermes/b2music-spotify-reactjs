import React from 'react'
import PropTypes from 'prop-types'

import imageDefault from '../../../../assets/img/music/default.jpg';
import { ReactComponent as IconPause } from "../../../../assets/img/icons/pause-outline.svg";
import { ReactComponent as IconPlay } from "../../../../assets/img/icons/play-outline.svg";

import "./PlaylistImage.css"

const PlaylistImage = function(props) {
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
          <button className="btn btn-primary btn-circle btn-shadow" onClick={(e) => props.click(e, props.data.id)}>
            {(props.statusPlayer && props.data.id === props.player.id) ? <IconPause /> : <IconPlay />}
          </button>
        </div>
      </a>
    </article>
  )
}

PlaylistImage.propTypes = {
  prefixRoute: PropTypes.string.isRequired,
  statusPlayer: PropTypes.bool.isRequired,
  player: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  click: PropTypes.func.isRequired
}

export default PlaylistImage