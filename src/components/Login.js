import React, {Component} from 'react'
import {login} from './UserFunction'
import {FormGroup, FormFeedback} from "reactstrap/es";
import axios from "axios";
import jwt_decode from "jwt-decode";


class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password: '',
            id: '',
            errors: {},

        },
        this.handleChange= this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }







    handleChange = async (event) => {
        const { target } = event;
        const { name } = target;
        await this.setState({
            [ name ]: event.target.value,
        });
    };

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
            }).catch(err=>console.log(err))
    }






    render() {
        return(  <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Zaloguj sie!</h1>
                            <div className="form-group">
                                <label htmlFor="email">Adres email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={ (e) => {
                                        this.handleChange(e);
                                    } }
                                />

                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Haslo</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="haslo"
                                    value={this.state.password}
                                    onChange={this.handleChange}
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
