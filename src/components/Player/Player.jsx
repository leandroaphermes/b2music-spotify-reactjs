import React, { useState, useEffect } from 'react'

import ComponentPlayerDetails from "./Details/Details";
import ComponentPlayerControl from "./Control/Control";
import ComponentPlayerVolume from "./Volume/Volume";

import "./Player.css";

export default function Player() {

    const [timeTotal, setTimeTotal] = useState(null);
    const [volume, setVolume] = useState({ now: 30, last: null });
    const [status, setStatus] = useState(false);
    const [source, setSource] = useState("https://b2host.net/bensound-happyrock.mp3");
    const [audio, setAudio] = useState(new Audio(source));
    const [currentNow, setCurrentNow] = useState(0);
    const [mouseDown, setMouseDown] = useState(false);

    audio.addEventListener("loadeddata", () => {
        setTimeTotal(parseInt(audio.duration));
        setVolume({ now: volume.now, last: volume.last });
    });
    audio.ontimeupdate = (() => {
        if(audio.currentTime !== parseInt(currentNow) && !mouseDown){
            setCurrentNow(parseInt(audio.currentTime));
        }
    });
    audio.onended = (() => {
        setStatus(false);
        audio.currentTime = 0;
    });
    function playMusic(){
        audio.play();
        setStatus(true);
    }
    function pauseMusic(){
        audio.pause();
        setStatus(false);
    }
    function updateCurrentNow(event) {
        setCurrentNow(event.target.value);
    }
    function onMouseProgress(event, type) {
        if(event.nativeEvent.button === 0){
            setMouseDown(type); 
            if(!type) audio.currentTime = currentNow
        }
    }
    function onClickButtonMute(){
        console.log(volume);
        if(volume.last !== null){
            setVolume({ now: volume.last, last: null });
        }else{
            setVolume({ now: 0, last: volume.now });
        }
    }

    useEffect(() => {
        if(audio.volume !== (volume.now / 100)){
            audio.volume = volume.now / 100;
        }
    }, [ volume, audio ])








    return (
        <div className="player-container">
            <ComponentPlayerDetails />
            <ComponentPlayerControl
                status={status} 
                btnPauseOnClick={pauseMusic}
                btnPlayOnClick={playMusic}
                currentNow={currentNow}
                timeTotal={timeTotal}
                onMouseProgress={onMouseProgress}
                updateCurrentNow={updateCurrentNow}
            />
            <ComponentPlayerVolume
                volume={volume.now}
                onChange={(eventVol) => { setVolume({ now: parseInt(eventVol.target.value), last: null }); }}
                onClickButtonMute={onClickButtonMute}
            />
        </div>
    )
}
