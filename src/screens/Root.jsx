import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"; 
import { Provider } from 'react-redux'

import store from '../store/store'

/* Pages */
import RootRoutesAuth from './RootRoutesAuth'
import ScreenLogin from "./Login/Login";


const Routes = function() {
    console.log("Renderizou o routes: ");
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Switch>
                    <Route exact path="/login" component={ScreenLogin} />
                    <RootRoutesAuth />
                </Switch>
            </Provider>
        </BrowserRouter>
    )
}

export default Routes;