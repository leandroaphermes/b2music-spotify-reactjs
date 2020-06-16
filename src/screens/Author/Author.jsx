import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actionsAlert from '../../store/actions/alert'
import * as actionsPlayer from '../../store/actions/player'
import * as actionsThunkPlayer from '../../store/thunk/player'
import api from '../../services/Api'
import { secondsToMinutos } from '../../utils/utils'

/* Components Funcional */
import ComponentButtonsFavorite from '../../components/Buttons/Favorite/Favorite'

/* Components Generico */
import ComponentUILinkOfComma from '../../components/UI/LinkOfComma/LinkOfComma'
import ComponentUIDropdown from '../../components/UI/Dropdown/Dropdown'

import imageDefault from '../../assets/img/music/default.jpg'
import { ReactComponent as IconEllipsis } from '../../assets/img/icons/ellipsis-vertical-outline.svg'
import { ReactComponent as IconMusicalNotes } from '../../assets/img/icons/musical-notes-outline.svg'
import { ReactComponent as IconPause } from '../../assets/img/icons/pause-outline.svg'
import { ReactComponent as IconPlay } from '../../assets/img/icons/play-outline.svg'

import "./Author.css"

const Author = function ({ status, setStatus, player, setPlayIndex, setNewPlaylist, setAlert }) {

  const [author, setAuthor] = useState({
    id: 0,
    name: "",
    photo_url: "",
    tracks: [],
    albums: []
  })
  const { id } = useParams()
  const history = useHistory()

  function handlePlay (){

  }

  useEffect( () => {

    api.get(`/authors/${id}`, {
      validateStatus: (s) => s === 200
    })
    .then( response => {
      setAuthor(response.data)
    })
    .catch( dataError => {
      history.push("/notfound-error", {
        message: "Artista não encontrado"
      })
    })
  }, [ id, history ])

  return (
    <section className="card overflow-visible">

      <header className="card-header">
        <div className="card-title just-content-base">
          <div className="card-flex">

            <img src={ author.photo_url ? author.photo_url : imageDefault} className="shadow favorite-img cover" alt={author.name}/>
            <div className="card-favorite ml-5">
              <div className="float-favorite-details">

                <div className="float-favorite-details-type">Artista</div>
                <h3>{author.name}</h3>

                <div className="d-block mt-5">

                  <ComponentButtonsFavorite
                    type="author"
                    dataID={author.id}
                  />

                  <ComponentUIDropdown
                    button={<IconEllipsis height="32px" width="32px" />}
                  >
                    <ul>
                      <li className="item-list" >Copiar link do artista</li>
                    </ul>
                  </ComponentUIDropdown>
                </div>

              </div>
            </div>
            {/* End DIV card favorite */}
            
          </div>
        </div>
      </header>
      
      <div className="card-content card-page p-0">
        <div className="separator"></div>
        

        <section className="container-popular-tracks mb-4">
          <h4 className="mb-1 popular-tracks-title ">Populares</h4>

          <div className="content-popular-tracks">
            { author.tracks.length ? (
              author.tracks.map( (track, index) => (
              <div 
                key={track.id} 
                className={`songs-list ${player.id === parseInt(id) && player.playingIndex === index ? `active-hover` :``}`} 
                onDoubleClick={()=>handlePlay(index)}>
                <div className="songs-list-icon">
                  <IconMusicalNotes className="songs-list-icon-notes" width="22px" height="22px" />
                  <IconPlay className="songs-list-icon-play" width="22px" height="22px" />
                </div>
                <div className="songs-list-name d-flex">
                  <div className="author-track-popular-icon">
                    <img className="cover" src={track.album.photo_url} alt={`Imagem da musica ${track.title}`} />
                  </div>
                  <div className="ml-2 author-track-popular-title">
                    <a href={`/album/${track.album.id}`}>{track.name}</a>
                  </div>
                </div>
                <div className="songs-list-time py-3 pt-1">
                  <ComponentButtonsFavorite
                    type="track"
                    dataID={track.id}
                  />
                  <span className="ml-2">{secondsToMinutos(track.duration)}</span>
                </div>
              </div>
            ))
            ) : (
              <div className="text-center">
                <p>Não há musicas</p>
              </div>
            ) }
          </div>
        </section>

        <section className="container-author-album">
          <h4 className="mb-1 popular-author-title ">Albums</h4>

          <div className="content-author-album">
            
              <div className="container-card-image">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut facere dolorum, sapiente impedit dolore hic earum porro quis optio dolorem deserunt? At porro vero repellendus eligendi magnam illo alias unde.
              </div>

          </div>
        </section>

      </div>


    </section>
  )
}

const mapStateToProps = state => ({
  status: state.player.status,
  player: state.player.player
})
const mapDispatchToProps = dispatch => ({
  setStatus: (dataStatus) => dispatch(actionsPlayer.status(dataStatus)),
  setPlayIndex: (id, type, index) => dispatch(actionsThunkPlayer.setNewPlaylist(id, type, index)),
  setNewPlaylist: (id, type) => dispatch(actionsThunkPlayer.setNewPlaylist(id, type)),
  setAlert: (dataAlert) => dispatch(actionsAlert.set(dataAlert))
})

export default connect( mapStateToProps, mapDispatchToProps)(Author)