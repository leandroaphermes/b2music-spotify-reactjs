import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import api from '../../../services/Api'
import * as actionsPlayer from '../../../store/actions/player'

import ComponentHeader from '../Header'
import ComponentUICardPlaylistImage from '../../../components/UI/Cards/PlaylistImage/PlaylistImage'

const Albums = function ({ player, setPlayer, statusPlayer }) {

  const [albums, setAlbums] = useState([])

  function play(){
    
  }

  useEffect( ()=> {

    api.get("/me/albums", {
      validateStatus: (status) => status === 200
    })
    .then( response => {
      setAlbums(response.data)
    })
    .catch( dataError => {
      console.log(dataError)
    })

  }, [ ])

  return (
    <div>
      <section className="card card-auto-rows">
        <ComponentHeader />

        { albums.map( album => (
          <ComponentUICardPlaylistImage
            key={album.id}
            prefixRoute="/album/"
            data={album.album}
            click={(e) => play()}
            player
            statusPlayer
          />
        ))}
      </section>
    </div>
  )
}

const mapStateToProps =  state => ({
  statusPlayer: state.player.status,
  player: state.player.player,
})

const mapDispatchToProps = dispatch => ({
  setPlayer: (dataPlayer) => dispatch(actionsPlayer.newPlaylist(dataPlayer))
})

export default connect(mapStateToProps, mapDispatchToProps)(Albums)