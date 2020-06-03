import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"; 
import { Provider } from 'react-redux'

import store from '../store/store'

/* Pages */
import RootRoutesAuth from './RootRoutesAuth'
import ScreenLogin from "./Login/Login";
import ScreenLogout from "./Logout/Logout.jsx";


const Routes = function() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Switch>
                    <Route exact path="/login" component={ScreenLogin} />
                    <Route exact path="/logout" component={ScreenLogout} />
                    <RootRoutesAuth />
                </Switch>
            </Provider>
        </BrowserRouter>
    )
}

export default Routes;