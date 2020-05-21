import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import api from '../../services/Api'
import * as actionsPlayer from '../../store/actions/player'

import ComponentUICardPlaylistImage from '../UI/Cards/PlaylistImage/PlaylistImage'
import ComponentUILoading from '../UI/Loading/Loading';

import "./Home.css";

const Home = function ({ status, setStatus, player, setPlayer }) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([])

    function play(e, playlistId){
        e.preventDefault();
        
        if(status && playlistId === player.id) return setStatus(false)

        api.get(`/playlists/${playlistId}`, {
            validateStatus: (status) => status === 200
        })
        .then( response => {
            if(response.data.tracks.length > 0){
                
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
        api.get("/me/home-page", {
            validateStatus: (status) => status === 200
        })
        .then( response => {
            setData(response.data);
            setIsLoaded(true);
        })
        .catch();
    }, [])


    return (
        <div>
            { isLoaded ? (
                <div>
                <section className="card">
                    <header className="card-header">
                        <div className="card-flex">
                            <h3 className="card-title">Tocado recentemente</h3>
                        </div>
                        <small className="card-small">Playlists que você andou escutando recentimente</small>
                    </header>
                        {data.playlist_histories.map( (playlist) => (
                            <ComponentUICardPlaylistImage
                                key={playlist.id}
                                prefixRoute="/playlist/"
                                statusPlayer={status}
                                player={player}
                                data={playlist}
                                click={play}
                            />
                        ))}
                </section>
                {data.cards.map( (cardItem) => (
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

                                    <ComponentUICardPlaylistImage
                                        key={playlist.id}
                                        prefixRoute="/playlist/"
                                        statusPlayer={status}
                                        player={player}
                                        data={playlist}
                                        click={play}
                                    />
                                )
                                )}
                        </section>
                    )
                ))}
                </div>
            ): (
                <ComponentUILoading />
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    status: state.player.status,
    player: state.player.player,
})
const mapDispatchToProps = dispatch => ({
    setStatus: (status) => dispatch(actionsPlayer.status(status)),
    setPlayer: (dataPlayer) => dispatch(actionsPlayer.newPlaylist(dataPlayer))
})

export default connect( mapStateToProps, mapDispatchToProps)(Home)
