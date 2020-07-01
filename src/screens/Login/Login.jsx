import React from 'react'
import { Link } from 'react-router-dom'

import ComponentUIPageNoAuthenticate from '../../components/UI/PageNoAuthenticate/PageNoAuthenticate'

import Form from "./Form/Form"

import "./Login.css"

export default function Login() {
  return (
    <ComponentUIPageNoAuthenticate>
      <Form />
      <div className="btn-register py-2">
        <Link to="/register" className="btn btn-secundary btn-block">Registrar</Link>
      </div>
    </ComponentUIPageNoAuthenticate>
  )
}
