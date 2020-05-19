import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';

import * as actionsPlayer from '../../store/actions/player'
import api from '../../services/Api'

import ComponentUIModal from '../UI/Modal/Modal'
import FormModal from './Form/Form'

import imageDefault from '../../assets/img/music/default.jpg';
import { ReactComponent as IconAddCircle } from "../../assets/img/icons/add-circle-outline.svg";
import { ReactComponent as IconPause } from "../../assets/img/icons/pause-outline.svg";
import { ReactComponent as IconPlay } from "../../assets/img/icons/play-outline.svg";

import "./MyLibrary.css"

const MyLibrary = function ({ player, setPlayer, status, setStatus }) {

    const [modalVisible, setModalVisible] = useState(false)
    const [data, setData] = useState([])

    function play(e, playlistId){
        e.preventDefault();

        if(status && playlistId === player.id) return setStatus(false)

        api.get(`/playlists/${playlistId}`)
        .then( response => {
            if(response.status === 200){
                
                const data = {
                    id: response.data.id,
                    playingIndex: 0,
                    playing: { },
                    playlist: response.data.tracks
                }

                if(data.playlist[0] && Object.keys(data.playing).length === 0){
                    data.playing = data.playlist[0];
                }

                localStorage.setItem('last_playlist', response.data.id)
                setPlayer(data);
                setStatus(true);
            }
        })
        .catch( dataError => {
            alert(`Erro de processo. Code: ${dataError.status}`)
        })
      
    }

    useEffect(() => {
        api.get("/me/playlists")
        .then( response => {
            if(response.status === 200){
                setData(response.data);
            }
        })
        .catch();
    }, [])

    return (
        <div>
            <ComponentUIModal 
                title="Criar playlist"
                visible={modalVisible}
                /* visible={true} */
                onClosed={() => setModalVisible(!modalVisible)}
            >
                <FormModal />
            </ComponentUIModal>
            <section className="card card-auto-rows">
                <header className="card-header">
                    <div className="card-flex card-title">
                        <NavLink exact to="/my-library/playlists" activeClassName="active-line">Playlists</NavLink>
                        <NavLink exact to="/my-library/albums" activeClassName="active-line">Álbuns</NavLink>
                        <NavLink exact to="/my-library/authors" activeClassName="active-line">Artistas</NavLink>
                    </div>
                </header>


                <div className="card-content">
                    <div 
                        className="image-album text-center mt-4 mb-5" 
                        onClick={() => setModalVisible(!modalVisible)}
                    >
                        <IconAddCircle max="100px" width="100%" height="100px" />
                    </div>
                    <div className="song-description mt-2">
                        <div className="song-description-title">
                            Criar nova Playlist
                        </div>
                        <div className="song-description-body">Crie nova playlist para ouvir mais tarde</div>
                    </div>
                </div>

                    {data.map( playlist => (
                        <div key={playlist.id} className="card-content">
                            <div className="image-album">
                                <img src={playlist.playlist.photo_url ? playlist.playlist.photo_url : imageDefault} alt={playlist.playlist.name} />
                            </div>
                            <div className="song-description mt-2">
                                <div className="song-description-title">
                                    {playlist.playlist.name}
                                </div>
                                <div className="song-description-body">{playlist.playlist.description}</div>
                            </div>
                            <div className="song-player">
                                <button className="btn btn-primary btn-circle btn-shadow" onClick={(e) => play(e, playlist.playlist.id)}>
                                        {(status && playlist.playlist.id === player.id) ? <IconPause /> : <IconPlay />}
                                    </button>
                            </div>
                        </div>
                    ))}

            </section>

        </div>
    )
}

const mapStateToProps = state => ({
    status: state.player.status,
    player: state.player.player,
})
const mapDispatchToProps = dispatch => ({
    setStatus: (status) => dispatch(actionsPlayer.status(status)),
    setPlayer: (data) => dispatch(actionsPlayer.set(data))
})

export default connect( mapStateToProps, mapDispatchToProps )(MyLibrary)