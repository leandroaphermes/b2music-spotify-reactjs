import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import api from '../../../services/Api'
import * as actionsAlert from '../../../store/actions/alert'
import * as actionsSession from '../../../store/actions/session'

const Save = function ({ setAlert, session, setSession }) {

    const [btnDisable, setBtnDisable] = useState(true)
    const [errors, setErrors] = useState({})

    const [username, setUsername] = useState("")
    const [truename, setTruename] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [dtbirth, setDtbirth] = useState("")
    const [country, setCountry] = useState("")
    const [province, setProvince] = useState("")

    const [contentCountrys, setContentCountrys] = useState([])
    const [codeDDI, setCodeDDI] = useState(0)
    const [contentProvinces, setContentProvinces] = useState([])

    function handleSubmit(e){
        e.preventDefault()

        api.put(`/users/${session.id}`, {
            username,
            truename,
            email,
            phone,
            birth: dtbirth,
            country,
            province
        })
        .then( response => {

            setSession({
                id: session.id,
                username,
                truename,
                email,
            })

            setAlert({
                status: true,
                type: "success",
                message: "Seus dados foram salvo com sucesso",
                float: true
            })
        })
        .catch( dataError => {
            if(dataError.response.data[0]){

                dataError.response.data.forEach( field => {
                    errors[field.field] = field.message
                })

            }else{
                setAlert({
                    status: true,
                    type: "danger",
                    message: dataError.response.data.message,
                    float: true
                })
            }
        })

    }
    
    function addError( field, message){
        setErrors({...errors, [field]: message})
    }
    function delError( field ){
        let tmp = errors
        delete tmp[field]
        setErrors(tmp)
    }

    /* validações de input */
    function handleUsername(username){
        if(username.length < 4 || username.length > 32){
            addError( "username", "Nome de Usuario deve conter 4 a 32 caracteres")
        }else if(!new RegExp(/^[a-z]{1}[a-z0-9]+$/).test(username)){
            addError( "username", "Nome de Usuario pode conter letras ou numeros, Sendo que primeira letra não pode ser numero")
        }else{
            delError( "username" )
        }
        setUsername(username)
    }
    function handleTruename(truename){
        if(truename.length < 4 || truename.length > 100){
            addError( "truename", "Nome Completo deve conter 4 a 100 caracteres")
        }else{
            delError( "truename" )
        }
        setTruename(truename)
    }

    function handleEmail(email){
        if(email.length < 6 || email.length > 64){
            addError( "email", "Email deve conter 6 a 64 caracteres")
        }else if(!new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)) {
            addError( "email", "Email deve ser valido")
        }else{
            delError( "email" )
        }
        setEmail(email)
    }

    function handlePhone(phone){
        phone = phone.replace(/^([1-9]{2})(\d{5})(\d{4})/, "($1) $2-$3")
        if(phone.length < 8 || phone.length > 15){
            addError( "phone", "Telefone deve ser valido.")
        }else if(!new RegExp(/^\([1-9]{2}\) \d{5}-\d{4}$/).test(phone)){
            addError( "phone", "Telefone deve ser valido")
        }else{
            delError( "phone" )
        }
        setPhone(phone)
    }

    function handleDtbirth(dtbirth) {
        let rer = dtbirth.match(/^(\d{4})-(\d{2})-(\d{2})$/)
        if(dtbirth.length !== 10){
            addError( "dtbirth", "Data de Nascimento Invalida")
        }else if(!rer || rer[1] < 1700 || rer[2] > 12 || rer[2] < 1 || rer[3] > 31 || rer[2] < 1){
            addError( "dtbirth", "Data de Nascimento formato invalido")
        }else{
            delError( "dtbirth" )
        }
        setDtbirth(dtbirth)
    }
    /* Fim de validações de inputs */


    async function handleCountry(countryData){
        setCountry(countryData)
    }
    async function getPronvice(countryData){
        const response = await api.get(`/utils/global/countrys/${countryData}`)
        setContentProvinces(response.data)
    }

    useEffect(() => {

        async function setDataForm(){
                
            const response = await api.get("/utils/global/countrys")
            setContentCountrys(response.data)

            const responseUser = await api.get("/users/current-auth")
            setUsername(responseUser.data.username)
            setTruename(responseUser.data.truename)
            setEmail(responseUser.data.email)
            setPhone(responseUser.data.phone)
            setDtbirth(responseUser.data.birth)
            handleCountry(responseUser.data.country)
            setProvince(responseUser.data.province)
        }

        setDataForm()
    }, [])

    useEffect(() => {
        setBtnDisable(true)
        console.log("UseEffect Errors: ", Object.keys(errors).length);
        if(Object.keys(errors).length === 0 ){
            setBtnDisable(false)
        }
    }, [ errors ])

    useEffect(() => {
        async function changeProvinves(){
            await getPronvice(country)
            const state = contentCountrys.find( countryItem => countryItem.iso2 === country )
            if(state) setCodeDDI( state.phone_code )
        }
        changeProvinves()
    }, [ country, contentCountrys ])

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Nome de Usuario</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="username"
                    name="username" 
                    value={username} 
                    onChange={(e) => handleUsername(e.target.value)}
                    placeholder="Nome de usuario"
                    minLength="4"
                    maxLength="32"
                />
                {errors.username && (
                    <div className="input-error" id="input-error-username">
                        {errors.username}
                    </div>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="truename">Nome Completo</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="truename" 
                    name="truename" 
                    value={truename} 
                    onChange={(e) => handleTruename(e.target.value)}
                    placeholder="Nome Completo" 
                    minLength="4"
                    maxLength="100"
                />
                {errors.truename && (
                    <div className="input-error" id="input-error-truename">
                        {errors.truename}
                    </div>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    name="email"
                    value={email} 
                    onChange={(e) => handleEmail(e.target.value)} 
                    placeholder="Email"
                    minLength="6"
                    maxLength="64"
                />
                {errors.email && (
                    <div className="input-error" id="input-error-email">
                        {errors.email}
                    </div>
                )}
            </div>

            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="phone">Telefone</label>
                        <div className="form-group-input">
                            <span className="form-group-text">
                                +{codeDDI}
                            </span>
                            <input 
                                type="tel" 
                                className="form-control" 
                                id="phone" 
                                name="phone" 
                                value={phone}
                                onChange={(e) => handlePhone(e.target.value)}
                                placeholder="Telefone celular com DDD" 
                                minLength="8"
                                maxLength="15"
                            />
                        </div>
                        {errors.phone && (
                            <div className="input-error" id="input-error-phone">
                                {errors.phone}
                            </div>
                        )}
                    </div>
                </div>

                <div className="col-md-6 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="dtbirth">Data de Nascimento</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            id="dtbirth" 
                            name="dtbirth" 
                            value={dtbirth}
                            onChange={(e) => handleDtbirth(e.target.value)}
                            placeholder="Data de nascimento" 
                        />
                        {errors.dtbirth && (
                            <div className="input-error" id="input-error-dtbirth">
                                {errors.dtbirth}
                            </div>
                        )}
                    </div>
                </div>

                <div className="col-md-6 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="country">País</label>
                        <select 
                            className="form-control" 
                            id="country" 
                            name="country" 
                            value={country}
                            onChange={ e => handleCountry(e.target.value)}
                            placeholder="País que vive"
                        > 
                            { contentCountrys.map( country => (
                                <option key={country.iso2} value={country.iso2}>{country.name}</option>
                              ) )
                            }
                        </select>
                    </div>
                </div>

                <div className="col-md-6 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="province">Estado</label>
                        <select 
                            className="form-control" 
                            id="province" 
                            name="province" 
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            placeholder="Estado que vive"
                        >
                            { contentProvinces.map( provinceItem => (
                                <option key={provinceItem.id} value={provinceItem.state_code}>{provinceItem.name}</option>
                            ) ) }
                        </select>
                    </div>
                </div>
            </div>

            <div className="form-group text-center">
                <button type="submit" className="btn btn-primary" disabled={btnDisable}>
                    Salvar
                </button>
            </div>

        </form>
    )
}

const mapStateToProps = state => ({
    session: state.session.user
})

const mapDispachtToProps = dispatch => ({
    setSession: (sessionData) => dispatch(actionsSession.set(sessionData)),
    setAlert: (alertData) => dispatch(actionsAlert.set(alertData))
})

export default connect( mapStateToProps, mapDispachtToProps)(Save)