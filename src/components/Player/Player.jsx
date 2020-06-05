import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import api from '../../services/Api'
import * as actionsPlayer from '../../store/actions/player'

import ComponentUILoading from '../UI/Loading/Loading';

import ComponentPlayerDetails from "./Details/Details";
import ComponentPlayerControl from "./Control/Control";
import ComponentPlayerVolume from "./Volume/Volume";

import "./Player.css";

 const Player = function({ player, setPlayer, status, setStatus }) {

    const [isLoaded, setIsLoaded] = useState(0);
    const [audio] = useState(new Audio())

    const [random, setRandom] = useState(false);
    const [repeat, setRepeat] = useState(false);

    const [mouseUpProgress, setMouseUpProgress] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const [volume, setVolume] = useState(localStorage.getItem("volume") !== null ? JSON.parse(localStorage.getItem("volume")) : { now: 30, last: null } );

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


    /* Executa query na API pegando a playlist */
    useEffect(() => {

        function getLastPlaylist(){
            const lastPlayerID = parseInt(localStorage.getItem('last_player_id')) || 0
            const lastPlayerType = localStorage.getItem('last_player_type') || null
            
            if(lastPlayerID > 0 || lastPlayerType){
                api.get(`/${lastPlayerType}/${lastPlayerID}`)
                    .then( (response) => {
                        if(response.status === 200){
                            
                            const data = {
                                id: response.data.id,
                                playingIndex: 0,
                                playing: { },
                                playlist: response.data.tracks
                            }

                            if(data.playlist[0] && Object.keys(data.playing).length === 0){
                                data.playing = data.playlist[0];
                            }

                            if(data.playlist.length > 0) {
                                
                                localStorage.setItem('last_player_id', response.data.id)
                                localStorage.setItem('last_player_type', lastPlayerType)
                                
                                setPlayer(data);
                                setIsLoaded(2);
                            }
                            
                        }
                    })
                    .catch( (err) => console.error(err) )
            } else{
                setIsLoaded(1)
            }
        }
        getLastPlaylist()
    }, [setPlayer]);

    useEffect(() => {
        return () => {
            audio.pause()
        }
    }, [ audio ])

    /* Alteração de State volume afeta o som */
    useEffect(() => {
        audio.volume = volume.now/100;
        localStorage.setItem("volume", JSON.stringify(volume).toString());
        console.log("---- AUDIO.volume Atualizou ----");
    }, [volume, audio]);

    /* Alteração no State player afeta o source do Audio */
    useEffect(() => {
        function eventPlay() {
            if(status){
                audio.play()
            }
        }
        console.log("---- Player Atualizou ----");
        if(player.playing.src && audio.src !== player.playing.src){
            console.log("---- AUDIO.src Atualizou ----");
            audio.src = player.playing.src;
            document.title = `${player.playing.name} | B2 Music - Spotify Clone`
            audio.addEventListener("canplaythrough", eventPlay);

            return () => {
                audio.removeEventListener("canplaythrough", eventPlay);
            };
        }
    }, [player, status, audio]);

    /* Alteração no State status & mouseUpProgress afeta o play e pause do Audio */
    useEffect( () => {
        console.log("---- Status Atualizou ----");
        let timeInterval = null;
        if(status){
            setIsLoaded(2)
            audio.play();
            timeInterval = setInterval( () =>{
                console.log("Atualizando setInterval");
                if(!mouseUpProgress) setCurrentTime(Math.floor(audio.currentTime));
            }, 500);
        }else{
            audio.pause();
        }
        return () => clearInterval(timeInterval);
    }, [status, mouseUpProgress, audio]);


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
            { isLoaded === 2 && player.playing.id ? (
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
            ) : isLoaded === 1 ? (
                <p className="grid-text-center">
                    Esta muito parado aqui
                    <br/>
                    Escolha uma Playlist ou Album
                </p>
            ) : (
                <ComponentUILoading />
            )}
        </section>
    )
}

const mapStateToProps = state => ({
    player: state.player.player,
    status: state.player.status
})

const mapDispatchToProps = dispatch => ({
    setPlayer: (data)=> dispatch(actionsPlayer.set(data)),
    setStatus: (status)=> dispatch(actionsPlayer.status(status))
})

export default connect( mapStateToProps, mapDispatchToProps)(Player)