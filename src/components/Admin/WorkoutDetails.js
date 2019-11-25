import React, {Component} from 'react';
import axios from 'axios';
import {Table} from "reactstrap/es";
import {Button} from 'reactstrap';


export default class WorkoutDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user_id:null,
            enrolled_user :[],
            all_users: [],
            workout_id: "",
            name:"",
            limits:"",
            trainer_first_name:"",
            trainer_last_name:"",
            time:"",
            duration:"",
            date:"",
            trainer_id:"",


        }
        this.handelUserChange = this.handelUserChange.bind(this);
        this.getEnrolledUsers = this.getEnrolledUsers.bind(this);
        this.signUpUser = this.signUpUser.bind(this);
        this.userIsAbsent = this.userIsAbsent.bind(this);
        this.userIsPresent = this.userIsPresent.bind(this);


    }

    handelUserChange(e)  {
        this.setState({user_id : e.target.value});
    }


    userIsPresent = ({user_id}) => {
        let workout_id = this.props.match.params.id;
        axios
            .post('/admin/workout/attendance', {
                user_id: user_id,
                workout_id: workout_id,
                present: true
            })
            .then(this.getEnrolledUsers)
            .then(response => {
                console.log("Present")
            })
    }

    userIsAbsent = ({user_id}) => {
        let workout_id = this.props.match.params.id;
        console.log({user_id})
        axios
            .post('/admin/workout/attendance', {
                user_id: user_id,
                workout_id: workout_id,
                present: false
            })
            .then(this.getEnrolledUsers)
            .then(response => {
                console.log("Present")
            })
    }

    signUpUser = () => {
        let workout_id = this.props.match.params.id;
        console.log(this.state.user_id)
        axios
            .post('/signup/class', {
                user_id: this.state.user_id,
                workout_id: workout_id,

            })
            .then(this.getEnrolledUsers)
            .then(response => {
                console.log("SignUP")
            })
    }

    Row = ({first_name, last_name, user_id, persent}) =>
        <tr id={user_id}>
            <td> {first_name}</td>
            <td> {last_name}</td>
            <td>
                <a className={`btn-floating btn-small waves-effect waves-light green ${persent === 1 ? 'disabled' : ''}`} onClick={() =>this.userIsPresent({user_id})} ><i className="material-icons">add</i></a>
                <a className={`btn-floating btn-small waves-effect waves-light red ${persent === 0 ? 'disabled' : ''}`} onClick={() =>this.userIsAbsent({user_id})}><i className="material-icons">remove</i></a>
            </td>
        </tr>


    getEnrolledUsers = () => {
        let id = this.props.match.params.id;
        axios
            .get(`/admin/workout/details/${id}`)
            .then((response) => {
                console.log("response", response);
                const enrolled_user = response.data;
                console.log("response", response)
                console.log("users",enrolled_user);
                this.setState({enrolled_user: enrolled_user});

            })
            .catch (error => {
                console.log(error)
            });
    }

    getUsers= () => {
        axios
            .get('/users')
            .then((response) => {
                const all_users = response.data;
                console.log("all_users", all_users);
                this.setState({all_users: all_users});

            })
            .catch(error => {
                console.log(error)
            });
    }

    getWorkoutDetails(){
        let workout_id = this.props.match.params.id
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


    componentDidMount() {
        this.getEnrolledUsers()
        this.getUsers()
        this.getWorkoutDetails()
    }

    render() {
        const optionItems = ({id, first_name, last_name}) =>
            <option value = {id}>{first_name} {last_name } </option>

        return(
            <div>
                <div>
                    <p style={{textAlign: "left", fontSize: 50, color:"#37A6E0", marginTop:20 }}>{this.state.name}</p>
                    <ul className={"collection"}>
                        <li className={"collection-item"} style={{textAlign: "left"}}><strong>{this.state.date} at {this.state.time}</strong></li>
                        <li className={"collection-item"} style={{textAlign: "left"}}>Trainer:{this.state.trainer_first_name} {this.state.trainer_last_name}  Limits: {this.state.limits}</li>
                    </ul>
                </div>
                <div>
                    <p style={{textAlign: "left", fontSize: 50, color:"#37A6E0", marginTop:20}}>Attendance list</p>
                <Table striped size="sm" responsive="xl" hover={true} >
                    <thead>
                    <tr>
                        <th>Imie</th>
                        <th>Nazwisko</th>
                        <th>Zaznacz obecnosc</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.enrolled_user.map(this.Row)}
                    </tbody>
                </Table>

                </div>
                <div >
                    <p style={{textAlign: "left", fontSize: 50, color:"#37A6E0", marginTop:20}}>Wybiez uzytkownika, aby go zapisac </p>
                    <select
                        className={"form-control"}
                        value = {this.state.user_id}
                        onChange = {this.handelUserChange}
                        style={{width:"300px"}}>
                        <option>Wybierz uzytkownika </option>
                        {this.state.all_users.map(optionItems)} </select>
                     <Button onClick={()=>this.signUpUser()}>Zapisz</Button>
                 </div>
            </div>
        );
    }
}

