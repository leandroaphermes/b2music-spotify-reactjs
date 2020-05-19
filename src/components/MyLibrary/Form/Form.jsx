import React from 'react'

import { ReactComponent as IconMusicTon } from '../../../assets/img/icons/musical-notes-outline.svg'

import "./Form.css"

export default function Form() {
  return (
    <form>
      <div className="d-flex playlist-form-add">
        
        <div className="playlist-form-add-picture">
          <IconMusicTon width="60" height="60" />
          <span>Escolher Imagem</span>
        </div>
        <div className="playlist-form-inputs">

          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input 
              type="text" 
              className="form-control"
              id="name"
            />
          </div>

        </div>
        
      </div>
    </form>
  )
}
