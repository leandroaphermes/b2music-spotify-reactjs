import React, { useState, useEffect } from 'react'

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
    const [volume, setVolume] = useState(70);
    const [status, setStatus] = useState(false);
    const [source, setSource] = useState("https://b2host.net/bensound-happyrock.mp3");
    const [audio, setAudio] = useState(new Audio(source));

    let pxPorcent = 0;
    

    useEffect(() => {
        audio.addEventListener("loadeddata", (meta) => {
            console.log(audio.duration);
            setTimeTotal(parseInt(audio.duration));
            
           

            pxPorcent = durationCalcule();
            /* audio.play(); */
        });

    });

    function durationCalcule(){
        const progressEl = document.getElementById("song-time-progress");
        return (progressEl.offsetWidth / 100) * (timeTotal / 100);
    }

    function playMusic(){
        audio.play();
    }

    function tooglePlayPause(){
        setStatus(!status);
    }
    

    function clickTimeCurrent(event){
        // event.target.offsetWidth   Tamanho da DIV progressBar
        // ATENÇÃO: event.target.offsetWidth deve fazer o path até a div do progress
        // event.target.parentElement
        /* 
            let path = event.path || (event.composedPath && event.composedPath());
            let target = path.find( function(el) { return (el.dataset.row);   } );
        */

        // minutos total: 3:00
        // minutos total: 3 * 60 = 160 segundos
        // 500 /100 = 5px para 1% de div
        // 180 /100  = 1,8 a cada 1%
        // 5 * 1,8 = 9px a cada 1%

        console.dir(event.target);
    }


    return (
        <div className="song-control">
            <div className="song-control-controls">

                <button type="button" className="btn btn-clean mr-1" title="Ordem Aleatoria"><IconShuflle /></button>

                <button type="button" className="btn btn-clean mr-1" title="Anterior"><IconPlaySkipBack /></button>

                <button type="button" id="pause" className="btn btn-clean mr-1 hide" title="Pause"><IconPause /></button>
                <button type="button" id="play" className="btn btn-clean mr-1" title="Play" onClick={playMusic}><IconPlay /></button>

                <button type="button" className="btn btn-clean mr-1" title="Próxima"><IconPlaySkipForward /></button>

                <button type="button" className="btn btn-clean" title="Repetir"><IconRepeat /></button>

            </div>
            <div className="song-control-controls-progress-bar">
                <span id="song-time-current">0:50</span>
                    <ComponentProgressBar cicle={true} now={0}  onClick={clickTimeCurrent} id="song-time-progress" />
                <span id="song-time-total">3:00</span>
            </div>
        </div>
    )
}
