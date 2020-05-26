import React from 'react'
import { useHistory } from 'react-router-dom'

import { ReactComponent as IconDangerError } from '../../../assets/img/icons/warning-outline.svg'

import "./Internal.css"

export default function Internal() {

  const history = useHistory()

  return (
    <div className="error-content">
      <section className="error-section">
        <div className="error-icon">
          <IconDangerError width="150px" height="150px" />
        </div>
        <div className="error-details">
          <h4>Ops... Aconteceu algo inesperado</h4>
          <p>Tente novamente mais tarde</p>
          {history.location.state.message && (
            <p>{history.location.state.message}</p>
          )}
        </div>
      </section>
    </div>
  )
}
