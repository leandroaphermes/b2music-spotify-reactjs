import React from 'react'

import Form from "./Form/Form"

import logo from "../../assets/img/logo/logo-light.png"
import bgLogin from "../../assets/img/bg-login.jpg"

import "./Login.css"

export default function Login() {
  return (
    <div className="container login-container">
      <div className="login-background" style={{ backgroundImage: "url("+ bgLogin +")" }}></div>
      <section className="login-content">
        <header className="login-header">
          <img className="mb-4" src={logo} alt="Logo B2 Music" lang="en" />
        </header>
        <article className="login-body">
          <Form />
          <div className="py-2">
            
            <button className="btn btn-secundary btn-block">Registrar</button>
          </div>
        </article>
        <footer className="login-footer">
          <p>Projeto de estudos Spotify Clone FullStack</p>
          <p>By Leandro Hermes (Hamaro)</p>
        </footer>
      </section>
      <div className="login-text">
        Escute suas musicas<br/>
        Como se você estivesse na 
        <span>Festa</span>
      </div>
    </div>
  )
}
