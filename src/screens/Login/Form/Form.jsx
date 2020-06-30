import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import api from '../../../services/Api'
import * as actionsSession from '../../../store/actions/session'
import * as actionsAlert from '../../../store/actions/alert'
import { setSessionToken } from '../../../utils/utils'
import { EMAIL_VALIDATION } from '../../../utils/const-regex'

import ComponentAlert from "../../../components/UI/Alert/Alert"

const Form = function ({ setAlert, setSession }) {
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    })
    const [btnDisable, setBtnDisable] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory()

    function handleSubmit(e){
        e.preventDefault()
        setBtnDisable(true)

        api.post('/auth', {
            email,
            password
        },{
            validateStatus: (s) => s === 200
        })
        .then( response => {

            setSessionToken(response.data.token)
            setSession(response.data)
            
            setAlert({
                status: false,
                type: "success",
                message: "",
                float: true
            })

            history.push('/')
        })
        .catch( dataError => {
            if(dataError.response.data[0]){
                let errorsApi = {};
                dataError.response.data.forEach( field => {
                    errorsApi[field.field] = field.message
                })
                setErrors(errorsApi)
            
            }else{
                setAlert({
                    status: true,
                    type: "danger",
                    message: dataError.response.data.message,
                    float: false
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

    function handleEmail(email){

        if(email.length < 6 || email.length > 64){
            addError( "email", "Email deve conter 6 a 64 caracteres")
        }else if(!new RegExp(EMAIL_VALIDATION).test(email)){
            addError( "email", "Email não é valido")
        }else{
            delError( "email" )
        }

        setEmail(email)
    }

    function handlePassword(password){

        if(password.length < 6 || password.length > 32){
            addError( "password", "Senha deve conter 6 a 32 caracteres")
        }else{
            delError( "password" )
        }

        setPassword(password)
    }

    useEffect(() => {
        setBtnDisable(true)
        if(Object.keys(errors).length === 0) {
            setBtnDisable(false)
        }
    }, [ errors ])

    return (
        <form className="py-2" onSubmit={handleSubmit} >
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                    className="form-control"
                    type="email"
                    name="email"
                    id="email"
                    minLength="6"
                    maxLength="64"
                    placeholder="Digite o email"
                    autoComplete="email"
                    onChange={ e => handleEmail(e.target.value)}
                    value={email}
                />
                {errors.email && (
                    <div className="input-error" id="input-error-email">
                        {errors.email}
                    </div>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input 
                    className="form-control"
                    type="password"
                    name="password"
                    id="password"
                    minLength="4"
                    maxLength="32"
                    placeholder="Digite a senha"
                    autoComplete="password"
                    onChange={ e => handlePassword(e.target.value)}
                    value={password}
                />
                {errors.password && (
                    <div className="input-error" id="input-error-password">
                        {errors.password}
                    </div>
                )}
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={btnDisable}>
                Entrar
            </button>
            
            <div className="mt-4">
                <ComponentAlert />
            </div>
        </form>
    )
}

const mapStateToProps = state => ({
    session: state.session.user
});

const mapDispatchToProps = dispatch => ({
    setSession: (sessionData) => dispatch(actionsSession.set(sessionData)),
    setAlert: (alertData) => dispatch(actionsAlert.set(alertData))
})


export default connect( mapStateToProps, mapDispatchToProps)(Form)