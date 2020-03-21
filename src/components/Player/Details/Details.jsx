import React from 'react'


import photoMusic from '../../../assets/img/music/Five-Hours-by-Deorro.jpg';

import "./Details.css";

export default function Details() {
    return (
        <div className="song-details">
            <div className="photo-mini-song">
                <img src={photoMusic} alt="Five Hours by Deorro" />
            </div>
            <div className="song-details-info">
                <div className="song-details-title">
                    <a href="#song-name">Five Hours</a>
                </div>
                <div className="song-details-author">
                    <a href="#song-name">Deorro</a>
                </div>
            </div>
        </div>
    )
}
