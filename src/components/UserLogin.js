import React from 'react'
import Login from './Login'
import {login} from './UserFunction'

const doLogin = () =>
    login().then(() => this.props.history.push('/profile'));

const UserLogin = () =>
    <Login login={doLogin} />