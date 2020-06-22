import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { ReactComponent as IconPause } from '../../../assets/img/icons/pause-outline.svg'
import { ReactComponent as IconPlay } from '../../../assets/img/icons/play-outline.svg'
import imageDefault from '../../../assets/img/music/default.jpg'

import "./FullImagePlay.css"

const Container = ({ children }) => {
  return (
    <div className="container-card-image-play">
      {children}
    </div>
  )
}

const ItemImagePlay = function({ statusPlayer, player, ...props }) {

  function handleClickPlay(e, id){
    e.preventDefault()

    props.play(id)
    
  }

  return (
    <section className="content-card-image-play">
      <div 
        className="content-card-image-play-image" 
        style={{ backgroundImage: `url(${ props.data.photo_url ? props.data.photo_url : imageDefault})` }}
      >
        <Link className="content-card-image-play-image-link" to={`${props.prefixRoute}${props.data.id}`} >
          <div className="content-card-image-play-image-action">
            <button 
              className="btn btn-circle btn-primary btn-shadow"
              onClick={handleClickPlay}
            > { player.id === props.data.id && statusPlayer && player.type_list === 'album' ? 
                <IconPause width="46px" height="46px" /> 
                : <IconPlay width="46px" height="46px" />
              }
            </button>
          </div>
        </Link>
      </div>
      <div className="content-card-image-play-title">
        <Link to={`${props.prefixRoute}${props.data.id}`}>{props.data.name}</Link>
      </div>
    </section>
  )
}

ItemImagePlay.prototype = {
  prefixRoute: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  statusPlayer: PropTypes.bool.isRequired,
  player: PropTypes.object.isRequired,
  play: PropTypes.func
}

export {
  ItemImagePlay,
  Container
}
  

