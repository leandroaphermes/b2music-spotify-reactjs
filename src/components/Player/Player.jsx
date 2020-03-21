import React from 'react'

import ComponentPlayerDetails from "./Details/Details";
import ComponentPlayerControl from "./Control/Control";
import ComponentPlayerVolume from "./Volume/Volume";

import "./Player.css";

export default function Player() {
    return (
        <div className="player-container">
            <ComponentPlayerDetails />
            <ComponentPlayerControl />
            <ComponentPlayerVolume />
        </div>
    )
}
