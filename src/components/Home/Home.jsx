import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import api from '../../services/Api'
import * as actionsPlayer from '../../store/actions/player'

import ComponentUILoading from '../UI/Loading/Loading';

import imageDefault from '../../assets/img/music/default.jpg';
import { ReactComponent as IconPause } from "../../assets/img/icons/pause-outline.svg";
import { ReactComponent as IconPlay } from "../../assets/img/icons/play-outline.svg";

import "./Home.css";

const Home = function ({ status, setStatus, player, setPlayer }) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState({})

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
        api.get("/cards/home-page")
        .then( response => {
            if(response.status === 200){
                setData(response.data);
                setIsLoaded(true);
            }
        })
        .catch();
    }, [])


    return (
        <React.Fragment>
            <div>
                { isLoaded ? (
                    data.map( (cardItem) => (
                        cardItem.playlists.length > 0 && (
                            <section key={cardItem.id} className="card">
                                <header className="card-header">
                                    <div className="card-flex">
                                        <a href={cardItem.url} className="card-title">{cardItem.title}</a>
                                        { cardItem.url && (
                                            <div className="card-options">
                                                <a href={cardItem.url}>{cardItem.textMore}</a>
                                            </div>
                                        )}
                                        
                                    </div>
                                    <small className="card-small">{cardItem.description}</small>
                                </header>
                                    {cardItem.playlists.map( (playlist) => (
                                        <article key={playlist.id} className="card-container">
                                            <a href={`/playlist/${playlist.id}`} className="d-block card-content">
                                                <div className="image-album">
                                                    <img src={playlist.photo_url ? playlist.photo_url : imageDefault } alt={playlist.name} />
                                                </div>
                                                <div className="song-description mt-2">
                                                    <div className="song-description-title">
                                                        {playlist.name}
                                                    </div>
                                                    <div className="song-description-body hide-text-two-lines">{playlist.description}</div>
                                                </div>
                                                <div className="song-player">
                                                    <button className="btn btn-primary btn-circle btn-shadow" onClick={(e) => play(e, playlist.id)}>
                                                        {(status && playlist.id === player.id) ? <IconPause /> : <IconPlay />}
                                                    </button>
                                                </div>
                                            </a>
                                        </article>
                                    )
                                    )}
                            </section>
                        )
                    ))
                ): (
                    <ComponentUILoading />
                )}
            </div>
        </React.Fragment>
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

export default connect( mapStateToProps, mapDispatchToProps)(Home)
