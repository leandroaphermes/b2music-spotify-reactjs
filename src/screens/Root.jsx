import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom"; 


import ComponentsUIHeader from "../components/UI/Header/Header";

import ScreenHome from "./Home/Home";


const HeaderImport = () => (
    <React.Fragment>
        <div className="container">
            <ComponentsUIHeader />
            <div className="body-content">
                <Route exact path="/" component={ScreenHome} />
                <Route exact path="/search" component={() => <h3>Você ta buscando</h3>} />
            </div>
        </div>
        <div className="player-container"></div>
    </React.Fragment>
);


const Routes = (props) => (
    <BrowserRouter>
        <Switch>
            <HeaderImport />
            {/* <Route exact path="/" component={ScreenHome} /> */}
        </Switch>
    </BrowserRouter>
);

export default Routes;