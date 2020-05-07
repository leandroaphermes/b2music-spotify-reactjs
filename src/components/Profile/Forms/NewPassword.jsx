import React from 'react'

export default function NewPassword() {
    return (
        <form action="/my-profile.html" method="post">

            <div className="form-group">
                <label htmlFor="password-old">Senha atual</label>
                <input type="password" className="form-control" id="password-old" name="password-old" autoComplete="current-password" placeholder="Senha atual de uso" />
            </div>

            <div className="form-group">
                <label htmlFor="password-new">Nova senha</label>
                <input type="password" className="form-control" id="password-new" name="password-new" autoComplete="new-password" placeholder="Nova senha" />
            </div>

            <div className="form-group">
                <label htmlFor="password-new2">Confirmar nova senha</label>
                <input type="text" className="form-control" id="password-new2" name="password-new2" autoComplete="new-password" placeholder="Confirmar nova senha" />
            </div>

            <div className="form-group text-center">
                <button className="btn btn-primary">
                    Salvar
                </button>
            </div>

        </form>
    )
}
