import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import api from '../../../services/Api'
import {
  USERNAME_VALIDATION,
  ALFA_NUMBER_SPACE_CS, 
  DATE_VALIDATION, 
  MASK_PHONE, 
  PHONE_VALIDATION
} from '../../../utils/const-regex'

export const Form = () => {

  const [btnDisable, setBtnDisable] = useState(true)
  const [errors, setErrors] = useState({})
  const [step, setStep] = useState(0)

  const [username, setUsername] = useState("")
  const [truename, setTruename] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

  const [birth, setBirth] = useState("")
  const [gender, setGender] = useState("")
  const [phone, setPhone] = useState("")
  const [country, setCountry] = useState("")
  const [province, setProvince] = useState("")

  const [contentCountrys, setContentCountrys] = useState([])
  const [codeDDI, setCodeDDI] = useState(0)
  const [contentProvinces, setContentProvinces] = useState([])

  function handleOnSubmit(e){
    e.preventDefault()

    setStep(2)

    alert("Submeteu o form")

  }

  function handleNextStep(e, step){
    e.preventDefault()
    setStep(step)
  }

  function addError( field, message){
    setErrors({...errors, [field]: message})
  }
  function delError( field ){
    let tmp = errors
    delete tmp[field]
    setErrors({...tmp})
  }

  /* Handles Form */
  function handleUsername(username){
    if(username.length < 4 || username.length > 32){
      addError( "username", "Usuario deve conter 4 a 32 caracteres")
    }else if(! USERNAME_VALIDATION.test(username)){
      addError( "username", "Usuario aceita apenas letras e numero e não pode conter numero no primeiro caracter")
    }else{
      delError( "username" )
    }
    setUsername(username)
  }
  function handleEmail(email){

  }
  function handlePassword(password){

  }
  function handlePasswordConfirm(passwordConfirm){

  }

  function handleTruename(truename){
    if(truename.length < 4 || truename.length > 100){
      addError( "truename", "Nome Completo deve conter 4 a 100 caracteres")
    }else if(! ALFA_NUMBER_SPACE_CS.test(truename)){
      addError( "truename", "Nome Completo aceita apenas letras e numero")
    }else{
      delError( "truename" )
    }
    setTruename(truename)
  }
  function handleBirth(birth) {
    if(birth.length !== 10){
      addError( "birth", "Data de Nascimento Invalida")
    }else if( !DATE_VALIDATION.test(birth) ){
      addError( "birth", "Data de Nascimento formato invalido")
    }else{
      delError( "birth" )
    }
    setBirth(birth)
  }
  function handleGender(gender) {
    if(gender.length !== 1){
      addError( "gender", "Genero Invalido")
    }else{
      delError( "gender" )
    }
    setGender(gender)
  }
  function handlePhone(phone){
    phone = phone.replace(MASK_PHONE.br, "($1) $2-$3")
    if(phone.length < 8 || phone.length > 15){
      addError( "phone", "Telefone deve ser valido.")
    }else if(!new RegExp(PHONE_VALIDATION.br).test(phone)){
      addError( "phone", "Telefone deve ser valido")
    }else{
      delError( "phone" )
    }
    setPhone(phone)
  }
  function handleCountry(country){
    if(country.length < 2){
      addError( "country", "Campo País deve ser preenchido")
    }else{
      delError( "country" )
    }
    setCountry(country)
  }
  function handleProvince(province){
    if(province.length < 2){
      addError( "province", "Campo Estado deve ser preenchido")
    }else{
      delError( "province" )
    }
    setProvince(province)
  }
  /* Fim de validações de inputs */

async function getPronvice(countryData){
    const response = await api.get(`/utils/global/countrys/${countryData}`)
    setContentProvinces(response.data)
}

  useEffect(() => {
    setBtnDisable(true)
    if( Object.keys(errors).length === 0 ){
      setBtnDisable(false)
    }
  }, [ errors ])

  useEffect(() => {
    async function changeProvinves(){
      if(country){
        await getPronvice(country)
        const state = contentCountrys.find( countryItem => countryItem.iso2 === country )
        if(state) setCodeDDI( state.phone_code )
      }
    }
    changeProvinves()
  }, [ country, contentCountrys ])

  return (
    <form onSubmit={handleOnSubmit} className="form-register py-2" >
      
      <h4 className="form-register-title">Registro</h4>

      { step === 0 ? (
        <>
          <div className="form-group">
            <label htmlFor="username">Usuario: </label>
            <input 
              type="text" 
              id="username" 
              className="form-control"
              value={username}
              onChange={(e) => handleUsername(e.target.value)}
              placeholder="Nome de usuario"
              minLength="4"
              maxLength="32"
            />
            {errors.username && (
              <div className="input-error">
                {errors.username}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="truename">Nome Completo: </label>
            <input 
              type="text" 
              id="truename" 
              className="form-control"
              value={truename}
              onChange={(e) => handleTruename(e.target.value)}
              placeholder="Nome Completo" 
              minLength="4"
              maxLength="100"
            />
            {errors.truename && (
              <div className="input-error">
                {errors.truename}
              </div>
            )}
          </div>


          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input 
              type="email" 
              id="email" 
              autoComplete="email"
              className="form-control"
              value={email}
              onChange={(e) => handleEmail(e.target.value)}
              placeholder="Email"
              minLength="6"
              maxLength="64"
            />
            {errors.email && (
              <div className="input-error">
                {errors.email}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha: </label>
            <input 
              type="password" 
              id="password" 
              autoComplete="new-password" 
              className="form-control"
              value={password}
              onChange={(e) => handlePassword(e.target.value)}
              placeholder="Senha"
              minLength="6"
              maxLength="32"
            />
            {errors.password && (
              <div className="input-error">
                {errors.password}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password-confirm">Confirmar Senha: </label>
            <input
              type="password" 
              id="password-confirm" 
              autoComplete="new-password"
              className="form-control" 
              value={passwordConfirm}
              onChange={(e) => handlePasswordConfirm(e.target.value)}
              placeholder="Confirmar Senha"
              minLength="6"
              maxLength="32"
            />
            {errors.passwordConfirm && (
              <div className="input-error">
                {errors.passwordConfirm}
              </div>
            )}
          </div>
          
          <button type="button" className="btn btn-primary btn-block" onClick={(e)=> handleNextStep(e, 1)} disabled={btnDisable}>Proxima Etapa</button>
        </>
      ) : step === 1 ? (
        <>
          
          <div className="form-group">
            <label htmlFor="birth">Data de Nascimento: </label>
            <input
              type="date"
              id="birth"
              className="form-control"
              value={birth}
              onChange={(e) => handleBirth(e.target.value)}
              placeholder="Data de nascimento"
              minLength="10"
              maxLength="10"
            />
            {errors.birth && (
              <div className="input-error">
                {errors.birth}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="gender">Genero: </label>
            <select 
              id="gender"
              className="form-control"
              value={gender}
              onChange={(e) => handleGender(e.target.value)}
            >
              <option value="F">Feminino</option>
              <option value="M">Masculino</option>
              <option value="O">Outros</option>
            </select>
            {errors.gender && (
              <div className="input-error">
                {errors.gender}
              </div>
            )}
          </div> 

          <div className="form-group">
            <label htmlFor="phone">Telefone: </label>
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
              <div className="input-error">
                {errors.phone}
              </div>
            )}
          </div>


          <div className="form-group">
            <label htmlFor="country">País: </label>
            <select
              id="country"
              className="form-control"
              value={country}
              onChange={(e) => handleCountry(e.target.value)}
            >
              { contentCountrys.map( country => (
                  <option key={country.iso2} value={country.iso2}>{country.name}</option>
                  ) 
                )
              }
            </select>
            {errors.country && (
              <div className="input-error">
                {errors.country}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="province">Estado: </label>
            <select
              id="province"
              className="form-control"
              value={province}
              onChange={(e) => handleProvince(e.target.value)}
            >
              { contentProvinces.map( provinceItem => (
                    <option key={provinceItem.id} value={provinceItem.state_code}>{provinceItem.name}</option>
                  ) 
                )
              }
            </select>
            {errors.province && (
              <div className="input-error">
                {errors.province}
              </div>
            )}
          </div>
          
          <button type="submit" className="btn btn-primary btn-block" disabled={btnDisable}>Concluir Registro</button>
        </>
      ) : (
        <>
          <p>Completou</p>
        </>
      )}
      
      


    </form>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = dispatch => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)
