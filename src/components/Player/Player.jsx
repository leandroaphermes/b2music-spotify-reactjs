import React, { useState, useEffect } from 'react';

import ComponentPlayerDetails from "./Details/Details";
import ComponentPlayerControl from "./Control/Control";
import ComponentPlayerVolume from "./Volume/Volume";

import "./Player.css";

const audio = new Audio();


export default function Player() {

    const [isLoaded, setIsLoaded] = useState(false);
    const [status, setStatus] = useState(false);
    const [mouseUpProgress, setMouseUpProgress] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const [volume, setVolume] = useState({ now: 30, last: null });

    const [player, setPlayer] = useState({
        playingIndex: 0,
        playing: {},
        playlist: [ ]
    })

    function updateCurrentTime(newValue){
        setCurrentTime(newValue);
    }
    function onMouseProgress(event, type){
        console.log(event, type);
        if(event.nativeEvent.button === 0){
            console.log("Click: onMouseProgress");
            setMouseUpProgress(type);
            if(!type) audio.currentTime = currentTime
        }
    }

    function toogleMute() {
        if(volume.last !== null){
            setVolume({ now: volume.last, last: null });
        }else{
            setVolume({ now: 0, last: volume.now });
        }
    }

    function next(){
        let play = {
            playingIndex: 0,
            playing: player.playlist[0],
        }
        if(Object.keys(player.playlist).length > 1 && player.playlist[player.playingIndex+1]){
            play.playingIndex = player.playingIndex+1;
            play.playing = player.playlist[player.playingIndex+1];
        }
        setPlayer({...player, playing: play.playing,  playingIndex: play.playingIndex });
    }

    function eventPlay() {
        setStatus(oldStatus => {
            if(oldStatus){
                audio.play();
            }
            return (oldStatus === false) ? false : true;
        } );
    }

    useEffect(() => {
       
        fetch("/data-fake/player.json")
        .then( response => {
            if(response.status === 200){
                response.json()
                .then( data => {
                    
                    if(data.playlist[0] && Object.keys(data.playing).length === 0){
                        data.playing = data.playlist[0];
                    }
                    setPlayer(data);
                    setIsLoaded(true);

                })
                .catch( (err) => console.error(err) );
            }
        } )
        .catch( (err) => console.error(err) );
        
    }, [ ]);

    useEffect(() => {
        audio.volume = volume.now/100;
        console.log("---- AUDIO.volume Atualizou ----");
    }, [volume]);

    useEffect(() => {
        console.log("---- Player Atualizou ----");
        if(player.playing.src && audio.src !== player.playing.src){
            console.log("---- AUDIO.src Atualizou ----");
            audio.src = player.playing.src;
            audio.addEventListener("canplaythrough", eventPlay);
            return () => audio.removeEventListener("canplaythrough", eventPlay);
        }
    }, [player]);
    useEffect( () => {
        console.log("---- Status Atualizou ----");
        let timeInterval = null;
        if(status){
            audio.play();
            timeInterval = setInterval( () =>{
                if(!mouseUpProgress) setCurrentTime(Math.floor(audio.currentTime));
            }, 500);
        }else{
            audio.pause();
        }
        return () => clearInterval(timeInterval);
    }, [status, mouseUpProgress]);

    return (
        <section className="player-container" id="player-container" aria-label="Tocador de Musica">
            { isLoaded ? (
                <>
                    <ComponentPlayerDetails
                        {...player.playing}
                    />
                    <ComponentPlayerControl
                        status={status}
                        btnPauseOnClick={ e => setStatus(false)}
                        btnPlayOnClick={ e => setStatus(true)}

                        currentTime={currentTime}
                        timeTotal={player.playing.duration}
                        updateCurrentTime={ e => updateCurrentTime(parseInt(e.target.value)) }

                        onMouseDown={(e) => onMouseProgress(e, true)}
                        onMouseUp={(e) => onMouseProgress(e, false)}

                        nextSong={e => next()}

                    />
                    <ComponentPlayerVolume
                        volume={volume.now}
                        onClickMute={ e => toogleMute() }
                        onChange={ e => setVolume({ now: parseInt(e.target.value), last: null })}
                    />
                </>
            ) : (
                <span className="loading">Loading...</span>
            )}
        </section>
    )
}
