import React from 'react'

import { ReactComponent as IconClose } from '../../../assets/img/icons/close-outline.svg'

import "./Modal.css"

export default function Modal(props) {

  function handleClosed(e) {
    if(e.target.id !== 'modal') return 
    props.onClosed(false)
  }

  return (
    props.visible && (
      <div className="modal" id="modal" onClick={handleClosed}>
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{props.title}</h4>
            <button 
              type="button" 
              className="btn btn-clean" 
              title="Fechar janela"
              onClick={props.onClosed}
            >
              <IconClose width="36" height="36" />
            </button>
          </div>
          <div className="modal-body">
            {props.children}
          </div>
        </div>
      </div>
    )
  )
}
