import React, {Component} from 'react';
import axios from 'axios';
import {Table} from "reactstrap/es";
import {Redirect} from "react-router-dom";

import {Button} from 'reactstrap'
import Link from "react-router-dom/Link";

export default class WorkoutSchedule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            workouts : [],
        }
        this.getWorkouts = this.getWorkouts.bind(this);
        this.signUpUser = this.signUpUser.bind(this);

    }

    Row = ({name, duration, limits, date, trainer_first_name, trainer_last_name, id, time }) =>
        <tr id ={id}>
            <td> {name}</td>
            <td> {duration}</td>
            <td> {limits}</td>
            <td> {date}</td>
            <td>{time}</td>
            <td>{trainer_first_name } {trainer_last_name}</td>
            <td>
                <Button color={"success"} onClick={()=>this.signUpUser({id})}>Join</Button>
                <Button color={"danger"} onClick={()=>this.signUpUser()}>Leave</Button>

            </td>
        </tr>

    signUpUser = (id) => {
        const workout_id = id;
        console.log(this.state.user_id)
        axios
            .post('/signup/class', {
                user_id: this.state.user_id,
                workout_id: workout_id,

            })
            .then(response => {
                console.log("SignUP")
            })
    }


    signUpUser = (id) => {
        const workout_id = id;
        console.log(this.state.user_id)
        axios
            .post('/signout/class', {
                user_id: this.state.user_id,

            })
            .then(response => {
                console.log("SignUP")
            })
    }



    deleteWorkout =  ({id}) => {

        axios
            .post('/admin/workout/delete' ,{'id': id})
            .then(this.getWorkouts)
            .then(console.log("Deleted"))



            .catch(err => {
                console.log(err);
            })
    }

    getWorkouts = () => {
        axios
            .get('/admin/workouts')
            .then((response) => {
                console.log("response", response);
                const workouts = response.data;
                console.log("response", response)
                console.log("workouts",workouts);
                this.setState({workouts});

            })
            .catch (error => {
                console.log(error)
            });
    }


    componentDidMount() {
        this.getWorkouts()
    }
    render() {
        return(
            <div>
                <p style={{textAlign: "left", fontSize: 50, color:"#37A6E0", marginTop:20 }}>Workout schedule</p>
                <Table striped>
                    <thead>
                    <tr>
                        <th>Workout name</th>
                        <th>Duration</th>
                        <th>Limits</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Trainer</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.workouts.map(this.Row)}
                    </tbody>
                </Table>
            </div>
        );
    }
}

