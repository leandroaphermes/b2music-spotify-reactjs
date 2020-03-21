import React from 'react'


import ComponentProgessBar from '../../ProgressBar/ProgessBar';


import { ReactComponent as IconList } from '../../../assets/img/icons/list-outline.svg';
import { ReactComponent as IconVolumeOff } from '../../../assets/img/icons/volume-off-outline.svg';
/* import { ReactComponent as IconVolumeLow } from '../../../assets/img/icons/volume-low-outline.svg';
import { ReactComponent as IconVolumeMedium } from '../../../assets/img/icons/volume-medium-outline.svg';
import { ReactComponent as IconVolumeHigh } from '../../../assets/img/icons/volume-high-outline.svg'; */
import { ReactComponent as IconExpand } from '../../../assets/img/icons/expand-outline.svg';

import "./Volume.css";




export default function Volume() {
    return (
        <div className="song-volume">
            <div className="song-volume-playlist">
                <button type="button" className="btn btn-clean" title="Fila de Reprodução"><IconList /></button>
            </div>
            <div className="song-volume-slide">
                <div className="song-volume-volume-icon mr-1">
                    <button type="button" className="btn btn-clean btn-block" title="Mutar | Com Som">
                        <IconVolumeOff />
                        {/* 
                            <IconVolumeLow />
                            <IconVolumeMedium />
                            <IconVolumeHigh />
                        */}
                    </button>
                </div>
                <ComponentProgessBar cicle={true} now={50} />
            </div>
            <div className="song-volume-volume-expand">
                <button type="button" className="btn btn-clean" title="Tela Cheia"><IconExpand /></button>
            </div>
        </div>
    )
}
