import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom"; 


import ComponentsUIHeader from "../components/UI/Header/Header";
import ComponentsPlayer from "../components/Player/Player";

import ScreenHome from "./Home/Home";



const HeaderBase = () => (
    <React.Fragment>
        <div className="container">
            <ComponentsUIHeader />
            <div className="body-content">
                <Route exact path="/" component={ScreenHome} />
                <Route exact path="/search" component={() => <h3>Você ta buscando</h3>} />
            </div>
        </div>
        <ComponentsPlayer />
    </React.Fragment>
);


const Routes = (props) => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={() => <h3>Você ta no Login</h3>} />
            <HeaderBase />
        </Switch>
    </BrowserRouter>
);

export default Routes;