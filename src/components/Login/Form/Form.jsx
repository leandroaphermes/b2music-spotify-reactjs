import React, { useState } from 'react'

export default function Form() {
    const errorEmail = ""
    const errorPassword = ""

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(e){
        e.preventDefault()

        

        alert("Enviou o formulario");
    }

    return (
        <form className="py-2" onSubmit={handleSubmit} >
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                    className="form-control"
                    type="email"
                    name="email"
                    id="email"
                    minLength="4"
                    maxLength="64"
                    placeholder="Digite o email"
                    autoComplete="email"
                    onChange={ e => setEmail(e.target.value)}
                />
                {errorEmail && (
                    <div className="input-error" id={`input-error-email`}>
                        Email não é valido
                    </div>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                    className="form-control"
                    type="password"
                    name="password"
                    id="password"
                    minLength="4"
                    maxLength="64"
                    placeholder="Digite a senha"
                    autoComplete="password"
                    onChange={ e => setPassword(e.target.value)}
                />
                {errorPassword && (
                    <div className="input-error" id={`input-error-password`}>
                        Password não é valido
                    </div>
                )}
            </div>
            <button className="btn btn-primary btn-block">
                Entrar
            </button>
        </form>
    )
}
