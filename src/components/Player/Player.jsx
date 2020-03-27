import React, { useState, useEffect } from 'react';

import ComponentPlayerDetails from "./Details/Details";
import ComponentPlayerControl from "./Control/Control";
import ComponentPlayerVolume from "./Volume/Volume";

import "./Player.css";

export default function Player() {

    const [status, setStatus] = useState(false);
    const [timeTotal, setTimeTotal] = useState(null);
    const [currentNow, setCurrentNow] = useState(0);
    const [mouseDown, setMouseDown] = useState(false);
    const [random, setRandom] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [volume, setVolume] = useState({ now: (localStorage.getItem("volume")) ? localStorage.getItem("volume") : 50, last: null });
    const [player, setPlayer] = useState(JSON.parse(localStorage.getItem("player")));

    if(Object.keys(player.playing).length < 2){
        setPlayer(Object.assign(player, { playingIndex: 0, playing: player.playlist[0] }));
    }

    const [audio, setAudio] = useState(new Audio(player.playing.src));

    audio.oncanplaythrough = (() => {
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
        if(repeat === false) {
            next();
        }else{
            play();
        }
    });

    function play(){
        audio.play();
        setStatus(true);
    }
    function pause(){
        audio.pause();
        setStatus(false);
    }
    function tooglePlayPause(){
        if(status){
            pause();
        }else{
            play();
        }
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
        if(volume.last !== null){
            setVolume({ now: volume.last, last: null });
        }else{
            setVolume({ now: 0, last: volume.now });
        }
    }
    function next() {
        let nextSong = {
            playingIndex: 0,
            playing: player.playlist[0]
        };
        if(random){
            let rand = parseInt(Math.random() * ((Object.keys(player.playlist).length - 1) - 0) + 0);

            if(rand === player.playingIndex) rand++;

            if(player.playlist[rand]){
                nextSong.playingIndex = rand;
                nextSong.playing = player.playlist[rand];
            }
        }else{
            if(player.playlist[(player.playingIndex + 1)]){
                nextSong.playingIndex = (player.playingIndex + 1);
                nextSong.playing = player.playlist[(player.playingIndex + 1)];
            }
        }
        setPlayer(Object.assign(player, nextSong));
        audio.src = player.playing.src;
        audio.addEventListener("canplaythrough", () => {
            play();
        })
    }
    function back() {
        let nextSong = {
            playingIndex: 0,
            playing: player.playlist[0]
        };
        if(player.playlist[(player.playingIndex-1)]){
            nextSong.playingIndex = (player.playingIndex-1);
            nextSong.playing = player.playlist[(player.playingIndex-1)];
        }
        setPlayer(Object.assign(player, nextSong));
        audio.src = player.playing.src;
        audio.oncanplaythrough = () => {
            play();
        }
    }

    useEffect(() => {
        if(audio.volume !== (volume.now / 100)){
            audio.volume = volume.now / 100;
            localStorage.setItem("volume", volume.now);
        }
    }, [ volume, audio ]);
    useEffect(()=> {
        localStorage.setItem("player", JSON.stringify(player).toString());
    }, [ player ]);



    document.querySelector("body").onkeydown = ((e) => {
        e.preventDefault();
        switch (e.keyCode) {
            case 32:
            case 80:
            case 179:
                tooglePlayPause();
                break;
            case 176: 
                next();
                break;
            case 177: 
                back();
                break;
            case 38: 
                setVolume({
                    now: ((volume.now + 10) > 100) ? 100 : volume.now + 10,
                    last: null
                });
                break;
            case 40: 
                setVolume({
                    now: ((volume.now -10) > 0) ? volume.now -10 : 0,
                    last: ((volume.now -10) <= 0) ? volume.now -10 : null
                });
                break;


            default:
                break;
        }
    });
    return (
        <section className="player-container" id="player-container" aria-label="Tocador de Musica">
            <ComponentPlayerDetails
                title={player.playing.title}
                authors={player.playing.authors}
                album={player.playing.album}
            />
            <ComponentPlayerControl
                status={status} 
                btnPauseOnClick={pause}
                btnPlayOnClick={play}
                currentNow={currentNow}
                timeTotal={timeTotal}
                onMouseProgress={onMouseProgress}
                updateCurrentNow={updateCurrentNow}

                nextSong={next}
                backSong={back}

                random={random}
                randomOnClick={() => setRandom(!random) }
                repeat={repeat}
                repeatOnClick={() => setRepeat(!repeat) }


            />
            <ComponentPlayerVolume
                volume={volume.now}
                onChange={(eventVol) => { setVolume({ now: parseInt(eventVol.target.value), last: null }); }}
                onClickButtonMute={onClickButtonMute}
            />
        </section>
    )
}
