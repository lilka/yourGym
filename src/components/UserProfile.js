import React, {Component} from 'react'
import jwt_decode from 'jwt-decode'
import axios from "axios";

class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            errors: {}
        }
    }

    getUserInfo(){
        const user_id = this.props.match.params.id;
        axios.get(`/profile/${user_id}`)
            .then(response => {
                const user = response.data;
                this.setState({
                    id: user[0].id,
                    first_name: user[0].first_name,
                    last_name:user[0].last_name,
                    email: user[0].email,

                });
            })

            .catch(error => {console.log(error)});
    }


    componentDidMount() {
        this.getUserInfo()
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">PROFILE</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                        <tr>
                            <td>Imię</td>
                            <td>{this.state.first_name}</td>
                        </tr>
                        <tr>
                            <td>Nazwisko</td>
                            <td>{this.state.last_name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{this.state.email}</td>

                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}export default UserProfile;