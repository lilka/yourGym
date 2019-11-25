import React, { Component } from "react";
import {addWorkout} from "../WorkoutFunction";
import axios from "axios";



export default class AddWorkout extends Component {
    constructor(props) {
        super(props);

        this.state = {

            'name': "",
            'duration': "",
            'limits': "",
            'date': "",
            'trainer': "",
            'time': "",
            trainers: [],
            trainer_id : null


        };

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handelTrainerChange = this.handelTrainerChange.bind(this)
    }

    onChange(e){
            this.setState( {
                [e.target.name]: e.target.value
        })}

     handelTrainerChange(e)  {
        this.setState({trainer_id : e.target.value});
        }

      onSubmit(e){
            e.preventDefault()

            const workout = {
                name: this.state.name,
                duration: this.state.duration,
                limits: this.state.limits,
                date: this.state.date,
                trainer: this.state.trainer_id,
                time: this.state.time,
            }
            console.log('submited workouts', workout)
            addWorkout(workout).then(res => {
                this.props.history.push('/admin/workouts')
            })
        }

    getTrainers = () => {
        axios
            .get('/trainers')
            .then((response) => {
                console.log("response", response);
                const trainers = response.data;
                console.log("response", response)
                console.log("trainers",trainers);
                this.setState({trainers: trainers});
                console.log("state", this.state.trainers)

            })
            .catch (error => {
                console.log(error)
            });
    }


    componentDidMount() {
        this.getTrainers()
    }



        render() {
            const {name, duration, limits, date, trainer_id, trainers, time} = this.state
            const optionItems = ({id, first_name, last_name}) =>
                <option value = {id}>{first_name} {last_name } </option>
            console.log({trainer_id}, typeof trainer_id)
            return(
                <div className={"container"}>
                    <div className={"row"}>
                        <div className="col-md-6 mt-5 mx-auto">
                            <form noValidate onSubmit={this.onSubmit}>
                                <h1 className={"h3 mb-3 font-weight-normal"}>Add workout </h1>
                                <div className={"form-group"}>
                                    <label htmlFor={"name"}> Nazwa </label>
                                    <input
                                        type={"text"}
                                        className={"form-control"}
                                        name={"name"}
                                        placeholder={"podaj nazwe treningu"}
                                        value= {name}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className={"form-group"}>
                                    <label htmlFor={"duration"}> Czas trwania</label>
                                    <input
                                        type={"number"}
                                        className={"form-control"}
                                        name={"duration"}
                                        placeholder={"podaj czas trwania treningu"}
                                        value={duration}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className={"form-group"}>
                                    <label htmlFor={"limits"}> Limit miejsc</label>
                                    <input
                                        type={"number"}
                                        className={"form-control"}
                                        name={"limits"}
                                        placeholder={"wprowadz limit miejsc"}
                                        value={limits}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className={"form-group"}>
                                    <label htmlFor={"trainers"}> Trenerzy</label>
                                    <select
                                        value = {trainer_id}
                                        className={"form-control"}
                                        onChange = {this.handelTrainerChange} >
                                        <option>Wybierz trenera </option>
                                        {trainers.map(optionItems)}
                                    </select>
                                </div>
                                <div className={"form-group"}>
                                    <label htmlFor={"date"}>Data</label>
                                    <input
                                        type={"date"}
                                        className={"form-control"}
                                        name={"date"}
                                        placeholder={"Podaj date"}
                                        value={date}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className={"form-group"}>
                                    <label htmlFor={"time"}>Czas</label>
                                    <input
                                        type={"time"}
                                        className={"form-control"}
                                        name={"time"}
                                        placeholder={"Podaj czas treningu"}
                                        value={time}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <button
                                    type={"submit"}
                                    className={"btn btn-primary"}>
                                    Dodaj trening
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            )};
}

