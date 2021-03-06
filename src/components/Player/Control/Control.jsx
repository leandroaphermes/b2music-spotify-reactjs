import React from 'react'

import { secondsToMinutos } from '../../../utils/utils'

import ComponentProgressBar from '../../UI/ProgressBar/ProgressBar';

import { ReactComponent as IconShuffle } from "../../../assets/img/icons/shuffle-outline.svg";
import { ReactComponent as IconPlaySkipBack } from "../../../assets/img/icons/play-skip-back-outline.svg";
import { ReactComponent as IconPause } from "../../../assets/img/icons/pause-outline.svg";
import { ReactComponent as IconPlay } from "../../../assets/img/icons/play-outline.svg";
import { ReactComponent as IconPlaySkipForward } from "../../../assets/img/icons/play-skip-forward-outline.svg";
import { ReactComponent as IconRepeat } from "../../../assets/img/icons/repeat-outline.svg";


import "./Control.css";



export default function Control(props) {

    return (
        <div className="song-control" aria-label="Controles de Musica">
            <div className="song-control-controls">

                <button 
                    type="button" 
                    className={`btn btn-clean mr-1 ${(props.shuffle) ? 'btn-active' : ''}`} 
                    title="Ordem Aleatoria" 
                    onClick={props.onClickShuffle}
                >
                    <IconShuffle />
                </button>

                <button 
                    type="button" 
                    className="btn btn-clean mr-1" 
                    title="Anterior" 
                    onClick={props.backSong}
                    disabled={props.backSongButton}
                >
                    <IconPlaySkipBack />
                </button>

                { props.status ? (
                        <button 
                            type="button" 
                            id="pause" 
                            className="btn btn-clean mr-1" 
                            title="Pause" 
                            onClick={props.btnPauseOnClick}
                        >
                            <IconPause />
                        </button>
                    ) : (
                        <button 
                            type="button" 
                            id="play" 
                            className="btn btn-clean mr-1" 
                            title="Play" 
                            onClick={props.btnPlayOnClick}
                        >
                            <IconPlay />
                        </button>
                    )
                }

                <button 
                    type="button" 
                    className="btn btn-clean mr-1" 
                    title="Próxima" 
                    onClick={props.nextSong} 
                    disabled={props.nextSongButton}
                >
                    <IconPlaySkipForward />
                </button>

                <button 
                    type="button"
                    className={`btn btn-clean mr-1 ${(props.repeat) ? 'btn-active' : ''}`} 
                    title="Repetir" 
                    onClick={props.repeatOnClick}
                >
                    <IconRepeat />
                </button>

            </div>
            <div className="song-control-controls-progress-bar">
                <span id="song-time-current">{secondsToMinutos(props.currentTime)}</span>
                    <ComponentProgressBar 
                        now={props.currentTime} 
                        max={props.timeTotal} 
                        step={1} 
                        id="song-time-progress" 
                        onMouseDown={props.onMouseDown} 
                        onMouseUp={props.onMouseUp} 
                        onChange={props.updateCurrentTime}
                    />
                <span id="song-time-total">{secondsToMinutos(props.timeTotal)}</span>
            </div>
        </div>
    )
}
