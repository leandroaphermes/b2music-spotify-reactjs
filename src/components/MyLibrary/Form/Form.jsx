import React, { useState, useEffect, useRef } from 'react'

import api from '../../../services/Api'
import { ALFA_NUMBER_SPACE_CS } from '../../../utils/const-regex'

import { ReactComponent as IconMusicTon } from '../../../assets/img/icons/musical-notes-outline.svg'

import "./Form.css"

export default function Form() {
  const refInputFile = useRef(null)
  const [errors, setErrors] = useState({
    name: ""
  })
  const [btnDisable, setBtnDisable] = useState(true)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState({})
  const [urlImagem, setUrlImagem] = useState("")

  function handleOnSubmit(e){
    e.preventDefault()

    const formDate = new FormData()
    formDate.append("image", image)
    formDate.append("name", name)
    formDate.append("description", description)

    console.log("FORMDATE", formDate);
    
/*     api.post("/playlists", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
    })
 */

    alert("Foi o submit")


  }
    
  function addError( field, message){
    setErrors({...errors, [field]: message})
  }
  function delError( field ){
      let tmp = errors
      delete tmp[field]
      setErrors({...tmp})
  }


  function handleFileImage(e){
    
    if(e.target.files.length > 0){
      setImage(e.target.files[0])

      const url = URL.createObjectURL(e.target.files[0])
      setUrlImagem(url)

    }else{
      setImage({})
      URL.revokeObjectURL(urlImagem)
      setUrlImagem("")
    }
    
  }
  
  function handleName(name){

    if(name.length < 3 || name.length > 50){
      addError( "name", "Nome da playlist deve conter 3 a 50 caracteres" )
    }else if( !ALFA_NUMBER_SPACE_CS.test(name) ){
      addError( "name", "Nome da playlist deve conter apenas Letras ou numeros" )
    }else{
      delError( "name" )
    }

    setName(name)
  }
  function handleDescripton(description){

    if(description.length < 0 || description.length > 255){
      addError( "description", "Tamanho maximo é de 255 caracteres" )
    }else{
      delError( "description" )
    }

    setDescription(description)
  }

  useEffect(() => {
    setBtnDisable(true)

    if( Object.keys(errors).length === 0 ){
      setBtnDisable(false)
    }

  }, [errors])


  return (
    <form onSubmit={handleOnSubmit}>

      <input 
        type="file" 
        className="hide"
        name="file-image" 
        id="file-image" 
        accept="image/gif, image/png, image/jpeg, image/jpg" 
        ref={refInputFile}
        onChange={handleFileImage}
      />

      <div className="d-flex playlist-form-add">
        
        <div className="playlist-form-add-picture-container">
          <button 
            type="button" 
            className="btn btn-clean playlist-form-add-picture-container-button"
            style={ urlImagem !== "" ? {
              backgroundImage: `url(${urlImagem})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center center"
            } : { }}
            onClick={() => refInputFile.current.click()}
          >
            { !urlImagem &&  (
              <div className="playlist-form-add-picture-label">
                <IconMusicTon width="60" height="60" />
                <span>Escolher Imagem</span>
              </div>
            )}
          </button>
          {errors.fileimage && (
            <div className="input-error">
              {errors.fileimage}
            </div>
          )}
        </div>
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
            {errors.name && (
              <div className="input-error">
                {errors.name}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <textarea 
              type="text" 
              className="form-control"
              id="description"
              placeholder="Essa tem tudo com você"
              rows="4"
              maxLength="255"
              value={description}
              onChange={(e) => handleDescripton(e.target.value)}
            ></textarea>
            {errors.description && (
              <div className="input-error">
                {errors.description}
              </div>
            )}
          </div>

        </div>
        
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary" disabled={btnDisable}>
          Criar
        </button>
      </div>
    </form>
  )
}
