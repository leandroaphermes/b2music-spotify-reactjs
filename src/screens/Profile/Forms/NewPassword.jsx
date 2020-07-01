import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import * as actionsAlert from '../../../store/actions/alert'
import api from '../../../services/Api'

import { PASSWORD_VALIDATION } from '../../../utils/const-regex'


const NewPassword = function({ session, setAlert }) {

    const [errors, setErrors] = useState({
        passwordOld: "",
        passwordNew: "",
        passwordConfirm: ""
    })
    const [btnDisable, setBtnDisable] = useState(true)

    const [passwordOld, setPasswordOld] = useState("")
    const [passwordNew, setPasswordNew] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
   
    function handleSubmit(e) {
        e.preventDefault()
        
        setBtnDisable(true)

        api.put(`/me/password`, {
            password_old: passwordOld,
            password_new: passwordNew,
            password_new_confirmation: passwordConfirm
        })
        .then( response => {
            if(response.status === 204){
                setAlert({
                    status: true,
                    type: "success",
                    message: "Sua senha alterada com sucesso"
                })
                setBtnDisable(false)
            }
        })
        .catch( dataError => {
            
            if(dataError.response.data[0]){
                let errorsApi = {}
                dataError.response.data.forEach( field => {
                    switch (field.field) {
                        case "password_old":
                            errorsApi.passwordOld = field.message
                            break;
                        case "password_new":
                            errorsApi.passwordNew = field.message
                            break;
                        case "password_new_confirmation":
                            errorsApi.passwordConfirm = field.message
                            break;
                    
                        default:
                            break;
                    }
                })
                setErrors(errorsApi)
            
            }else{
                setAlert({
                    status: true,
                    type: "danger",
                    message: dataError.response.data.message,
                    float: true
                })
            }
            setBtnDisable(false)

        })
        

    }

    function addError( field, message){
        setErrors({...errors, [field]: message})
    }
    function delError( field ){
        let tmp = errors
        delete tmp[field]
        setErrors({...tmp})
    }

    function handlePasswordOld(passwordOld){

        if(passwordOld.length < 6 || passwordOld.length > 32){
            addError( "passwordOld", "Senha Antiga deve conter 6 a 32 caracteres")

        }else if (! new RegExp(PASSWORD_VALIDATION).test(passwordOld)){
            addError( "passwordOld", "Senha Antiga deve conter pelo menos 1 caracter especial !@#$%&-_. letras e numeros")

        }else{
            delError( "passwordOld" )
        }

        setPasswordOld(passwordOld)
    }
    function handlePasswordNew(passwordNew){
        
        if(passwordNew.length < 6 || passwordNew.length > 32){
            addError( "passwordNew", "Nova Senha deve conter 6 a 32 caracteres")

        }else if (! new RegExp(PASSWORD_VALIDATION).test(passwordNew)){
            addError( "passwordNew", "Nova Senha deve conter pelo menos 1 caracter especial !@#$%&-_.  letras e numeros")
            
        }else{
            delError( "passwordNew" )
        }
        setPasswordNew(passwordNew)
    }
    function handlePasswordConfirm(passwordConfirm, passwordNew){
        if(passwordConfirm.length < 6 || passwordConfirm.length > 32){
            addError( "passwordConfirm", "Confirmação nova Senha deve conter 6 a 32 caracteres")

        }else if (passwordConfirm !== passwordNew){
            addError( "passwordConfirm", "Confirmação nova Senha deve ser igual a Nova senha")
            
        }else{
            delError( "passwordConfirm" )
        }
        setPasswordConfirm(passwordConfirm)
    }


    useEffect(  () => {
        setBtnDisable(true)
        if( Object.keys(errors).length === 0 ){
            setBtnDisable(false)
        }
    }, [ errors ] )


    return (
        <form onSubmit={handleSubmit} >

            <div className="form-group">
                <label htmlFor="password-old">Senha atual</label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="password-old" 
                    name="password-old" 
                    autoComplete="current-password" 
                    placeholder="Senha atual de uso"
                    minLength="6"
                    maxLength="32"
                    value={passwordOld}
                    onChange={(e) => handlePasswordOld(e.target.value)}
                />
                {errors.passwordOld && (
                    <div className="input-error" id="input-error-password-old">
                        {errors.passwordOld}
                    </div>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="password-new">Nova senha</label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="password-new" 
                    name="password-new" 
                    autoComplete="new-password" 
                    placeholder="Nova senha"
                    value={passwordNew}
                    onChange={(e) => handlePasswordNew(e.target.value)}
                />
                {errors.passwordNew && (
                    <div className="input-error" id="input-error-password-new">
                        {errors.passwordNew}
                    </div>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="password-confirm">Confirmar nova senha</label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="password-confirm" 
                    name="password-confirm" 
                    autoComplete="new-password" 
                    placeholder="Confirmar nova senha"
                    value={passwordConfirm}
                    onChange={(e) => handlePasswordConfirm(e.target.value, passwordNew)}
                />
                {errors.passwordConfirm && (
                    <div className="input-error" id="input-error-password-confirm">
                        {errors.passwordConfirm}
                    </div>
                )}
            </div>

            <div className="form-group text-center">
                <button type="submit" className="btn btn-primary" disabled={btnDisable}>
                    Alterar Senha
                </button>
            </div>

        </form>
    )
}

const mapStateToProps = state => ({
    session: state.session.user
})

const mapDispatchToProps = dispatch => ({
    setAlert: (alertDate) => dispatch(actionsAlert.set(alertDate))
})

export default connect( mapStateToProps, mapDispatchToProps)(NewPassword)