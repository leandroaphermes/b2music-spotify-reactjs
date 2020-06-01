import React, { useState, useEffect } from 'react'
import api from '../../services/Api'

import ComponentCardPlaylistImage from '../../components/Cards/PlaylistImage/PlaylistImage'
import ComponentUILoading from '../../components/UI/Loading/Loading';

import "./Home.css";

const Home = function () {

    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([])

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
                <section className="card gap-row-none">
                    <header className="card-header mb-3">
                        <div className="card-flex">
                            <h3 className="card-title">Tocado recentemente</h3>
                        </div>
                        <small className="card-small">Playlists que você andou escutando recentimente</small>
                    </header>
                        {data.playlist_histories.map( (playlist) => (
                            <ComponentCardPlaylistImage
                                key={playlist.id}
                                prefixRoute="/playlist/"
                                data={playlist.playlist}
                            />
                        ))}
                </section>
                {data.cards.map( (cardItem) => (
                    cardItem.playlists.length > 0 && (
                        <section key={cardItem.id} className="card gap-row-none">
                            <header className="card-header mb-3">
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

                                    <ComponentCardPlaylistImage
                                        key={playlist.id}
                                        prefixRoute="/playlist/"
                                        data={playlist}
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

export default Home
