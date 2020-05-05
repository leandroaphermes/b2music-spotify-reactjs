import React from 'react'

import FormSave from './Forms/Save'
import FormNewPassword from './Forms/NewPassword'

export default function Profile() {
    return (
        <div className="row">
            <div className="col-lg-7 col-md-12 col-sm-12">
                <section className="card">
                    <div className="card-header">
                        <div className="card-title">
                            <a href="#edit">Meus Dados</a>
                        </div>
                        <small>Gerenciar meus dados como Nome, Email, Telefone, Data de nascimento, País e Estado</small>
                    </div>
                    <div className="card-content card-page p-0">
                        <FormSave />
                    </div>
                </section>
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12">
                <section className="card">
                    <div className="card-header">
                        <div className="card-title">
                            <a href="#new-password">Alterar senha</a>
                        </div>
                        <small>Alterar a senha da sua conta</small>
                    </div>
                    <div className="card-content card-page p-0">
                        <FormNewPassword />
                    </div>
                </section>
            </div>
        </div>
    )
}
