import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actionsAlert from '../../store/actions/alert'
import * as actionsSession from '../../store/actions/session'

import UploadPicture from './Forms/UploadPicture'
import FormSave from './Forms/Save'
import FormNewPassword from './Forms/NewPassword'

import "./Profile.css"

const Profile = function({ session, setAlert, setSession }) {
    return (
      <>
        <div className="row">
          <div className="container-profile col-lg-12 col-md-12 col-sm-12">
            <UploadPicture
              session={session}
              setAlert={setAlert}
              setSession={setSession}
            />
            <div className="container-profile-title">
              <h2>{session.truename}</h2>
              <Link to={`/user/${session.username}`} target="_blank">
                Ver pagina publica
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-7 col-md-12 col-sm-12">
              <section className="card">
                  <div className="card-header">
                      <div className="card-title">
                          Meus Dados
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
                            Alterar senha
                        </div>
                        <small>Alterar a senha da sua conta</small>
                    </div>
                    <div className="card-content card-page p-0">
                        <FormNewPassword />
                    </div>
                </section>
            </div>
        </div>
      </>
    )
}

const mapStateToProps = state => ({
  session: state.session.user
})
const mapDispatchToProps = dispatch => ({
  setAlert: (dataAlert) => dispatch(actionsAlert.set(dataAlert)),
  setSession: (dataAlert) => dispatch(actionsSession.set(dataAlert))
})

export default connect( mapStateToProps, mapDispatchToProps)(Profile)
