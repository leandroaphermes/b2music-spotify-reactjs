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
import ScreenMyLibrary from "./MyLibrary/MyLibrary";

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
                    <Route exact path="/" component={ScreenHome} />
                    <Route exact path="/search" component={ScreenSearch} />
                    <Route exact path="/search/:searchUrl" component={ScreenSearch} />
                    <Route exact path="/my-library/playlists" component={ScreenMyLibrary} />
                    <Route exact path="/my-library/authors" component={ScreenMyLibrary} />
                    <Route exact path="/favorite" component={() => <h3>Você ta nos favoritos</h3>} />
                    <Route exact path="/profile" component={ScreenProfile} />
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