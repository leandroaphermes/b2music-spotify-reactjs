import React from 'react'
import { useHistory } from 'react-router-dom'

import "./NotFound.css"

export default function NotFound() {

  const history = useHistory()

  return (
    <div className="error-content">
      <section className="error-section">
        <div className="error-icon">
          <span className="error-icon-text">404</span>
        </div>
        <div className="error-details">
          <h4>Ops... Pagina não encontrada</h4>
          <p>Tente novamente mais tarde</p>
          {history.location.state.message && (
            <p>{history.location.state.message}</p>
          )}
        </div>
      </section>
    </div>
  )
}
