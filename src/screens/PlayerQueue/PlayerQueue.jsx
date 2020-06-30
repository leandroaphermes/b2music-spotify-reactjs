import React from 'react'
import { connect } from 'react-redux'

import * as actionsPlayerThunk from '../../store/thunk/player'

import ComponentUILoading from '../../components/UI/Loading/Loading'
import ComponentUISongListMinute from '../../components/UI/SongListMinute/SongListMinute'

import "./PlayerQueue.css"

export const PlayerQueue = ({ player, status, setPlayByTrack }) => {

  function handlePlayByTrack (track_id) {
    setPlayByTrack(player.id, player.type_list, track_id)
  }

  return (
    <div>
      { Object.keys(player.playing).length > 0 ? (
        <>
          <h2>Fila de reprodução</h2>
          <div className="queue-playing mt-5">
            <h5 className="queue-playing-title">Tocando agora</h5>
            <div className="queue-playing-song">
              <ComponentUISongListMinute
                idplayer={player.id}
                type_list={player.type_list}
                track={player.playing}
                index={player.playingIndex}
                player={player}
                handleDoubleClick={handlePlayByTrack}
              />
            </div>
          </div>
          { player.playlist.slice(player.playingIndex+1).length > 0 && (
            <div className="queue-playing mt-5">
              <h5 className="queue-playing-title">Próximas</h5>
              <div className="queue-playing-song">
                {player.playlist.slice(player.playingIndex+1).map( (track, index) => (
                  <ComponentUISongListMinute
                    key={track.id}
                    idplayer={player.id}
                    type_list={player.type_list}
                    track={track}
                    index={index}
                    player={player}
                    handleDoubleClick={handlePlayByTrack}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <ComponentUILoading />
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  player: state.player.player,
  status: state.player.status
})

const mapDispatchToProps = dispatch => ({
  setPlayByTrack: (id, type, track_id) => dispatch(actionsPlayerThunk.setNewPlaylist(id, type, track_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerQueue)
