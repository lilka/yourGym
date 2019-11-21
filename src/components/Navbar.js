import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

class Landing extends Component {
    logOut(e){
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
    }

    render() {


    return(

        <div>
            <nav className="blue darken-3">
                <div className="nav-wrapper">
                    <a href="/" className="brand-logo center">yourGym</a>
                    <a data-activates="main-menu" className="button-collapse show-on-large">
                        <i className="fa fa-bars"></i>
                    </a>
                    <ul className="right hide-on-small-only">
                        <li><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
                    </ul>
                    <ul className="side-nav" id="main-menu">
                        <li><Link to="/admin/workouts"><i className="fa fa-calendar"></i> Workouts</Link></li>
                        <li><Link to="/admin/users"><i className="fa fa-users"></i> Users</Link></li>
                        <li><Link to="/about"><i className="fa fa-question-circle"></i> About</Link></li>
                    </ul>
                </div>
            </nav>
        </div>

    )};
    }export default withRouter(Landing)


