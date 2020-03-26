import React, { useState, useEffect } from 'react';

import ComponentPlayerDetails from "./Details/Details";
import ComponentPlayerControl from "./Control/Control";
import ComponentPlayerVolume from "./Volume/Volume";

import "./Player.css";

export default function Player() {

    const [timeTotal, setTimeTotal] = useState(null);
    const [volume, setVolume] = useState({ now: (localStorage.getItem("volume")) ? localStorage.getItem("volume") : 50, last: null });
    const [status, setStatus] = useState(false);
    const [currentNow, setCurrentNow] = useState(0);
    const [mouseDown, setMouseDown] = useState(false);
    /* localStorage.getItem("player", JSON.(player)) */
    const [player, setPlayer] = useState({
        listeningIndex: null,
        listening: { },

        playlist: [
            {
                id: 1,
                title: "Happy Rock",
                authors: [
                    {
                        id: 1,
                        name: "Desconhecido"
                    }
                ],
                album: {
                    id: 1,
                    title: "Free Sounds"
                },
                photo_src: "",
                src: "https://b2host.net/music/bensound-happyrock.mp3",
                duration: 105
            },
            {
                id: 2,
                title: "Andless Motion",
                authors: [
                    {
                        id: 1,
                        name: "Desconhecido Motion"
                    },
                    {
                        id: 2,
                        name: "Motion Sounds"
                    }
                ],
                album: {
                    id: 1,
                    title: "Free Sounds"
                },
                photo_src: "",
                src: "https://b2host.net/music/bensound-endlessmotion.mp3",
                duration: 180
            },
            {
                id: 3,
                title: "Dreams",
                authors: [
                    {
                        id: 1,
                        name: "Desconhecido Motion"
                    }
                ],
                album: {
                    id: 1,
                    title: "Free Sounds"
                },
                photo_src: "",
                src: "https://b2host.net/music/bensound-dreams.mp3",
                duration: 210
            },
            {
                id: 4,
                title: "Dance",
                authors: [
                    {
                        id: 1,
                        name: "Desconhecido Dence"
                    }
                ],
                album: {
                    id: 1,
                    title: "Free Sounds"
                },
                photo_src: "",
                src: "https://b2host.net/music/bensound-dance.mp3",
                duration: 177
            }
        ]
    })

    if(Object.keys(player.listening).length < 2){
        setPlayer(Object.assign(player, { listeningIndex: 0, listening: player.playlist[0] }));
    }

    const [audio, setAudio] = useState(new Audio(player.listening.src));

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
        next();
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
        if(volume.last !== null){
            setVolume({ now: volume.last, last: null });
        }else{
            setVolume({ now: 0, last: volume.now });
        }
    }
    function next() {
        let nextSong = {
            listeningIndex: 0,
            listening: player.playlist[0]
        };
        if(player.playlist[player.listeningIndex+1]){
            nextSong.listeningIndex = player.listeningIndex+1;
            nextSong.listening = player.playlist[player.listeningIndex+1];
        }
        setPlayer(Object.assign(player, nextSong));
        audio.src = player.listening.src;
        audio.oncanplay = () => {
            playMusic();
        }
    }
    function back() {
        let nextSong = {
            listeningIndex: 0,
            listening: player.playlist[0]
        };
        if(player.playlist[player.listeningIndex-1]){
            nextSong.listeningIndex = player.listeningIndex-1;
            nextSong.listening = player.playlist[player.listeningIndex-1];
        }
        setPlayer(Object.assign(player, nextSong));
        audio.src = player.listening.src;
        audio.oncanplay = () => {
            playMusic();
        }
    }

    useEffect(() => {
        if(audio.volume !== (volume.now / 100)){
            audio.volume = volume.now / 100;
            localStorage.setItem("volume", volume.now);
        }
    }, [ volume, audio ]);

/*     useEffect(()=> {
        localStorage.setItem("player", JSON.stringify(player)); 
    }, [ player ]); */









    return (
        <section className="player-container">
            <ComponentPlayerDetails
                title={player.listening.title}
                authors={player.listening.authors}
                album={player.listening.album}
            />
            <ComponentPlayerControl
                status={status} 
                btnPauseOnClick={pauseMusic}
                btnPlayOnClick={playMusic}
                currentNow={currentNow}
                timeTotal={timeTotal}
                onMouseProgress={onMouseProgress}
                updateCurrentNow={updateCurrentNow}

                nextSong={next}
                backSong={back}
            />
            <ComponentPlayerVolume
                volume={volume.now}
                onChange={(eventVol) => { setVolume({ now: parseInt(eventVol.target.value), last: null }); }}
                onClickButtonMute={onClickButtonMute}
            />
        </section>
    )
}
