import React from 'react'
import PropsTypes from 'prop-types'

import "./Dropdown.css"

const Dropdown = function(props) {
  return (
    <div className="dropdown">
      <button className="btn btn-clean btn-circle d-inline-block ">
        {props.button}
      </button>
      <div className="dropdown-menu">
        {props.children}
      </div>
    </div>
  )
}


Dropdown.prototype = {
  children: PropsTypes.element.isRequired,
  button: PropsTypes.element.isRequired
}

export default Dropdown