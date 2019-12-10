import React, {Component} from 'react';
import axios from 'axios';
import {Table} from "reactstrap/es";
import Link from "react-router-dom/Link";
import {Button} from "reactstrap";

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
                const all_users = response.data;
                this.setState({users: all_users});


            })
            .catch(error => {
                console.log(error)
            });
    }

    Row = ({first_name, last_name, id, start_date, type, active}) =>
        <tr id={id}>
            <td> {first_name}</td>
            <td> {last_name}</td>
            <td> {type}</td>
            <td> {start_date}</td>
            <td> {active} </td>
            <td>
                <a className="btn-floating btn-small waves-effect waves-light blue" onClick = {()=>{if (window.confirm('Jestes pewny, ze chcesz usunac tego uzytkownika?')) this.deleteUser({id}) }}  ><i className="material-icons">delete</i></a>
                <Link  link to={`/admin/user/edit/${id}`}><i className="material-icons left">edit</i></Link>
            </td>
        </tr>



    deleteUser =  ({id}) => {

        axios
            .post('/admin/user/delete' ,{"id": id})
            .then(this.getAllUsers)




            .catch(err => {
                console.log(err);
            })
        this.getAllUsers()

    }



    componentDidMount() {
        this.getAllUsers()
    }




    render() {

        return(
            <div>
                <div style={{textAlign: "center"}}>
                    <Button color="success"
                            href="/admin/add/user"
                            style={{width:"300px"}}>
                        Dodaj nowego użytkownika </Button>
                </div>
                <p style={{textAlign: "left", fontSize: 50, color:"#37A6E0", marginTop:20}}>Klienci</p>
                <Table striped size="sm" responsive="md">
                    <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Typ karnetu</th>
                        <th>Data rozpoczęcia</th>
                        <th>Status karnetu</th>
                        <th>Akcje</th>
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

