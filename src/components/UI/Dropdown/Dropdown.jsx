import React from 'react'
import PropTypes from 'prop-types'

import "./Dropdown.css"

const Dropdown = function(props) {
  

  return (
    <div className="dropdown">
      <button 
        className={`btn btn-clean btn-circle d-inline-block ${props.buttonSize ? `btn-${props.buttonSize}` : ``}`}
        {...props.buttonOptions}
        >
        {props.button}
      </button>
      <div className={`dropdown-menu ${props.dropDirection ? `drop-${props.dropDirection}` : `drop-right`}`}>
        {props.children}
      </div>
    </div>
  )
}


Dropdown.prototype = {
  children: PropTypes.element.isRequired,
  button: PropTypes.element.isRequired,
  buttonSize: PropTypes.string,
  buttonOptions: PropTypes.object,
  dropDirection: PropTypes.oneOf(['up', 'right', 'bottom', 'left'])
}

export default Dropdown