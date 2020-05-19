import React, { useState } from 'react'

import { ReactComponent as IconMusicTon } from '../../../assets/img/icons/musical-notes-outline.svg'

import "./Form.css"

export default function Form() {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  function handleName(name){
    setName(name)
  }
  function handleDescripton(description){
    setDescription(description)
  }

  return (
    <form>
      <div className="d-flex playlist-form-add">
        
        <button type="button" className="btn btn-clean playlist-form-add-picture">
          <IconMusicTon width="60" height="60" />
          <span>Escolher Imagem</span>
        </button>
        <div className="playlist-form-inputs ml-3">

          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input 
              type="text" 
              className="form-control"
              id="name"
              placeholder="Minha melhor playlist"
              minLength="3"
              maxLength="50"
              value={name}
              onChange={(e) => handleName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <textarea 
              type="text" 
              className="form-control"
              id="description"
              placeholder="Minha melhor playlist"
              rows="4"
              maxLength="255"
              value={description}
              onChange={(e) => handleDescripton(e.target.value)}
            ></textarea>
          </div>

        </div>
        
      </div>
    </form>
  )
}
