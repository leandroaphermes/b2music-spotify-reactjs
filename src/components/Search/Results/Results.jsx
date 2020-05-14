import React from 'react'

import ComponentsUICardsResults from '../../UI/Cards/Results/Results'

export default function Results(props) {

    function returnAuthors (authors){
        let authorsResult = "";
        authorsResult = authors.map( (author, index) =>
            <span key={author.id}>
                {index > 0 && ', '}
                <a href={`/artist/${author.id}`}>{author.name}</a>
            </span>
        )
        return authorsResult
    }

    return (
        <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                <div className="card">
                    <header className="card-header">
                        <div className="card-flex">
                            <div className="card-title">
                                <a href="">Musicas</a>
                            </div>
                            <div className="card-options">
                                <a href="">Mostar mais</a>
                            </div>
                        </div>
                    </header>
                    <div className="card-content card-page p-0">

                        {props.searchResults.tracks.map( tracks => (
                            <ComponentsUICardsResults 
                                key={tracks.id}
                                id={tracks.id}
                                title={tracks.name}
                                img={tracks.album.photo_url}
                                description={returnAuthors(tracks.authors)}
                            />
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}
