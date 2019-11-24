import React, {Component} from 'react'
import jwt_decode from 'jwt-decode'

class UserProfile extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            errors: {}
        }
    }

    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            id: decoded.identity.id,
            role: decoded.identity.role
        })
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
                            <td>ID</td>
                            <td>{this.state.id}</td>
                        </tr>
                        <tr>
                            <td>Role</td>
                            <td>{this.state.role}</td>
                        </tr>
                        <tr>
                            <td>Email</td>

                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}export default UserProfile;