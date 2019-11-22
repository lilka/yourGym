import React, {Component} from 'react';
import axios from 'axios';
import {Table} from "reactstrap/es";
import Link from "react-router-dom/Link";

export default class ViewWorkouts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users : [],
        }

    }

    getAllUsers = () => {
        axios
            .get('/users')
            .then((response) => {
                console.log("response", response);
                const all_users = response.data;
                console.log("response", response)
                console.log("trainers", all_users);
                this.setState({users: all_users});
                console.log("state", this.state)

            })
            .catch(error => {
                console.log(error)
            });
    }

    Row = ({first_name, last_name, user_id, start_date, type, active}) =>
        <tr id={user_id}>
            <td> {first_name}</td>
            <td> {last_name}</td>
            <td> {type}</td>
            <td> {start_date}</td>
            <td> {active}</td>
            <td>
                <a className="btn-floating btn-small waves-effect waves-light blue" onClick = {() =>this.deleteUser({user_id}) }  ><i className="material-icons">delete</i></a>
                <Link  link to={`/admin/workout/update/${user_id}`}><i className="material-icons left">edit</i></Link>
            </td>
        </tr>



    deleteUser =  ({user_id}) => {

        axios
            .post('/admin/workout/delete' ,{'id': user_id})
            .then(console.log("Deleted"))



            .catch(err => {
                console.log(err);
            })
        this.getWorkouts()

    }



    componentDidMount() {
        this.getAllUsers()
    }




    render() {

        return(
            <div>
                <p style={{textAlign: "left", fontSize: 50, color:"#37A6E0", marginTop:20}}>All users</p>
                <Table striped size="sm" responsive="md">
                    <thead>
                    <tr>
                        <th>First_name</th>
                        <th>Last_name</th>
                        <th>Pass type</th>
                        <th>Start date</th>
                        <th>Pass status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map(this.Row)}
                    </tbody>
                </Table>
            </div>
        );
    }
}

