import React, {Component} from 'react';
import axios from 'axios';
import {Table} from "reactstrap/es";
import {Redirect} from "react-router-dom";

import {Button} from 'reactstrap'
import Link from "react-router-dom/Link";

export default class ViewWorkouts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            workouts : [],
        }
        this.getWorkouts = this.getWorkouts.bind(this);
        this.deleteWorkout = this.deleteWorkout.bind(this);

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
                <a className="btn-floating btn-small waves-effect waves-light blue" onClick = {()=>{if (window.confirm('Jestes pewny, ze chcesz usunac ten trening?')) this.deleteWorkout({id}) }} ><i className="material-icons">delete</i></a>
                <Link  link to={`/admin/workout/update/${id}`}><i className="material-icons left">edit</i></Link>
                <Link  link to={`/admin/workout/details/${id}`}><i className="material-icons left">details</i></Link>
            </td>
        </tr>

    deleteWorkout =  ({id}) => {

        axios
            .post('/admin/workout/delete' ,{'id': id})
            .then(this.getWorkouts)
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
                <div style={{textAlign: "center"}}>
                    <Button color="success"
                            href="/admin/add/workout"
                            style={{width:"300px"}}>
                        Dodaj trening </Button>
                </div>
            <Table striped>
                <thead>
                <tr>
                    <th>Nazwa</th>
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

