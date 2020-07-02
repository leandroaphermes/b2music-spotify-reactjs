import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import * as actionsAlert from '../../../store/actions/alert'

import api from '../../../services/Api'
import {
  USERNAME_VALIDATION,
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
  ALFA_NUMBER_SPACE_CS, 
  DATE_VALIDATION, 
  MASK_PHONE, 
  PHONE_VALIDATION
} from '../../../utils/const-regex'

import ComponentAlert from '../../../components/UI/Alert/Alert'

export const Form = function({ setAlert }){

  const [btnDisable, setBtnDisable] = useState(true)
  const [btnDisableStageOne, setBtnDisableStageOne] = useState(true)
  const [errors, setErrors] = useState({
    username: "",
    truename: "",
    email: "",
    password: "",
    passwordConfirm: "",
    birth: "",
    gender: "",
    phone: "",
    country: "",
    province: ""
  })
  const [stage, setStage] = useState(0)

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

    setBtnDisable(true)

    api.post(`/register`, {
        username,
        truename,
        email,
        password,
        password_confirmation: passwordConfirm,
        birth,
        gender,
        phone,
        country,
        province
      }, {
        validateStatus: s => s === 201
      })
      .then( response => {
        setStage(2)
      })
      .catch( dataError => {
        if(dataError.response.data[0]){
          let errorsApi = {};
          dataError.response.data.forEach( field => {
            if(field.field === "password_confirmation") field.field = "passwordConfirm"
            errorsApi[field.field] = field.message
          })

          if(
            typeof errorsApi.username !== "undefined" ||
            typeof errorsApi.truename !== "undefined" ||
            typeof errorsApi.email !== "undefined" ||
            typeof errorsApi.password !== "undefined" ||
            typeof errorsApi.passwordConfirm !== "undefined"
          ){
            setStage(0)
          }
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

  function handleNextStage(e, stage){
    e.preventDefault()
    setStage(stage)
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
      addError( "username", "Usuario aceita apenas letras minúsculas e numero e não pode conter numero no primeiro caracter")
    }else{
      delError( "username" )
    }
    setUsername(username)
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
  function handleEmail(email){
    if(email.length < 6 || email.length > 64){
      addError( "email", "Email deve conter 6 a 64 caracteres")
    }else if(! EMAIL_VALIDATION.test(email)){
      addError( "email", "Este email não é valido. Considere usar um email mais comum")
    }else{
      delError( "email" )
    }
    setEmail(email)
  }
  function handlePassword(password){
    if(password.length < 4 || password.length > 32){
      addError( "password", "Senha deve conter 6 a 32 caracteres")
    }else if(! PASSWORD_VALIDATION.test(password)){
      addError( "password", "Senha deve conter pelo menos 1 caracter especial !@#$%&-_. letras e numeros")
    }else{
      delError( "password" )
    }
    setPassword(password)
  }
  function handlePasswordConfirm(passwordConfirm){
    if(passwordConfirm.length < 4 || passwordConfirm.length > 32){
      addError( "passwordConfirm", "Confirmar Senha deve conter 6 a 32 caracteres")
    }else if(passwordConfirm !== password){
      addError( "passwordConfirm", "Confirmação Senha deve ser igual a Senha")
    }else{
      delError( "passwordConfirm" )
    }
    setPasswordConfirm(passwordConfirm)
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
    async function setDataForm(){
      const response = await api.get("/utils/global/countrys", {
        validateStatus: s => s === 200
      })
      setContentCountrys(response.data)
    }
    setDataForm()
  }, [])

  useEffect(() => {
    setBtnDisable(true)
    setBtnDisableStageOne(true)  
    if(
      typeof errors.username === "undefined" &&
      typeof errors.truename === "undefined" &&
      typeof errors.email === "undefined" &&
      typeof errors.password === "undefined" &&
      typeof errors.passwordConfirm === "undefined"
    ){
      setBtnDisableStageOne(false)
    }
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

      { stage === 0 ? (
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
          
          <button 
            type="button" 
            className="btn btn-primary btn-block" 
            onClick={(e)=> handleNextStage(e, 1)} 
            disabled={btnDisableStageOne}
          >
            Proxima Etapa
          </button>
        </>
      ) : stage === 1 ? (
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
              <option value="" disabled >Selecione o Genero</option>
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
              <option value="" disabled >Selecione o País</option>
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
              <option value="" disabled >Selecione o Estado</option>
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
        <div className="form-register-message-success">
          <p>Conta criada com sucesso. Aproveite todo nosso conteudo e tenha uma boa VIBE</p>
        </div>
      )}
      
      
      <div className="mt-4">
        <ComponentAlert />
      </div>

    </form>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = dispatch => ({
  setAlert: (dataAlert) => dispatch(actionsAlert.set(dataAlert))
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)
