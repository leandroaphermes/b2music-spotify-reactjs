import React, { useState, useEffect, useRef } from 'react'

import api from '../../../services/Api'
import { UPLOAD_IMG_MINETYPES, UPLOAD_IMG_SIZE } from '../../../utils/upload'
import { calcSizeBits } from '../../../utils/utils'

import ComponentUIProgressFill from '../../../components/UI/ProgressFill/ProgressFill'

import { ReactComponent as IconUserDefault } from '../../../assets/img/icons/person-outline.svg'

export default function UploadPicture({ session, setAlert, setSession }) {

  const refInputFile = useRef(null)
  const [btnDisable, setBtnDisable] = useState(true)
  const [errors, setErrors] = useState({})

  const [uploadLoading, setUploadLoading] = useState({})
  const [fileImage, setFileImage] = useState({})
  const [urlImage, setUrlImage] = useState("")

  function addError( field, message){
    setErrors({...errors, [field]: message})
  }
  function delError( field ){
      let tmp = errors
      delete tmp[field]
      setErrors({...tmp})
  }

  function submitUpload(){

    const formData = new FormData()
    if(fileImage && fileImage.name && fileImage.name !== "") {

      setBtnDisable(true)

      formData.append("photo", fileImage)
      api.post(`/me/upload-photo`, formData ,{
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        validateStatus: s => s === 200,
        onUploadProgress: (progressEvent) => {

          let procent = parseInt((progressEvent.loaded / progressEvent.total) * 100)

          setUploadLoading({
            value: procent < 100 ? procent : 100,
            completed: procent < 100 ? false : true
          })

        }
      })
      .then( response => {

        setSession({
          ...session, photo_url: response.data.photo_url
        })

        setBtnDisable(true)

        setAlert({
          status: true,
          type: "success",
          message: "Imagem enviada"
        })


      })
      .catch( dataError=> {
        
        setAlert({
          status: true,
          type: "danger",
          message: "Erro ao enviar imagem"
        })

      })

    }
  }

  function handleFileImage (files){
    if(files.length === 1){
      if(files[0].size >= calcSizeBits(UPLOAD_IMG_SIZE)){
        addError( "fileimage" , `O tamanho maximo da imagem se execeu os ${UPLOAD_IMG_SIZE}` )
        setFileImage({})
      }else{
        delError( "fileimage" )
        setFileImage(files[0])
      }
    }else{
      setFileImage({})
    }
  }

  useEffect(() => {
    setBtnDisable(true)

    if( Object.keys(errors).length === 0 ){
      setBtnDisable(false)
      
    }
    if(errors.fileimage){
      setAlert({
        status: true,
        type: "danger",
        message: errors.fileimage
      })
    }

  }, [errors, setAlert ])

  useEffect(() => {
    if(fileImage.name){
      
      const url = URL.createObjectURL(fileImage)
      setUrlImage(url)

      return () => {
        if(url) {
          URL.revokeObjectURL(url)
          setUrlImage("")
        }
      }
    }

  }, [fileImage])

  return (
    <>
      <input 
        type="file" 
        className="hide"
        name="file-image"
        accept={UPLOAD_IMG_MINETYPES.join(", ")}
        ref={refInputFile}
        onChange={e => handleFileImage(e.target.files)}
      />

      <div className="container-profile-photo" style={{
          backgroundImage: `url(${ urlImage ? urlImage : session.photo_url ? session.photo_url : ""})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center"
        }}
      >
        <div 
          className="container-profile-photo-upload-hover"
          onClick={() => refInputFile.current.click()}
        >
          <IconUserDefault width="70" height="70" />
          <span>{ session.photo_url ? "Alterar" : "Adicionar" } Foto</span>
        </div>

        { !btnDisable && fileImage && fileImage.name ? (
          <button 
            className="btn btn-primary btn-sm btn-upload-save"
            onClick={submitUpload}
          >
            Salvar Imagem
          </button>
        ) : btnDisable && !uploadLoading.completed ? (
          <ComponentUIProgressFill
            value={uploadLoading.value}
          />
        ) : null }
      </div>
    </>
  )
}
