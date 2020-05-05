import React from 'react'
import { Redirect } from 'react-router-dom'

import { deleteSessionToken } from '../../utils/utils'

export default function Logout() {

    deleteSessionToken()

    return <Redirect to="/login" />
}
