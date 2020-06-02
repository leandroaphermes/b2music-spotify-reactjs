import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import api from '../../services/Api'

import imageDefault from '../../assets/img/music/default.jpg'
import { ReactComponent as IconEllipsis, ReactComponent } from '../../assets/img/icons/ellipsis-vertical-outline.svg'
import { ReactComponent as IconMusicalNotes } from '../../assets/img/icons/musical-notes-outline.svg'
import { ReactComponent as IconPause } from '../../assets/img/icons/pause-outline.svg'
import { ReactComponent as IconPlay } from '../../assets/img/icons/play-outline.svg'

import "./Favorite.css"

const Favorite = function () {

  const [ favorites, setFavorites ] = useState([])

  useEffect( () => {

    api.get(``, {
      validateStatus: (status) => status === 200
    })
    .then( response => {



    })
    .catch( dataError => {
      console.log(dataError)
    })

  })

  return (
    <>
      <section className="card">
        
        <header className="card-header">
          <div className="card-title just-content-base">
            <div className="card-flex">

              <img src={imageDefault} className="shadow favorite-img" alt="Musicas favoritas"/>
              <div className="card-favorite ml-5">
                <div className="float-favorite-details">
                  <h3>Favoritos</h3>
                  <div className="d-block mt-5">

                    <button type="button" 
                      className="btn d-inline-block btn-primary btn-bold btn-spacing"
                    >
                      Play
                    </button>
                    <div className="dropdown">
                      <button className="btn btn-clean btn-circle d-inline-block ">
                        <IconEllipsis height="32px" width="32px" />
                      </button>
                      <div className="dropdown-menu">
                        <a href="#">Editar nome de playlist</a>
                        <a href="#">Compartilhar</a>
                        <a href="#">Excluir</a>
                      </div>
                    </div>

                  </div>
                  <div className="favorite-info">
                    <a href="" className="favorite-owner">Leandro Hermes</a>
                    <span className="ml-2">110 Músicas</span>
                  </div>

                </div>
              </div>
              {/* End DIV card favorite */}
              
            </div>
          </div>
        </header>
        
        <div className="card-content card-page p-0">
          <div className="separator"></div>

          <div className="songs-list">
            <div className="songs-list-icon">
              <IconMusicalNotes className="songs-list-icon-notes" width="22px" height="22px" />
              <IconPlay className="songs-list-icon-play" width="22px" height="22px" />
            </div>
            <div className="songs-list-name">
              <div><a href="#">Five Hours</a></div>
              <div><a href="#">Deorro</a></div>
            </div>
            <div className="songs-list-time py-3 pt-1">
              00:00
            </div>
          </div>

        </div>


      </section>
      {/* End section Card */}
    </>
  )
}

const mapStateToProps = state => ({
  
})
const mapDispatchToProps = dispatch => ({

})

export default connect( mapStateToProps, mapDispatchToProps)(Favorite)