import React, { useState, useEffect, memo } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actionsAlert from '../../../store/actions/alert'
import { getFavorite, addFavorite, removeFavorite } from '../../../services/function/favorite'

import { ReactComponent as IconHeartLike } from '../../../assets/img/icons/heart.svg'
import { ReactComponent as IconHeartLikeOutline } from '../../../assets/img/icons/heart-outline.svg'


import "./Favorite.css"

function Favorite({ setAlert, ...props }) {

  const [favorite, setFavorite] = useState(false) 

  function handleFavorite(action){
    if(action){
      addFavorite(props.dataID, props.type)
      .then( () => {

        if(typeof props.onAddFavorite === "function") props.onAddFavorite()

        setFavorite(true)
        setAlert({
          status: true,
          type: "success",
          message: "Salva na sua biblioteca"
        })
      })
      .catch( () => {
        setAlert({
          status: true,
          type: "danger",
          message: "Ocorreu um erro ao salvar na sua biblioteca"
        })
      })
    }else{
      
      if(typeof props.onRemoveFavorite === "function") props.onRemoveFavorite()

      removeFavorite(props.dataID, props.type)
      .then( () => {
        setFavorite(false)
        setAlert({
          status: true,
          type: "success",
          message: "Removido da sua biblioteca"
        })
      })
      .catch( () => {
        setAlert({
          status: true,
          type: "danger",
          message: "Ocorreu um erro ao remover na sua biblioteca"
        })
      })
    }
  }

  useEffect(() => {
    
    getFavorite(props.dataID, props.type)
      .then( result => setFavorite(result) )
      .catch( error => console.log(error) )
      
  }, [props])

  return (
    <button 
      type="button" 
      className="btn btn-clean btn-block-inline svg-fill-current ml-2 favorite-btn"
      onClick={()=> handleFavorite(!favorite)}
      title={ favorite ? "Remover do favorito" : "Adicionar no favorito" }
    > 
      { favorite ? 
          (
            <>
              <IconHeartLike className="svg-fill-current favorite-active" width="32px" height="32px" />
              <IconHeartLikeOutline className="favorite-disable svg-fill-current" width="32px" height="32px" />
            </>
          )
        : (
            <>
              <IconHeartLike className="svg-fill-current favorite-disable" width="32px" height="32px" />
              <IconHeartLikeOutline className="svg-fill-current favorite-active " width="32px" height="32px" />
            </>
        )
      }
    </button>
  )
}

Favorite.propTypes = {
  type: PropTypes.oneOf([ "playlist", "album", "author", "track" ]).isRequired,
  dataID: PropTypes.number.isRequired,
  onAddFavorite: PropTypes.func,
  onRemoveFavorite: PropTypes.func
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  setAlert: (dataAlert) => dispatch(actionsAlert.set(dataAlert))
})

export default connect( mapStateToProps, mapDispatchToProps)(memo(Favorite))

