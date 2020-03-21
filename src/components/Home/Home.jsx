import React from 'react'


import imageDefault from '../../assets/img/music/default.jpg';
/* import { ReactComponent as IconPause } from "../../assets/img/icons/pause-outline.svg"; */
import { ReactComponent as IconPlay } from "../../assets/img/icons/play-outline.svg";

import "./Home.css";

export default function Home() {

    const response = {
            youMake : [
            {
                id: 1,
                name: "PlayList default",
                photo: imageDefault,
                describe: "PlayList default",
                url: "PlayList defaut"
            },
            {
                id: 2,
                name: "PlayList default 2",
                photo: imageDefault,
                describe: "PlayList default",
                url: "PlayList defaut"
            },
            {
                id: 3,
                name: "PlayList default 3",
                photo: imageDefault,
                describe: "PlayList default",
                url: "PlayList defaut"
            },
            {
                id: 4,
                name: "PlayList default 4",
                photo: imageDefault,
                describe: "PlayList default",
                url: "PlayList defaut"
            },
        ]
    }


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

                    {
                        response.youMake.map( (playlist, key) => (
                            <article key={key} className="card-container">
                                <div className="card-content">
                                    <div className="image-album">
                                        <img src={playlist.photo} alt={playlist.name} />
                                    </div>
                                    <div className="song-describe mt-2">
                                        <div className="song-describe-title">
                                            {playlist.name}
                                        </div>
                                        <div className="song-describe-body">{playlist.describe}</div>
                                    </div>
                                    <div className="song-player">
                                        <button className="btn btn-primary btn-circle btn-shadow">
                                            <IconPlay />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))
                    }
                    
                </section>
            </div>
        </React.Fragment>
    )
}
