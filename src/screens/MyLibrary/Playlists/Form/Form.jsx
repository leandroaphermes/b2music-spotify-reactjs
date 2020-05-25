import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actionsAlert from '../../../../store/actions/alert'
import api from '../../../../services/Api'

import { calcSizeBits } from '../../../../utils/utils'
import { ALFA_NUMBER_SPACE_CS } from '../../../../utils/const-regex'
import { UPLOAD_IMG_MINETYPES, UPLOAD_IMG_SIZE } from '../../../../utils/upload'

import { ReactComponent as IconMusicTon } from '../../../../assets/img/icons/musical-notes-outline.svg'

import "./Form.css"

const Form = function ({ setAlert }) {
  const refInputFile = useRef(null)
  const [errors, setErrors] = useState({
    name: ""
  })
  const [btnDisable, setBtnDisable] = useState(true)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState({})
  const [urlImagem, setUrlImagem] = useState("")

  const history = useHistory()

  function handleOnSubmit(e){
    e.preventDefault()

    setBtnDisable(true)

    const formData = new FormData()
    if(image && image.name && image.name !== "") formData.append("photo", image)
    formData.append("name", name)
    formData.append("description", description)


    api.post("/playlists", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      validateStatus: (s) => s === 201
    })
    .then( response => {

      history.push(`/playlist/${response.data.id}`)

    })
    .catch( dataError => {
      if(dataError.response.data[0]){
        let errorsApi = {};
        dataError.response.data.forEach( field => {
            errorsApi[field.field] = field.message
        })
        setErrors(errorsApi)
      
      }else{
        setAlert({
          status: true,
          type: "danger",
          message: dataError.response.data.message,
          float: true
        })
      }
      setBtnDisable(false)
    })
  }
    
  function addError( field, message){
    setErrors({...errors, [field]: message})
  }
  function delError( field ){
      let tmp = errors
      delete tmp[field]
      setErrors({...tmp})
  }


  function handleFileImage(files){
    
    if(files.length === 1){
      if(files[0].size >= calcSizeBits(UPLOAD_IMG_SIZE)){
        addError( "fileimage" , `O tamanho maximo da imagem se execeu os ${UPLOAD_IMG_SIZE}` )
        setImage({})
      }else{
        delError( "fileimage" )
        setImage(files[0])
      }
    }else{
      setImage({})
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

  useEffect(() => {
    if(image.name){
      
      const url = URL.createObjectURL(image)
      setUrlImagem(url)

      return () => {
        if(url) {
          URL.revokeObjectURL(url)
          setUrlImagem("")
        }
      }
    }

  }, [image])

  return (
    <form onSubmit={handleOnSubmit}>

      <input 
        type="file" 
        className="hide"
        name="file-image" 
        id="file-image" 
        accept={UPLOAD_IMG_MINETYPES.join(", ")}
        ref={refInputFile}
        onChange={e => handleFileImage(e.target.files)}
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

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  setAlert: (dataAlert) => dispatch(actionsAlert.set(dataAlert))
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)