import React from 'react'
import { Route, Redirect } from "react-router-dom"; 
import { connect } from 'react-redux';

import * as actionsSession from '../store/actions/session';
import { getSessionToken } from '../utils/utils';

/* Header Components */
import ComponentsAlert from '../components/UI/Alert/Alert';
import ComponentsUIHeader from "../components/UI/Header/Header";
import ComponentsPlayer from "../components/Player/Player";

/* Pages Components */
import ScreenHome from "./Home/Home";
import ScreenProfile from "./Profile/Profile";
import ScreenSearch from "./Search/Search";
import ScreenMyLibraryPlaylists from "./MyLibrary/Playlists/Playlists";
import ScreenMyLibraryAlbums from "./MyLibrary/Albums/Albums";
import ScreenMyLibraryAuthors from "./MyLibrary/Authors/Authors";
/* import ScreenFavorite from './Favorite/Favorite' */
import ScreenPlaylist from './Playlist/Playlist'

/* Errors Pages */
import ScreenInternalError from './Errors/Internal/Internal'
import ScreenNotFoundError from './Errors/NotFound/NotFound'

const RootRoutesAuth = function ({ session, setSession }) {
    const token = getSessionToken()
    if(!token) {
        setSession({})
        return <Redirect to="/login" />
    }

    return (
        <>
            <div className="container">
                <ComponentsAlert />
                <ComponentsUIHeader username={session.truename} />
                <main className="body-content">
                    {/* Home */}
                    <Route exact path="/" component={ScreenHome} />
                    
                    {/* Search */}
                    <Route exact path="/search" component={ScreenSearch} />
                    <Route exact path="/search/:searchUrl" component={ScreenSearch} />

                    {/* MyLibrary */}
                    <Route exact path="/my-library/playlists" component={ScreenMyLibraryPlaylists} />
                    <Route exact path="/my-library/albums" component={ScreenMyLibraryAlbums} />
                    <Route exact path="/my-library/authors" component={ScreenMyLibraryAuthors} />
                    

                    {/* Playlist Show */}
                    <Route exact path="/playlist/:id" component={ScreenPlaylist} />

                    {/* <Route exact path="/favorite" component={ScreenFavorite} /> */}
                    <Route exact path="/profile" component={ScreenProfile} />
                    <Route exact path="/internal-error" component={ScreenInternalError} />
                    <Route exact path="/notfound-error" component={ScreenNotFoundError} />
                </main>
            </div>
            <ComponentsPlayer />
        </>
    )
}

const mapStateToProps = state => ({
    session: state.session.user
});
const mapDispatchToProps = dispatch => ({
    setSession: (sessionData) => dispatch(actionsSession.set(sessionData))
})

export default connect( mapStateToProps, mapDispatchToProps )(RootRoutesAuth)