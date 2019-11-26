import React, {Component} from 'react'
import {login} from './UserFunction'
import {FormGroup, FormFeedback} from "reactstrap/es";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {FormErrors} from "./FormErrors";
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
    // validateField(fieldName, value) {
    //     let fieldValidationErrors = this.state.formErrors;
    //     let emailValid = this.state.emailValid;
    //     let passwordValid = this.state.passwordValid;
    //
    //     switch(fieldName) {
    //         case 'email':
    //             emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    //             fieldValidationErrors.email = emailValid ? '' : ' is invalid';
    //             break;
    //         case 'password':
    //             passwordValid = value.length >= 6;
    //             fieldValidationErrors.password = passwordValid ? '': ' is too short';
    //             break;
    //         default:
    //             break;
    //     }
    //     this.setState({formErrors: fieldValidationErrors,
    //         emailValid: emailValid,
    //         passwordValid: passwordValid
    //     }, this.validateForm);
    // }
    //
    // validateForm() {
    //     this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    // }
    //
    // errorClass(error) {
    //     return(error.length === 0 ? '' : 'has-error');
    // }


    checkUser(){
        const token = localStorage.usertoken
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
        return(  <div className="container">
                <div className="row">

                    <div className="col-md-6 mt-5 mx-auto">
                        { this.state.isError ?  <div className={"alert alert-danger"} role="alert">Haslo lub email jest niepoprawne</div>   : " "}

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
                                <label htmlFor="password">Haslo</label>
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
