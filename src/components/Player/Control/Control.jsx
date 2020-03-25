import React from 'react'

import ComponentProgressBar from '../../UI/ProgressBar/ProgressBar';

import { ReactComponent as IconShuflle } from "../../../assets/img/icons/shuffle-outline.svg";
import { ReactComponent as IconPlaySkipBack } from "../../../assets/img/icons/play-skip-back-outline.svg";
import { ReactComponent as IconPause } from "../../../assets/img/icons/pause-outline.svg";
import { ReactComponent as IconPlay } from "../../../assets/img/icons/play-outline.svg";
import { ReactComponent as IconPlaySkipForward } from "../../../assets/img/icons/play-skip-forward-outline.svg";
import { ReactComponent as IconRepeat } from "../../../assets/img/icons/repeat-outline.svg";


import "./Control.css";



export default function Control(props) {
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
                { props.status ? (
                        <button type="button" id="pause" className="btn btn-clean mr-1" title="Pause" onClick={props.btnPauseOnClick}><IconPause /></button>
                    ) : (
                        <button type="button" id="play" className="btn btn-clean mr-1" title="Play" onClick={props.btnPlayOnClick}><IconPlay /></button>
                    )
                }
                <button type="button" className="btn btn-clean mr-1" title="Próxima"><IconPlaySkipForward /></button>
                <button type="button" className="btn btn-clean" title="Repetir"><IconRepeat /></button>
            </div>
            <div className="song-control-controls-progress-bar">
                <span id="song-time-current">{secondsToMinutos(props.currentNow)}</span>
                    <ComponentProgressBar 
                        now={props.currentNow} 
                        max={props.timeTotal} 
                        step={1} 
                        id="song-time-progress" 
                        onMouseDown={ (eventDown)=>  props.onMouseProgress(eventDown, true) } 
                        onMouseUp={ (event) => props.onMouseProgress(event, false)} 
                        onChange={ (eChange)=> props.updateCurrentNow(eChange)}
                    />
                <span id="song-time-total">{secondsToMinutos(props.timeTotal)}</span>
            </div>
        </div>
    )
}
