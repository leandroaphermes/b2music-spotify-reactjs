import React, { memo } from 'react'
import { useHistory } from 'react-router-dom'

import ComponentProgressBar from '../../UI/ProgressBar/ProgressBar';


import { ReactComponent as IconList } from '../../../assets/img/icons/list-outline.svg';
import { ReactComponent as IconVolumeMute } from '../../../assets/img/icons/volume-mute-outline.svg';
import { ReactComponent as IconVolumeOff } from '../../../assets/img/icons/volume-off-outline.svg';
import { ReactComponent as IconVolumeLow } from '../../../assets/img/icons/volume-low-outline.svg';
import { ReactComponent as IconVolumeMedium } from '../../../assets/img/icons/volume-medium-outline.svg';
import { ReactComponent as IconVolumeHigh } from '../../../assets/img/icons/volume-high-outline.svg';

import "./Volume.css";

const Volume = function(props) {
    const history = useHistory()

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
    function handleClickQueue(){
        history.push('/queue')
    }

    return (
        <div className="song-volume" aria-label="Controles de Volume">
            <div className="song-volume-playlist mr-2">
                <button 
                    type="button" 
                    className="btn btn-clean" 
                    title="Fila de Reprodução" 
                    onClick={handleClickQueue}
                >
                    <IconList />
                </button>
            </div>
            <div className="song-volume-slide mr-5">
                <div className="song-volume-volume-icon mr-1">
                    <button 
                        type="button" 
                        className="btn btn-clean btn-block" 
                        title={ (props.volume !== 0) ? `Mutar` : `Com Som` }
                        onClick={props.onClickMute}
                    >
                        {getIconeVol(parseInt(props.volume))}
                    </button>
                </div>
                <ComponentProgressBar now={props.volume} max={100} onChange={props.onChange} id="song-volume-progress" />
            </div>
        </div>
    )
}

export default memo(Volume);