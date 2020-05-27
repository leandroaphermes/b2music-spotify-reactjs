import React, { memo } from 'react'

import ComponentUILinkOfComma from '../../UI/LinkOfComma/LinkOfComma'

import photoMusic from '../../../assets/img/music/default.jpg';

import "./Details.css";

const Details = function(props) {
  return (
    <div className="song-details" aria-label="Informação da musica atual">
      <div className="photo-mini-song">
        <a href={`/album/${props.album.id}`}>
          <img src={(props.album.photo_url) ? props.album.photo_url : photoMusic} alt={props.name} />
        </a>
      </div>
      <div className="song-details-info">
        <div className="song-details-title">
          <a href={`/album/${props.album.id}`}>{props.name}</a>
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