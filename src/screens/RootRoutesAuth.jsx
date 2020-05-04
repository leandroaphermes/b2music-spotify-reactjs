import React from 'react'
import { Route } from "react-router-dom"; 

import ComponentsUIHeader from "../components/UI/Header/Header";
import ComponentsPlayer from "../components/Player/Player";

import ScreenHome from "./Home/Home";

const RootRoutesAuth = () => {
    return (
        <>
            <div className="container">
                <ComponentsUIHeader />
                <main className="body-content">
                    <Route exact path="/" component={ScreenHome} />
                    <Route exact path="/search" component={() => <h3>Você ta buscando</h3>} />
                </main>
            </div>
            <ComponentsPlayer />
        </>
    )
}

export default RootRoutesAuth