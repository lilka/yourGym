import React, {Component} from 'react'
import {login} from './UserFunction'
import {FormGroup, FormFeedback} from "reactstrap/es";


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


    onSubmit(e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }


    }


    render() {
        return(  <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={ (e) => {
                                        this.handleChange(e);
                                    } }
                                />

                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block"
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
