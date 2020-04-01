import React, { useState, useEffect } from 'react';

import ComponentPlayerDetails from "./Details/Details";
import ComponentPlayerControl from "./Control/Control";
import ComponentPlayerVolume from "./Volume/Volume";

import "./Player.css";

const audio = new Audio();


export default function Player() {

    const [isLoaded, setIsLoaded] = useState(false);
    const [status, setStatus] = useState(false);

    const [random, setRandom] = useState(false);
    const [repeat, setRepeat] = useState(false);

    const [mouseUpProgress, setMouseUpProgress] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const [volume, setVolume] = useState(localStorage.getItem("volume") !== "" ? JSON.parse(localStorage.getItem("volume")) : { now: 30, last: null } );

    const [player, setPlayer] = useState({
        playingIndex: 0,
        playing: {},
        playlist: [ ]
    })

    function updateCurrentTime(newValue){
        setCurrentTime(newValue);
    }
    function onMouseProgress(event, type){
        if(event.nativeEvent.button === 0){
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
        if(random){
            let rand = parseInt(Math.random() * ((Object.keys(player.playlist).length - 1) - 0) + 0);

            if(rand === player.playingIndex) rand++;

            if(player.playlist[rand]){
                play.playingIndex = rand;
                play.playing = player.playlist[rand];
            }
        }else{
            
            if(Object.keys(player.playlist).length > 1 && player.playlist[player.playingIndex+1]){
                play.playingIndex = player.playingIndex+1;
                play.playing = player.playlist[player.playingIndex+1];
            }
        }

        setPlayer({...player, playing: play.playing,  playingIndex: play.playingIndex });
    }
    function back(){
        let play = {
            playingIndex: 0,
            playing: player.playlist[0],
        }
        if(Object.keys(player.playlist).length > 1 && player.playlist[player.playingIndex-1]){
            play.playingIndex = player.playingIndex-1;
            play.playing = player.playlist[player.playingIndex-1];
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

    /* Executa query na API pegando a playlist */
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

    /* Alteração de State volume afeta o som */
    useEffect(() => {
        audio.volume = volume.now/100;
        localStorage.setItem("volume", JSON.stringify(volume).toString());
        console.log("---- AUDIO.volume Atualizou ----");
    }, [volume]);

    /* Alteração no State player afeta o source do Audio */
    useEffect(() => {
        console.log("---- Player Atualizou ----");
        if(player.playing.src && audio.src !== player.playing.src){
            console.log("---- AUDIO.src Atualizou ----");
            audio.src = player.playing.src;
            audio.addEventListener("canplaythrough", eventPlay);

            return () => {
                audio.removeEventListener("canplaythrough", eventPlay);
            };
        }
    }, [player]);

    /* Alteração no State status & mouseUpProgress afeta o play e pause do Audio */
    useEffect( () => {
        console.log("---- Status Atualizou ----");
        let timeInterval = null;
        if(status){
            audio.play();
            timeInterval = setInterval( () =>{
                console.log("Atualizando setInterval");
                if(!mouseUpProgress) setCurrentTime(Math.floor(audio.currentTime));
            }, 500);
        }else{
            audio.pause();
        }
        return () => clearInterval(timeInterval);
    }, [status, mouseUpProgress]);

    
    audio.onended = (() => {
        if(!repeat){
            next();
        }else{
            audio.currentTime = 0;
            audio.play();
        }
    });

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

                        onMouseDown={e => onMouseProgress(e, true)}
                        onMouseUp={ e => onMouseProgress(e, false)}

                        nextSong={() => next()}
                        backSong={() => back()}

                        random={random}
                        randomOnClick={() => setRandom(!random)}
                        repeat={repeat}
                        repeatOnClick={() => setRepeat(!repeat)}

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
