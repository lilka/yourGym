import React, {Component} from 'react'
import jwt_decode from 'jwt-decode'

class AdminPanel extends Component {
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
            first_name: decoded.identity.name,
            last_name: decoded.identity.last_name,
            email: decoded.identity.email
        })
    }

render() {
    return (
        <div className="container">
            <div className="jumbotron mt-5">
                <div className="col-sm-8 mx-auto">
                    <h1 className="text-center" >ADMIN PANEL</h1>
                </div>
            </div>
        </div>
    )
}
}export default AdminPanel;