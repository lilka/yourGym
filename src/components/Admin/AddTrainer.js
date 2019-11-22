import React, { Component } from "react";
import {addWorkout} from "../WorkoutFunction";
import axios from "axios";



export default class AddTrainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
        };

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState( {
            [e.target.name]: e.target.value
        })}


    onSubmit(e){
        e.preventDefault()

        return axios
            .post('/admin/addTrainer', {
                first_name: this.state.first_name,
                last_name: this.state.last_name
            })
            .then(response => {
                console.log("Trainer added")
            })
    }




    render() {
        const {first_name, last_name} = this.state
        return(
            <div className={"container"}>
                <div className={"row"}>
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className={"h3 mb-3 font-weight-normal"}>Dodaj trenera </h1>
                            <div className={"form-group"}>
                                <label htmlFor={"first_name"}> Imię </label>
                                <input
                                    type={"text"}
                                    className={"form-control"}
                                    name={"first_name"}
                                    placeholder={"Podaj imię"}
                                    value= {first_name}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor={"duration"}> Nazwisko</label>
                                <input
                                    type={"text"}
                                    className={"form-control"}
                                    name={"last_name"}
                                    placeholder={"Podaj nazwisko"}
                                    value={last_name}
                                    onChange={this.onChange}
                                />
                            </div>
                            <button
                                type={"submit"}
                                className={"btn btn-primary"}>
                                Dodaj trenera
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        )};
}

