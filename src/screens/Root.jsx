import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"; 
import { Provider } from 'react-redux'

import { getSessionToken } from '../utils/utils';

import store from '../store/store'

/* Pages */
import RootRoutesAuth from './RootRoutesAuth'
import ScreenLogin from "./Login/Login";


const Routes = function() {

    const token = getSessionToken()
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Switch>
                    <Route exact path="/login" component={ScreenLogin} />
                    {(!token) ? <Redirect to="/login" />  : <RootRoutesAuth /> }
                </Switch>
            </Provider>
        </BrowserRouter>
    )
}

export default Routes;