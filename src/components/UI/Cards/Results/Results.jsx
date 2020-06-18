import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import "./Results.css"

const Results =  function(props) {
  return (
    <div className="card-results-list">
      <div className="card-results-photo">
        { props.img && props.img !== "" && (<img className="img-shadow" src={props.img} alt={props.title}/>)}
        { props.svg && props.svg !== "" && (props.svg)}
      </div>
      <div className="card-results-details">
        {props.href ? (
          <Link to={props.href}><h3>{props.title}</h3></Link>
        ) : (
          <h3>{props.title}</h3>
        )}
        <p className="mt-1">{props.description}</p>
      </div>
  </div>
  )
}

Results.prototype = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string,
  svg: PropTypes.string
}

export default Results
