import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
      <header className="card-header">
        <div className="card-flex card-title">
          <NavLink exact to="/my-library/playlists" activeClassName="active-line">Playlists</NavLink>
          <NavLink exact to="/my-library/albums" activeClassName="active-line">Álbuns</NavLink>
          <NavLink exact to="/my-library/authors" activeClassName="active-line">Artistas</NavLink>
        </div>
      </header>
  )
}
