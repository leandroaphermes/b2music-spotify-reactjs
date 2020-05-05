import React, { useState } from 'react'

export default function Save() {
    const [username, setUsername] = useState("")
    const [truename, setTruename] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [dtbirth, setDtbirth] = useState("")
    const [country, setCountry] = useState("")
    const [province, setProvince] = useState("")

    function handleSubmit(e){
        e.preventDefault()

        alert("Formulario enviado com sucesso")
    }

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
                />
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
                />
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
                />
            </div>

            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="phone">Telefone</label>
                        <input 
                            type="tel" 
                            className="form-control" 
                            id="phone" 
                            name="phone" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Telefone celular com DDD" 
                        />
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
                            onChange={(e) => setDtbirth(e.target.value)}
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
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="País que vive"
                        >
                            <option value="usa">United States</option>
                            <option value="brazil">Brazil</option>
                            <option value="portugual">Portugual</option>
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
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="SP">São Paulo</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="form-group text-center">
                <button className="btn btn-primary">
                    Salvar
                </button>
            </div>

        </form>
    )
}
