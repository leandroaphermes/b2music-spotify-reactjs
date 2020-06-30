import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { secondsToMinutos } from '../../../utils/utils'

import ComponentButtonsFavorite from '../../Buttons/Favorite/Favorite'
import ComponentUILinkOfComma from '../LinkOfComma/LinkOfComma'

import { ReactComponent as IconPlay } from '../../../assets/img/icons/play-outline.svg'
import { ReactComponent as IconMusicalNotes } from '../../../assets/img/icons/musical-notes-outline.svg'

import "./SongListMinute.css"

function SongListMinute({ idplayer, track, index, player, type_list, ...props }) {
  return (
    <div 
      className={`songs-list ${ player.id === parseInt(idplayer) && 
                                player.type_list === type_list && 
                                player.playing.id === track.id 
                                ? `active-hover` :``}`} 
      onDoubleClick={() => props.handleDoubleClick(track.id)}
    >
      <div className="songs-list-icon">
        <IconMusicalNotes className="songs-list-icon-notes" width="22px" height="22px" />
        <IconPlay className="songs-list-icon-play" width="22px" height="22px" />
      </div>
      <div className="songs-list-name">
        <div>
        
          <Link to={`/album/${track.album.id}`}>{track.name}</Link>
        </div>
        <div>
          <ComponentUILinkOfComma 
            prefixRoute="/author/"
            data={track.authors}
          />
        </div>
      </div>
      <div className="songs-list-time py-3 pt-1">
        <ComponentButtonsFavorite 
          type="track"
          dataID={track.id}
        />
        {props.children}
        {secondsToMinutos(track.duration)}
      </div>
    </div>
  )
}

SongListMinute.prototype = {
  idplayer: PropTypes.number.isRequired,
  type_list: PropTypes.string.isRequired,
  track: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  player: PropTypes.object.isRequired,
  handleDoubleClick: PropTypes.func.isRequired,
  children: PropTypes.element
}

export default SongListMinute

