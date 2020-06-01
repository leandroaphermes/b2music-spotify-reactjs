import React, { useState, useEffect } from 'react'

import api from '../../../services/Api'

import ComponentHeader from "../Header"
import ComponentUIModal from '../../../components/UI/Modal/Modal'
import FormModal from './Form/Form'
import ComponentCardPlaylistImage from '../../../components/Cards/PlaylistImage/PlaylistImage'


import { ReactComponent as IconAddCircle } from "../../../assets/img/icons/add-circle-outline.svg";

const Playlists = function () {

	const [modalVisible, setModalVisible] = useState(false)
	const [data, setData] = useState([])

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
						<ComponentCardPlaylistImage
								key={playlist.playlist.id}
								prefixRoute="/playlist/"
								data={playlist.playlist}
						/>
					))}
			</section>
		</div>
	)
}


export default Playlists