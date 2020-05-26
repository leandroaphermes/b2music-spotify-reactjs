import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import * as actionsPlayer from '../../../store/actions/player'
import api from '../../../services/Api'

import ComponentHeader from "../Header"
import ComponentUIModal from '../../../components/UI/Modal/Modal'
import FormModal from './Form/Form'
import ComponentUICardPlaylistImage from '../../../components/UI/Cards/PlaylistImage/PlaylistImage'


import { ReactComponent as IconAddCircle } from "../../../assets/img/icons/add-circle-outline.svg";

const Playlists = function ({ player, setPlayer, status, setStatus }) {

	const [modalVisible, setModalVisible] = useState(false)
	const [data, setData] = useState([])

	function play(e, playlistId){
			e.preventDefault();

			if(status && playlistId === player.id) return setStatus(false)

			api.get(`/playlists/${playlistId}`)
			.then( response => {
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

							localStorage.setItem('last_playlist', response.data.id)
							setPlayer(data);
							setStatus(true);
					}
			})
			.catch( dataError => {
					alert(`Erro de processo. Code: ${dataError.status}`)
			})
		
	}

	useEffect(() => {
			api.get("/me/playlists")
			.then( response => {
					if(response.status === 200){
							setData(response.data);
					}
			})
			.catch();
	}, [])

	return (
		<div>
			<ComponentUIModal 
					title="Criar playlist"
					visible={modalVisible}
					onToggleModal={() => setModalVisible(!modalVisible)}
			>
					<FormModal onToggleModal={() => setModalVisible(!modalVisible)} />
			</ComponentUIModal>
			<section className="card card-auto-rows">
				<ComponentHeader />

					<div className="card-content">
							<div 
									className="image-album text-center" 
									onClick={() => setModalVisible(!modalVisible)}
							>
									<IconAddCircle className="mt-4" max="100px" width="100%" height="100px" />
							</div>
							<div className="song-description mt-2">
									<div className="song-description-title">
											Criar nova Playlist
									</div>
									<div className="song-description-body">Crie nova playlist para ouvir mais tarde</div>
							</div>
					</div>

					{data.map( playlist => (
						<ComponentUICardPlaylistImage
								key={playlist.playlist.id}
								prefixRoute="/playlist/"
								statusPlayer={status}
								player={player}
								data={playlist.playlist}
								click={play}
						/>
					))}
			</section>
		</div>
	)
}

const mapStateToProps = state => ({
    status: state.player.status,
    player: state.player.player,
})
const mapDispatchToProps = dispatch => ({
    setStatus: (status) => dispatch(actionsPlayer.status(status)),
    setPlayer: (dataPlayer) => dispatch(actionsPlayer.newPlaylist(dataPlayer, "library-card-grid"))
})

export default connect( mapStateToProps, mapDispatchToProps )(Playlists)