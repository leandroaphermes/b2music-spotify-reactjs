import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as IconClose } from '../../../assets/img/icons/close-outline.svg'

import "./Modal.css"

const Modal = function (props) {

  function handleClose(e) {
    if(e.target.className !== 'modal') return 
    props.onToggleModal()
  }

  return (
    props.visible && (
      <div className="modal" onClick={handleClose}>
        <div className={`modal-content ${props.size ? props.size : ``}`}>
          <div className="modal-header">
            <h4 className="modal-title">{props.title}</h4>
            <button 
              type="button" 
              className="btn btn-clean" 
              title="Fechar janela"
              onClick={props.onToggleModal}
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

Modal.prototype = {
  visible: PropTypes.bool.isRequired,
  onToggleModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}


export default Modal