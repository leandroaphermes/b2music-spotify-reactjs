import React from 'react'


import ComponentProgressBar from '../../UI/ProgressBar/ProgressBar';


import { ReactComponent as IconList } from '../../../assets/img/icons/list-outline.svg';
import { ReactComponent as IconVolumeMute } from '../../../assets/img/icons/volume-mute-outline.svg';
import { ReactComponent as IconVolumeOff } from '../../../assets/img/icons/volume-off-outline.svg';
import { ReactComponent as IconVolumeLow } from '../../../assets/img/icons/volume-low-outline.svg';
import { ReactComponent as IconVolumeMedium } from '../../../assets/img/icons/volume-medium-outline.svg';
import { ReactComponent as IconVolumeHigh } from '../../../assets/img/icons/volume-high-outline.svg';
import { ReactComponent as IconExpand } from '../../../assets/img/icons/expand-outline.svg';

import "./Volume.css";




export default function Volume(props) {

    function getIconeVol(value) {
        if(value === 0){
            return <IconVolumeMute />;
        }else if(value > 0 && value <= 20){
            return <IconVolumeOff />;
        }else if(value > 20 && value <= 50){
            return <IconVolumeLow />;
        }else if(value > 50 && value <= 70){
            return <IconVolumeMedium />;
        }else if(value > 70 && value <= 100){
            return <IconVolumeHigh />;
        }
    }
    return (
        <div className="song-volume">
            <div className="song-volume-playlist mr-2">
                <button type="button" className="btn btn-clean" title="Fila de Reprodução"><IconList /></button>
            </div>
            <div className="song-volume-slide mr-2">
                <div className="song-volume-volume-icon mr-1">
                    <button 
                        type="button" 
                        className="btn btn-clean btn-block" 
                        title={ (props.muted !== 0) ? `Mutar` : `Com Som` }
                        onClick={props.onClickButtonMute}
                    >
                        {getIconeVol(parseInt(props.volume))}
                    </button>
                </div>
                <ComponentProgressBar now={props.volume} max={100} onChange={props.onChange} id="song-volume-progress" />
            </div>
            <div className="song-volume-volume-expand mr-5">
                <button type="button" className="btn btn-clean" title="Tela Cheia"><IconExpand /></button>
            </div>
        </div>
    )
}
