import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import api from '../../services/Api'

import ComponentCardPlaylistImage from '../../components/Cards/PlaylistImage/PlaylistImage'
import ComponentCardsAlbumImage from '../../components/Cards/AlbumImage/AlbumImage'
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
        isLoaded ? (
            <div>
                <section className="card gap-row-none">
                    <header className="card-header mb-3">
                        <div className="card-flex">
                            <h3 className="card-title">Tocado recentemente</h3>
                        </div>
                        <small className="card-small">Playlists que você andou escutando recentimente</small>
                    </header>
                    {data.playlist_histories.map( (row) => (
                        row.album_id > 0 ? (
                            <ComponentCardsAlbumImage
                                key={row.id}
                                prefixRoute="/album/"
                                data={row.album}
                            />
                        ) : (
                            <ComponentCardPlaylistImage
                                key={row.id}
                                prefixRoute="/playlist/"
                                data={row.playlist}
                            />
                        )
                    ))}
                </section>

                <section className="card gap-row-none">
                    <header className="card-header mb-3">
                        <div className="card-flex">
                            <h3 className="card-title">Playlists em modo geral</h3>
                        </div>
                        <small className="card-small">Playlists que a galera estão ouvindo ou criando</small>
                    </header>
                    {data.playlist_all.map( (row) => (
                        <ComponentCardPlaylistImage
                            key={row.id}
                            prefixRoute="/playlist/"
                            data={row}
                        />
                    ))}
                </section>


                {data.cards.map( (cardItem) => (
                    cardItem.playlists.length > 0 && (
                        <section key={cardItem.id} className="card gap-row-none">
                            <header className="card-header mb-3">
                                <div className="card-flex">
                                    { cardItem.url && cardItem.url !== "" ? (
                                        <Link to={cardItem.url} className="card-title">{cardItem.title}</Link>
                                    ) : (
                                        <h3 className="card-title">{cardItem.title}</h3>
                                    )}
                                    { cardItem.url && cardItem.url && (
                                        <div className="card-options">
                                            <Link to={cardItem.url}>{cardItem.textMore}</Link>
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
        )
    )
}

export default Home
