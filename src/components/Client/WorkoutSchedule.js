import React, {Component} from 'react';
import axios from 'axios';
import {Table} from "reactstrap/es";
import {Redirect} from "react-router-dom";

import {Button} from 'reactstrap'
import Link from "react-router-dom/Link";
import jwt_decode from "jwt-decode";

const JoinButton = ({color, onClick, name})  =>
    <a className={`waves-effect waves-light btn-small ${color}`} onClick={onClick} >{name}</a>



export default class WorkoutSchedule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            workouts : [],
            isError :false


        }
        this.signUpUser = this.signUpUser.bind(this);
        this.getWorkouts = this.getWorkouts.bind(this);

    }

    signUpUser = ({id, limits, sign_up_users})=> {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        const user_id = decoded.identity.id;

        axios
            .post('/signup/class', {
                user_id: user_id,
                workout_id: id,
                limits: limits,
                sign_up_users: sign_up_users

            })
            .then(response=>{
                const data = response.data
                this.getError(data);
            })
            .then(this.getWorkouts)
            .then(alert("Dokonano zapisu na zajęcia"))



    }

    getError =(response) =>{
        console.log(response.error)
        if(response.result === 'error'){
            this.setState({isError:true} )
        }
    }

    signOutUser = ({id}) => {

        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        const user_id = decoded.identity.id;

        axios
            .post('/signout/class', {
                user_id: user_id,
                workout_id: id

            })
            .then(this.getWorkouts)
            .then(response => {
                console.log("SignOut")
            })
    }

    Row = ({name, duration, limits, date, trainer_first_name, trainer_last_name, id, time, sign_up_users, is_sign_up}) =>
        <tr id ={id}>
            <td> {name}</td>
            <td> {duration}</td>
            <td>{limits-sign_up_users} / {limits}</td>
            <td> {date}</td>
            <td>{time}</td>
            <td>{trainer_first_name } {trainer_last_name} </td>
            <td>
                <JoinButton color={is_sign_up === 0 ? 'green': 'red' }
                            onClick={is_sign_up === 0 ? ()=>this.signUpUser({id, limits, sign_up_users}): ()=> {if (window.confirm('Jesteś pewny, ze chcesz się wypisać z treningu?')) this.signOutUser({id})}}
                            name = {is_sign_up === 1 ? "opuść" : "dołącz"} />

            </td>
        </tr>

    getWorkouts = () => {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        const user_id = decoded.identity.id;

        axios
            .post('/user/workouts', {
            user_id: user_id
        })

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
                { this.state.isError ?  <div className={"alert alert-danger"} role="alert">Brak miejsca na zajecia</div>   : " "}
                <p style={{textAlign: "left", fontSize: 50, color:"#37A6E0", marginTop:20 }}>Grafik zajęć</p>
                <Table striped>
                    <thead>
                    <tr>
                        <th>Naza</th>
                        <th>Czas trwania</th>
                        <th>Limit miejsc</th>
                        <th>Data</th>
                        <th>Godzina</th>
                        <th>Trener</th>
                        <th>Akcje</th>
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

