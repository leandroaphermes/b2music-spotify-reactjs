import React, { Fragment, memo } from 'react'


import photoMusic from '../../../assets/img/music/default.jpg';

import "./Details.css";

const Details = function(props) {
    return (
        <div className="song-details" aria-label="Informação da musica atual">
            <div className="photo-mini-song">
                <a href={`/album/${props.album.id}`}><img src={(props.photo) ? props.photo : photoMusic} alt={props.title} /></a>
            </div>
            <div className="song-details-info">
                <div className="song-details-title">
                    <a href={`/album/${props.album.id}`}>{props.title}</a>
                </div>
                <div className="song-details-author">
                    { props.authors.map( (author, index) => 
                            <Fragment key={index}>
                                {index > 0 && ', '}
                                <a href={`/artist/${author.id}`}>{author.name}</a>
                            </Fragment>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default memo(Details);