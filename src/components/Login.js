import React, {Component} from 'react'

import axios from "axios";
import jwt_decode from "jwt-decode";

import styled from 'styled-components';





const Error = styled.div`
  background-color: red;
`;


class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password: '',
            id: '',
            formErrors: {email: '', password: ''},
            isError: false,

            emailValid: false,
            passwordValid: false,
            formValid: false

        },
        this.handleUserInput= this.handleUserInput.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value})
    }



    checkUser(response){

        const token = localStorage.getItem('usertoken')
        const decoded = jwt_decode(token);
        const {id, role} = decoded.identity;


        if (role == 'admin') {
            return this.props.history.push('/admin')
        } else {
            return this.props.history.push(`/profile/${id}`)
        }
    }


    onSubmit(e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        axios
            .post('users/login', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                localStorage.setItem('usertoken', response.data)
                return response.data
            })
            .then(response =>{
                this.checkUser()
            }).catch(err=> this.setState({isError: true}));

    }






    render() {
        return(
            <div className="container">
                <div className="row">

                    <div className="col-md-6 mt-5 mx-auto">
                        { this.state.isError ?  <div className={"alert alert-danger"} role="alert">Hasło lub email jest niepoprawne</div>   : " "}

                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Zaloguj sie!</h1>

                            <div className={`form-group  `}>
                                <label htmlFor="email">Adres email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={ (e) => {
                                        this.handleUserInput(e);
                                    } }
                                />

                            </div>
                            <div className={`form-group`}>
                                <label htmlFor="password">Hasło</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="haslo"
                                    value={this.state.password}
                                    onChange={this.handleUserInput}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block"

                            >
                                Zaloguj!
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default Login
