import React from 'react'
import { Route, Redirect } from "react-router-dom"; 
import { connect } from 'react-redux';

import * as actionsSession from '../store/actions/session';
import { getSessionToken } from '../utils/utils';

import ComponentsUIHeader from "../components/UI/Header/Header";
import ComponentsPlayer from "../components/Player/Player";

import ScreenHome from "./Home/Home";
import ScreenProfile from "./Profile/Profile";

const RootRoutesAuth = function ({ session, setSession }) {

    const token = getSessionToken()
    if(!token) {
        setSession({})
        return <Redirect to="/login" />
    }
    
    return (
        <>
            <div className="container">
                <ComponentsUIHeader username={session.truename} />
                <main className="body-content">
                    <Route exact path="/" component={ScreenHome} />
                    <Route exact path="/search" component={() => <h3>Você ta buscando</h3>} />
                    <Route exact path="/my-library" component={() => <h3>Você ta na blibioteca</h3>} />
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