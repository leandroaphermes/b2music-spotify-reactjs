import React, { useState, useEffect } from 'react'


import imageDefault from '../../assets/img/music/default.jpg';
/* import { ReactComponent as IconPause } from "../../assets/img/icons/pause-outline.svg"; */
import { ReactComponent as IconPlay } from "../../assets/img/icons/play-outline.svg";

import "./Home.css";

export default function Home() {

    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState({})

    function play(playlistId){
        let playing = data.playlist.filter( item =>  {  return item.id === playlistId  } )[0];
        console.log(playing);
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
                <section className="card">
                    <header className="card-header">
                        <div className="card-flex">
                            <a href="#playlist" className="card-title">Feito para você</a>
                            <div className="card-options">
                                <a href="#all-playlist">Ver tudo</a>
                            </div>
                        </div>
                        <small className="card-small">Aqui sou smalll</small>
                    </header>
                    { isLoaded ? (
                        data.playlist.map( (playlist, key) => (
                            <article key={key} className="card-container">
                                <div className="card-content">
                                    <div className="image-album">
                                        <img src={playlist.photo ? playlist.photo : imageDefault } alt={playlist.name} />
                                    </div>
                                    <div className="song-describe mt-2">
                                        <div className="song-describe-title">
                                            {playlist.name}
                                        </div>
                                        <div className="song-describe-body">{playlist.describe}</div>
                                    </div>
                                    <div className="song-player">
                                        <button className="btn btn-primary btn-circle btn-shadow" onClick={() => play(playlist.id)}>
                                            <IconPlay />
                                        </button>
                                    </div>
                                </div>
                            </article>
                    ))
                    ): (
                        <h4 className="loading">Loading...</h4>
                    )}
                    
                </section>
            </div>
        </React.Fragment>
    )
}
