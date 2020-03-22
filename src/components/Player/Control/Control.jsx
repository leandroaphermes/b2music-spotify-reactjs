import React, { useState } from 'react'

import ComponentProgressBar from '../../UI/ProgressBar/ProgressBar';

import { ReactComponent as IconShuflle } from "../../../assets/img/icons/shuffle-outline.svg";
import { ReactComponent as IconPlaySkipBack } from "../../../assets/img/icons/play-skip-back-outline.svg";
import { ReactComponent as IconPause } from "../../../assets/img/icons/pause-outline.svg";
import { ReactComponent as IconPlay } from "../../../assets/img/icons/play-outline.svg";
import { ReactComponent as IconPlaySkipForward } from "../../../assets/img/icons/play-skip-forward-outline.svg";
import { ReactComponent as IconRepeat } from "../../../assets/img/icons/repeat-outline.svg";


import "./Control.css";



export default function Control() {

    const [timeTotal, setTimeTotal] = useState(null);
    const [volume, setVolume] = useState(1);
    const [status, setStatus] = useState(false);
    const [source, setSource] = useState("https://b2host.net/bensound-happyrock.mp3");
    const [audio, setAudio] = useState(new Audio(source));
   
    const [currentProgress, setCurrentProgress] = useState(0);
    const [currentNow, setCurrentNow] = useState(0);

    audio.addEventListener("loadeddata", () => {
        setTimeTotal(parseInt(audio.duration));
        setNewVolume(volume);
    });
    audio.ontimeupdate = (() => {
        if(parseInt(audio.currentTime) !== parseInt(currentNow)){
            setCurrentProgress( (parseInt(audio.currentTime) / timeTotal) * 100 );
            setCurrentNow(audio.currentTime);
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
    function setNewVolume(newVolume){
        audio.volume = newVolume / 100;
    }

    function clickProgressBar(e){
        let element = e.target;
        if(element.id !== 'song-time-progress'){
           element = e.target.parentElement;
        }
        audio.currentTime = audio.duration * (window.event.offsetX / element.offsetWidth);
    }

    function secondsToMinutos(time){
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
    }


    return (
        <div className="song-control">
            <div className="song-control-controls">

                <button type="button" className="btn btn-clean mr-1" title="Ordem Aleatoria"><IconShuflle /></button>

                <button type="button" className="btn btn-clean mr-1" title="Anterior"><IconPlaySkipBack /></button>

                { status ? (
                    <button type="button" id="pause" className="btn btn-clean mr-1" title="Pause" onClick={pauseMusic}><IconPause /></button>
                ) : (
                    <button type="button" id="play" className="btn btn-clean mr-1" title="Play" onClick={playMusic}><IconPlay /></button>
                )
                }
                
                

                <button type="button" className="btn btn-clean mr-1" title="Próxima"><IconPlaySkipForward /></button>

                <button type="button" className="btn btn-clean" title="Repetir"><IconRepeat /></button>

            </div>
            <div className="song-control-controls-progress-bar">
                <span id="song-time-current">{secondsToMinutos(currentNow)}</span>
                    <ComponentProgressBar cicle={true} now={currentProgress}  onClick={clickProgressBar} id="song-time-progress" />
                <span id="song-time-total">{secondsToMinutos(timeTotal)}</span>
            </div>
        </div>
    )
}
