import React from 'react'


import { ReactComponent as IconUserDefault } from '../../../assets/img/icons/person-outline.svg'

export default function UploadPicture() {
  return (
    <div className="container-profile-photo" style={{
      backgroundImage: `url(https://picsum.photos/id/163/320/320)`
    }}>
      <div className="container-profile-photo-upload-hover">
        <IconUserDefault width="70" height="70" />
        <span>Adicionar Foto</span>
      </div>
    </div>
  )
}
