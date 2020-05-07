import React, { useState, useEffect } from 'react'

import api from '../../../services/Api'

const errors = {}

export default function Save() {
    const [btnDisable, setBtnDisable] = useState(true)
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

        alert("Formulario enviado com sucesso")
    }

    async function handleCountry(countryData){
        setCountry(countryData)
        await getPronvice(countryData)
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

        if(username.length < 4 || username.length > 32){
            errors.username = "Nome de Usuario deve conter 4 a 32 caracteres"
        }else if(!new RegExp(/^[a-z]{1}[a-z0-9]+/).test(username)){
            errors.username = "Nome de Usuario pode conter letras ou numeros, Sendo que primeira letra não pode ser numero" 
        }else{
            delete errors.username
        }

        if(truename.length < 4 || truename.length > 100){
            errors.truename = "Nome Completo deve conter 4 a 100 caracteres"
        }else{
            delete errors.truename
        }

        if(email.length < 6 || email.length > 64){
            errors.email = "Email deve conter 6 a 64 caracteres"
        }else if(!new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)) {
            errors.email = "Email deve ser valido"
        }else{
            delete errors.email
        }


        if(phone.length < 8 || phone.length > 15){
            errors.phone = "Telefone deve ser valido"
        }else if(!new RegExp(/^\([1-9]{2}\)\s\d{5}-\d{4}/).test(phone)){
            errors.phone = "Telefone deve ser valido"
        }else{
            delete errors.phone
        }
        
        
        if(Object.keys(errors).length === 0 ){
            setBtnDisable(false)
        }
    }, [ username, email, truename, phone ])

    useEffect(() => {

        const state = contentCountrys.find( countryItem => countryItem.iso2 === country )
        if(state) setCodeDDI( state.phone_code )

    }, [ country, contentCountrys ])

    return (
        <form onSubmit={handleSubmit} method="post">
            <div className="form-group">
                <label htmlFor="username">Nome de Usuario</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="username"
                    name="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
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
                    onChange={(e) => setTruename(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)} 
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
                                onChange={(e) => setPhone(e.target.value.replace(/[^0-9\s]/,"").replace(/^([1-9]{2})(\d{5})(\d{4})/, "($1) $2-$3") )}
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
                            onChange={(e) => {
                                console.log("setValue: ", e.target.value)
                                setDtbirth(e.target.value)
                                
                            }}
                            placeholder="Data de nascimento" 
                        />
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
