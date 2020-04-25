import React, { useEffect } from "react";

import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom"; 
import { getUser } from '../utils/utils'

import ComponentsUIHeader from "../components/UI/Header/Header";
import ComponentsPlayer from "../components/Player/Player";

import ScreenLogin from "./Login/Login";
import ScreenHome from "./Home/Home";

const HeaderBase = () => {
    const history = useHistory()

    useEffect(() => {
        const user = getUser()
        if(!user) history.push("/login")
    })

    return (
        <React.Fragment>
            <div className="container">
                <ComponentsUIHeader />
                <main className="body-content">
                    <Route exact path="/" component={ScreenHome} />
                    <Route exact path="/search" component={() => <h3>Você ta buscando</h3>} />
                </main>
            </div>
            <ComponentsPlayer />
        </React.Fragment>
    )
} 


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={ScreenLogin} />
            <HeaderBase />
        </Switch>
    </BrowserRouter>
);

export default Routes;