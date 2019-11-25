import React, {Component} from 'react'
import {register} from './UserFunction'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            password: '',
            email: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value })
    }
        onSubmit(e){
            e.preventDefault()

        const newUser = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            password: this.state.password,
            email: this.state.email

        }

        register(newUser).then(res => {
            this.props.history.push('/login')
        })
    }
    render() {
     return(
         <div className={"container"}>
             <div className={"row"}>
                 <div className={"col-md-6 mt-5 mx-auto"}>
                     <form noValidate onSubmit={this.onSubmit}>
                         <h1 className={"h3 mb-3 font-weight-normal"}>Register </h1>
                         <div className={"form-group"}>
                             <label htmlFor={"name"}> First name</label>
                             <input
                                 type={"text"}
                                 className={"form-control"}
                                 name={"first_name"}
                                 placeholder={"podaj imie"}
                                 value={this.state.first_name}
                                 onChange={this.onChange}
                             />
                         </div>
                         <div className={"form-group"}>
                             <label htmlFor={"name"}> Last name</label>
                             <input
                                 type={"text"}
                                 className={"form-control"}
                                 name={"last_name"}
                                 placeholder={"podaj nazwisko"}
                                 value={this.state.last_name}
                                 onChange={this.onChange}
                             />
                         </div>
                         <div className={"form-group"}>
                             <label htmlFor={"email"}> Email addres</label>
                             <input
                                 type={"email"}
                                 className={"form-control"}
                                 name={"email"}
                                 placeholder={"podaj email"}
                                 value={this.state.email}
                                 onChange={this.onChange}
                             />
                         </div>
                         <div className={"form-group"}>
                             <label htmlFor={"password"}>Password</label>
                             <input
                                 type={"password"}
                                 className={"form-control"}
                                 name={"password"}
                                 placeholder={"podaj haslo"}
                                 value={this.state.password}
                                 onChange={this.onChange}
                             />
                         </div>
                         <button
                             type={"submit"}
                             className={"btn btn-primary"}>
                             Zarejestruj!
                         </button>
                     </form>
                 </div>
             </div>

         </div>
     )}}export default Register