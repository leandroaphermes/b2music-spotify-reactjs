import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import api from '../../services/Api'

import ComponentCardsGenres from '../../components/Cards/Genres/Genres'
import ComponentSearchResults from './Results/Results'
import ComponentLoading from '../../components/UI/Loading/Loading'


import "./Search.css"

const Search = function () {
    const history = useHistory() 
    const { searchUrl } = useParams() 
    const [search, setSearch] = useState( searchUrl ? searchUrl : "")
    const [searchResults, setSearchResults] = useState({})

    function handleSearch(search){
        setSearch(search)
        history.push(`/search/${search}`)
    }

    useEffect(() => {
        if(searchUrl && searchUrl.length > 0){
            const id = setTimeout(() => {
                api.get(`/search/${searchUrl}`)
                .then( response => {
                    setSearchResults(response.data)
                })
                .catch( dataError => console.log("Erro API search", dataError))
            }, 800)
            return () => {
                clearInterval(id)
            }
        }
    }, [searchUrl])

    return (
        <div>
            <section className="card">
                <header className="card-header">
                    <div className="card-title">
                        <a href="/search">Buscar</a>
                    </div>
                    <small className="card-small">Busque artistas, musicas ou podcast</small>
                </header>
                <div className="card-content card-page p-0">

                    <input
                        type="search" 
                        className="form-control" 
                        name="search" 
                        id="search"
                        placeholder="Busque artistas ou musicas"
                        autoCapitalize="off"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        autoFocus
                    />

                </div>
            </section>
            { searchUrl !== "" && Object.keys(searchResults).length > 0 ? 
                <ComponentSearchResults search={search} searchResults={searchResults} />
            : search !== "" ? 
                <ComponentLoading /> 
            : 
                <ComponentCardsGenres />
            }
        </div>
    )
}

export default Search