import React from 'react'
import Login from './Login'
import {login} from './UserFunction'

const doLogin = user =>
    login(user).then(() => this.props.history.push('/profile'));

export const UserLogin = () =>
    <Login doLogin/>