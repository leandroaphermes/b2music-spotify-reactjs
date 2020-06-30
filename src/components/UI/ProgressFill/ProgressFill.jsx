import React from 'react'
import PropTypes from 'prop-types'

import "./ProgressFill.css"

function ProgressFill({ complete, value }) {
  return (
    <div className="progress-fill">
      <div className="progress-fill-porcent" style={{
        width: `${value}%`
      }}>{complete}</div>
    </div>
  )
}

ProgressFill.propTypes = {
  value: PropTypes.number.isRequired,
  complete: PropTypes.string
}

export default ProgressFill

