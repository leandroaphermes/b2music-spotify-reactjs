import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import ComponentUIPageNoAuthenticate from '../../components/UI/PageNoAuthenticate/PageNoAuthenticate'
import Form from './Form/Form'

import "./Register.css"

export const Register = () => {
  return (
    <ComponentUIPageNoAuthenticate>
      <Form />
      <div className="mx-4 text-center">
        <Link to="/login">Voltar ao Login</Link>
      </div>
    </ComponentUIPageNoAuthenticate>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = dispatch => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
