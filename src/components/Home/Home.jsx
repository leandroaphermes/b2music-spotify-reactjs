import React, { useState, useEffect } from 'react'

import ComponentUILoading from '../UI/Loading/Loading';

import imageDefault from '../../assets/img/music/default.jpg';
import { ReactComponent as IconPause } from "../../assets/img/icons/pause-outline.svg";
import { ReactComponent as IconPlay } from "../../assets/img/icons/play-outline.svg";

import "./Home.css";

const status = false;

export default function Home() {

    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState({})

    function play(e, playlistId, index){
        e.preventDefault();
        let playing = data.cards[index].playlists.find( playlist => { return playlist.id === playlistId } );
        alert("Você ta ouvindo " + playing.name);
    }
    

    useEffect(() => {
        
        fetch("/data-fake/home-playlist.json")
        .then( response => {
            if(response.status === 200){
                response.json()
                .then( data => {
                    setData(data);
                    setIsLoaded(true);
                })
                .catch();
            }
        })
        .catch();
        
    }, [])


    return (
        <React.Fragment>
            <div>
                { isLoaded ? (
                    data.cards.map( (cardItem, key) => (
                        <section key={key} className="card">
                            <header className="card-header">
                                <div className="card-flex">
                                    <a href={cardItem.url} className="card-title">{cardItem.title}</a>
                                    { cardItem.url && (
                                        <div className="card-options">
                                            <a href={cardItem.url}>{cardItem.textMore}</a>
                                        </div>
                                    )}
                                    
                                </div>
                                <small className="card-small">{cardItem.describe}</small>
                            </header>
                                {cardItem.playlists.map( (playlist, index) => (
                                    <article key={playlist.id} className="card-container">
                                        <a href={`/playlist/${playlist.id}`} className="d-block card-content">
                                            <div className="image-album">
                                                <img src={playlist.photoUrl ? playlist.photoUrl : imageDefault } alt={playlist.name} />
                                            </div>
                                            <div className="song-describe mt-2">
                                                <div className="song-describe-title">
                                                    {playlist.name}
                                                </div>
                                                <div className="song-describe-body">{playlist.describe}</div>
                                            </div>
                                            <div className="song-player">
                                                <button className="btn btn-primary btn-circle btn-shadow" onClick={(e) => play(e, playlist.id, index)}>
                                                    {(status) ? <IconPause /> : <IconPlay />}
                                                </button>
                                            </div>
                                        </a>
                                    </article>
                                )
                                )}
                        </section>
                    ))
                ): (
                    <ComponentUILoading />
                )}
            </div>
        </React.Fragment>
    )
}
