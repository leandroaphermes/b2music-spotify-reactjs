import React, { useState, useEffect } from 'react'

import api from '../../services/Api'

import ComponentCardsGenres from '../Cards/Genres/Genres'
import ComponentSearchResults from './Results/Results'


import "./Search.css"

const Search = function () {
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState({})

    function handleSearch(search){
        setSearch(search)
    }

    useEffect(() => {
        if(search.length > 0){

            const id = setTimeout(() => {
                api.get(`/search/${search}`)
                .then( response => {
                    
                    setSearchResults(response.data)
    
                })
                .catch( dataError => console.log("Erro API search", dataError))
            }, 800)
    
            return () => {
                clearInterval(id)
            }


        }
    }, [search])

    return (
        <div>
            <section className="card">
                <header className="card-header">
                    <div className="card-title">
                        <a href="">Buscar</a>
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
                    />

                </div>
            </section>
            { Object.keys(searchResults).length > 0 ? 
              <ComponentSearchResults searchResults={searchResults} />
            : <ComponentCardsGenres /> }
            
        </div>
    )
}

export default Search