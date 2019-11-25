import React, { Component } from "react";

import axios from "axios";





export default class EditWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"",
            name: "",
            duration: "",
            limits: "",
            date:"",
            trainer_first_name:"",
            trainer_last_name:"",
            trainer_id:"",
            time: "",
            trainers: [],
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
        this.handelTrainerChange = this.handelTrainerChange.bind(this);
    }

    handelTrainerChange(e)  {
        this.setState({trainer_id : e.target.value});
        console.log(this.state.trainer_id)
    }


    handleInputChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name] : value
        });
    }

    getWorkoutDetails(){
        const workout_id = this.props.match.params.id;
        axios.get(`/admin/workout/getWorkout/${workout_id}`)
            .then(response => {
                const workout = response.data;
                this.setState({
                        id: workout[0].id,
                        name: workout[0].name,
                        duration:workout[0].duration,
                        limits: workout[0].limits,
                        date: workout[0].date,
                        trainer_first_name:workout[0].trainer_first_name,
                        trainer_last_name:workout[0].trainer_last_name,
                        trainer_id: workout[0].trainer_id,
                        time: workout[0].time
                    });
            })

            .catch(error => {console.log(error)});
    }

    getTrainers = () => {
        axios
            .get('/trainers')
            .then((response) => {
                console.log("response", response);
                const trainers = response.data;
                console.log("response", response)
                console.log("trainers", trainers);
                this.setState({trainers: trainers});
                console.log("state", this.state)

            })
            .catch(error => {
                console.log(error)
            });
    }

    componentDidMount() {
        this.getWorkoutDetails()
        this.getTrainers()
    }

    onSubmit(e){
        e.preventDefault()

        const workout = {
            name: this.state.name,
            duration: this.state.duration,
            limits: this.state.limits,
            date: this.state.date,
            trainer: this.state.trainer_id,
            time: this.state.time
        }
        console.log('submited workouts', workout)
        this.editWorkout(workout)
    }

        editWorkout(workout){
         axios.request({
             method: 'put',
             url: `/admin/workout/update/${this.state.id}`,
             data: workout
         }).then(response =>{
             this.props.history.push('/admin/workouts')
         }).catch(err=>console.log(err))
        }

    render() {
        const {name, duration, limits, date, trainer_id, time} = this.state
        const optionItems = ({id, first_name, last_name}) =>
            <option value = {id}>{first_name} {last_name } </option>
        return(
            <div className={"container"}>
                <div className={"row"}>
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className={"h3 mb-3 font-weight-normal"}>Edytuj trening </h1>
                            <div className={"form-group"}>
                                <label htmlFor={"name"}> Imie </label>
                                <input
                                    type={"text"}
                                    className={"form-control"}
                                    name={"name"}
                                    value= {name}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor={"duration"}> Czas treningu</label>
                                <input
                                    type={"number"}
                                    className={"form-control"}
                                    name={"duration"}
                                    value={duration}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor={"limits"}> Limit miejsc</label>
                                <input
                                    type={"number"}
                                    className={"form-control"}
                                    name={"limits"}
                                    value={limits}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor={"limits"}> Trenerzy</label>
                                <select
                                    value = {trainer_id}
                                    className={"form-control"}
                                    onChange = {this.handelTrainerChange} >
                                    {this.state.trainers.map(optionItems)}
                                </select>
                            </div>
                            <div class="form-group">
                                <label htmlFor={"date"}>Data</label>
                                <input
                                    type={"date"}
                                    className={"form-control"}
                                    name={"date"}
                                    value={date}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor={"time"}>Godzina</label>
                                <input
                                    type={"time"}
                                    className={"form-control"}
                                    name={"time"}
                                    placeholder={"enter time"}
                                    value={time}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <button
                                type={"submit"}
                                className={"btn btn-primary"}>
                                Zapisz
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )};
}

