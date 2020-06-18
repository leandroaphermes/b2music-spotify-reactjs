import React from 'react'
import { Link } from 'react-router-dom'

import ComponentsUICardsResults from '../../../components/UI/Cards/Results/Results'

import { ReactComponent as IconUserDefault } from '../../../assets/img/icons/person-outline.svg'


export default function Results(props) {

    function returnAuthors (authors){
        let authorsResult = "";
        authorsResult = authors.map( (author, index) =>
            <span key={author.id}>
                {index > 0 && ', '}
                <Link to={`/author/${author.id}`}>{author.name}</Link>
            </span>
        )
        return authorsResult
    }

    return (
        <div className="row">
            
            {/* Tracks */}
            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 py-2">
                <div className="card">
                    <header className="card-header">
                        <div className="card-flex">
                            <div className="card-title">
                                <Link to={`/search/${props.search}/tracks`}>Musicas</Link>
                            </div>
                            <div className="card-options">
                                { props.searchResults.tracks.total > 5 && (
                                    <Link to={`/search/${props.search}/tracks`}>Mostrar mais</Link>
                                )}
                            </div>
                        </div>
                    </header>
                    <div className="card-content card-page p-0">
                        
                        { props.searchResults.tracks.data.length > 0
                            ? props.searchResults.tracks.data.map( tracks => (
                                <ComponentsUICardsResults
                                    key={tracks.id}
                                    href={`/album/${tracks.album.id}`}
                                    id={tracks.id}
                                    title={tracks.name}
                                    img={tracks.album.photo_url}
                                    description={returnAuthors(tracks.authors)}
                                />
                            )) 
                            : (
                                <p>Não há resultados</p>
                            )
                        }

                    </div>
                </div>
            </div>
            
            {/* Playlists */}
            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 py-2">
                <div className="card">
                    <header className="card-header">
                        <div className="card-flex">
                            <div className="card-title">
                                <Link to={`/search/${props.search}/playlists`}>Playlists</Link>
                            </div>
                            <div className="card-options">
                                { props.searchResults.playlists.total > 5 && (
                                    <Link to={`/search/${props.search}/playlists`}>Mostrar mais</Link>
                                )}
                            </div>
                        </div>
                    </header>
                    <div className="card-content card-page p-0">
                        
                        { props.searchResults.playlists.data.length > 0
                            ? props.searchResults.playlists.data.map( playlist => (
                                <ComponentsUICardsResults
                                    key={playlist.id}
                                    href={`/playlist/${playlist.id}`}
                                    id={playlist.id}
                                    title={playlist.name}
                                    img={playlist.photo_url}
                                    description={(<Link to={`/user/${playlist.owner.username}`}>{playlist.owner.truename}</Link>)}
                                />
                            )) 
                            : (
                                <p>Não há resultados</p>
                            )
                        }

                    </div>
                </div>
            </div>
                      
            {/* Authors */}
            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 py-2">
                <div className="card">
                    <header className="card-header">
                        <div className="card-flex">
                            <div className="card-title">
                                <Link to={`/search/${props.search}/authors`}>Autores</Link>
                            </div>
                            <div className="card-options">
                                { props.searchResults.authors.total > 5 && (
                                    <Link to={`/search/${props.search}/authors`}>Mostrar mais</Link>
                                )}
                            </div>
                        </div>
                    </header>
                    <div className="card-content card-page p-0">
                        
                        { props.searchResults.authors.data.length > 0
                            ? props.searchResults.authors.data.map( authors => (
                                <ComponentsUICardsResults
                                    key={authors.id}
                                    href={`/author/${authors.id}`}
                                    id={authors.id}
                                    title={authors.name}
                                    img={authors.photo_url}
                                    description="Artista"
                                />
                            )) 
                            : (
                                <p>Não há resultados</p>
                            )
                        }

                    </div>
                </div>
            </div>
           
            {/* Albums */}
            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 py-2">
                <div className="card">
                    <header className="card-header">
                        <div className="card-flex">
                            <div className="card-title">
                                <Link to={`/search/${props.search}/albums`}>Albums</Link>
                            </div>
                            <div className="card-options">
                                { props.searchResults.albums.total > 5 && (
                                    <Link to={`/search/${props.search}/albums`}>Mostrar mais</Link>
                                )}
                            </div>
                        </div>
                    </header>
                    <div className="card-content card-page p-0">
                        
                        { props.searchResults.albums.data.length > 0
                            ? props.searchResults.albums.data.map( albums => (
                                <ComponentsUICardsResults
                                    key={albums.id}
                                    href={`/album/${albums.id}`}
                                    id={albums.id}
                                    title={albums.name}
                                    img={albums.photo_url}
                                    description={returnAuthors([ albums.author ])}
                                />
                            )) 
                            : (
                                <p>Não há resultados</p>
                            )
                        }

                    </div>
                </div>
            </div>

            {/* Users */}
            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 py-2">
                <div className="card">
                    <header className="card-header">
                        <div className="card-flex">
                            <div className="card-title">
                                <Link to={`/search/${props.search}/users`}>Usuarios</Link>
                            </div>
                            <div className="card-options">
                                { props.searchResults.users.total > 5 && (
                                    <Link to={`/search/${props.search}/users`}>Mostrar mais</Link>
                                )}
                            </div>
                        </div>
                    </header>
                    <div className="card-content card-page p-0">
                        
                        { props.searchResults.users.data.length > 0
                            ? props.searchResults.users.data.map( users => (
                                <ComponentsUICardsResults
                                    key={users.id}
                                    href={`/users/${users.id}`}
                                    id={users.id}
                                    title={users.truename}
                                    svg={<IconUserDefault width="40" height="40" />}
                                    description="Usuario"
                                />
                            )) 
                            : (
                                <p>Não há resultados</p>
                            )
                        }

                    </div>
                </div>
            </div>

        </div>
    )
}
