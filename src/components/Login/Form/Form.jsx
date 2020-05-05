import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import api from '../../../services/Api'
import * as actionsSession from '../../../store/actions/session'
import { setSessionToken } from '../../../utils/utils'

import ComponentAlert from "../../UI/Alert/Alert"

const errors = {}

const Form = function ({ setSession }) {

    const [errorApi, setErrorApi] = useState("")
    const [disable, setDisable] = useState(true)
    const [email, setEmail] = useState("leandro@localhost.com")
    const [password, setPassword] = useState("123123")

    const history = useHistory()

    function handleSubmit(e){
        e.preventDefault()
        if(disable || Object.keys(errors).length !== 0){
            return false
        }

        api.post('/auth', {
            email,
            password
        })
        .then( response => {
            setSessionToken(response.data.token)

            setSession(response.data)
            
            history.push('/')
        })
        .catch( dataError => {
            console.dir(dataError);
            setErrorApi(dataError.response.data.message)
        })

    }

    useEffect(() => {
        setDisable(true)
        if(email.length < 6 || email.length > 64){
            errors.email = "Campo Email deve conter 6 a 64 caracteres"
        }else if(!new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)) {
            errors.email = "Campo Email deve ser valido"
        }else{
            delete errors.email
        }
        
        
        if(password.length < 6 || password.length > 32){
            errors.password = "Campo Senha deve conter 6 a 32 caracteres"
        }else{
        delete errors.password
        }

        if(Object.keys(errors).length === 0 ){
            setDisable(false)
        }

    }, [email, password])

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
                    onChange={ e => setEmail(e.target.value)}
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
                    onChange={ e => setPassword(e.target.value)}
                    value={password}
                />
                {errors.password && (
                    <div className="input-error" id="input-error-password">
                        {errors.password}
                    </div>
                )}
            </div>
            <button className="btn btn-primary btn-block" disabled={disable}>
                Entrar
            </button>
            { errorApi && (
                <ComponentAlert type="danger" text="Erro de login ou senha" />
            )}
        </form>
    )
}

const mapStateToProps = state => ({
    session: state.session.user
});

const mapDispatchToProps = dispatch => ({
    setSession: (sessionData) => {
        
        dispatch(actionsSession.set(sessionData))
    }
})


export default connect( mapStateToProps, mapDispatchToProps)(Form)