import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import api from '../../../services/Api'
import * as aciotnsAlert from '../../../store/actions/alert'

import photoMusic from '../../../assets/img/music/default.jpg'

import "./Genres.css"

const Genres = function ({ setAlert }) {
    const [genres, setGenres ] = useState([])

    useEffect(() => {

        api.get('/genres')
        .then( response => {

            setGenres(response.data)

        })
        .catch( dataError => {
            setAlert({
                status: true,
                type: "danger",
                message: dataError.response.data.message,
            })
        })

    }, [setAlert])
    
    return (
        <section className="card card-auto-rows">
            <header className="card-header">
                <div className="card-title">
                    Navegar por todas as seções
                </div>
            </header>
            {genres.map( genre => (
                <div key={genre.id} className="card-content genre-container" style={{ backgroundColor: `#${genre.color}` }} >
                    <a href={genre.url}>
                        <div className="genre-songs">
                            <div className="genre-song-title">
                                {genre.name}
                            </div>
                            <img className="genre-song-photo" src={photoMusic} alt="{genre.name}" />
                        </div>
                    </a>
                </div>
                )
            )}
        </section>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    setAlert: (alertData) => dispatch(aciotnsAlert.set(alertData))
})

export default connect( mapStateToProps, mapDispatchToProps)(Genres)
