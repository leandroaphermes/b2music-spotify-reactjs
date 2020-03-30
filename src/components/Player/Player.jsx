import React, { useState, useEffect } from 'react';

import ComponentPlayerDetails from "./Details/Details";
import ComponentPlayerControl from "./Control/Control";
import ComponentPlayerVolume from "./Volume/Volume";

import "./Player.css";

const audio = new Audio();

export default function Player() {

    const [isLoaded, setIsLoaded] = useState(false);
    const [status, setStatus] = useState(false);
    const [currentNow, setCurrentNow] = useState(0);
    const [mouseDown, setMouseDown] = useState(false);
    const [random, setRandom] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [volume, setVolume] = useState({ now: (localStorage.getItem("volume")) ? parseInt(localStorage.getItem("volume")) : 50, last: null });
    const [player, setPlayer] = useState({
        playingIndex: 0,
        playing: {},
        playlist: []
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
        setStatus(false);
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
        
        console.log("Next -> SetPlayer -> assing", player);
        audio.src = player.playing.src;

        audio.oncanplaythrough = (() => {
            if(status){
                play();
            }
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
        audio.oncanplaythrough = (() => {
            if(status){
                play();
            }
        })
    }

    useEffect(() => {
        if(audio.volume !== (volume.now / 100)){
            audio.volume = volume.now / 100;
            localStorage.setItem("volume", volume.now);
        }
    }, [ volume ]);

    useEffect(()=> {
        localStorage.setItem("player", JSON.stringify(player));
    }, [ player ]);


    useEffect(() => {
        async function getDate(){
            await fetch("/data-fake/player.json")
            .then( function(response) { 
                if(response.status === 200){
                    response.json()
                    .then( (result)=> {
                        setPlayer({...result , playingIndex: 0, playing: result.playlist[0] });
                        audio.src = result.playlist[0].src;
                    })
                    .catch( function(error) { console.error(error) });
                }
            })
            .catch( function(error) { console.error(error) });
        }
        getDate();

        audio.addEventListener("canplaythrough", (e) => {
            setIsLoaded(true);
        });
        audio.ontimeupdate = (() => {
            if(audio.currentTime !== parseInt(currentNow) && !mouseDown){
                setCurrentNow(parseInt(audio.currentTime));
            }
        });
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
        return function(){
            audio.removeEventListener("canplaythrough", (e) => {
            setIsLoaded(true);
        });
        }

    }, [ ]);

    
    audio.onended = (() => {
        setIsLoaded(false);
        setStatus(false);
        audio.currentTime = 0;
        if(repeat === false) {
            next();
        }else{
            play();
        }
    });

    return (
        <section className="player-container" id="player-container" aria-label="Tocador de Musica">
            { isLoaded ? (
                <>
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
                        timeTotal={player.playing.duration}
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
                </>
            ) : (
                <span className="loading">Loading...</span>
            )}
        </section>
    )
}
