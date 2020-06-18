import React, { memo } from 'react'
import { Link } from 'react-router-dom'

import ComponentUILinkOfComma from '../../UI/LinkOfComma/LinkOfComma'

import photoMusic from '../../../assets/img/music/default.jpg';

import "./Details.css";

const Details = function(props) {
  return (
    <div className="song-details" aria-label="Informação da musica atual">
      <div className="photo-mini-song">
        <Link to={`/album/${props.album.id}`}>
          <img src={(props.album.photo_url) ? props.album.photo_url : photoMusic} alt={props.name} />
        </Link>
      </div>
      <div className="song-details-info">
        <div className="song-details-title">
          <Link to={`/album/${props.album.id}`}>{props.name}</Link>
        </div>
        <div className="song-details-author">
          <ComponentUILinkOfComma
            prefixRoute="/author/"
            data={props.authors}
          />
        </div>
      </div>
    </div>
  )
}
export default memo(Details);