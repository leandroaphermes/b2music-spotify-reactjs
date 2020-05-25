import React from 'react'
import PropType from 'prop-types'

import { ReactComponent as IconUser } from '../../../../assets/img/icons/person-outline.svg'

import "./UserImage.css"

const UserImage = function (props) {
  return (
    <article className="card-container">
      <a href={`${props.prefixRoute}${props.data.id}`} className="d-block card-content">
        <div className="image-album-circle">
        
          {props.data.photo_url ? (
          <img 
            className="cover shadow circle"
            src={props.data.photo_url} 
            alt={props.data.name} 
          />)
          : <IconUser width="100" height="100" />
          }
        </div>
        <div className="song-description mt-2">
          <div className="song-description-title">
            {props.data.name}
          </div>
          <div className="song-description-body hide-text-two-lines">{props.data.description}</div>
        </div>
      </a>
    </article>
  )
}

UserImage.propTypes = {
  prefixRoute: PropType.string.isRequired,
  data: PropType.object.isRequired
}

export default UserImage