import React from 'react'

import ComponentProgressBar from '../../ProgressBar/ProgessBar';

import { ReactComponent as IconShuflle } from "../../../assets/img/icons/shuffle-outline.svg";
import { ReactComponent as IconPlaySkipBack } from "../../../assets/img/icons/play-skip-back-outline.svg";
import { ReactComponent as IconPause } from "../../../assets/img/icons/pause-outline.svg";
import { ReactComponent as IconPlay } from "../../../assets/img/icons/play-outline.svg";
import { ReactComponent as IconPlaySkipForward } from "../../../assets/img/icons/play-skip-forward-outline.svg";
import { ReactComponent as IconRepeat } from "../../../assets/img/icons/repeat-outline.svg";


import "./Control.css";



export default function Control() {
    return (
        <div className="song-control">
            <div className="song-control-controls">

                <button type="button" className="btn btn-clean mr-1" title="Ordem Aleatoria"><IconShuflle /></button>

                <button type="button" className="btn btn-clean mr-1" title="Anterior"><IconPlaySkipBack /></button>

                <button type="button" id="pause" className="btn btn-clean mr-1 hide" title="Pause"><IconPause /></button>
                <button type="button" id="play" className="btn btn-clean mr-1" title="Play"><IconPlay /></button>

                <button type="button" className="btn btn-clean mr-1" title="Próxima"><IconPlaySkipForward /></button>

                <button type="button" className="btn btn-clean" title="Repetir"><IconRepeat /></button>

            </div>
            <div className="song-control-controls-progress-bar">
                <span id="song-time-current">0:50</span>
                <ComponentProgressBar cicle={true} now={40} />
                <span id="song-time-total">3:00</span>
            </div>
        </div>
    )
}
