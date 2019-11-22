import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import logo from '../img/yourGym.png'

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
                        <ul id="slide-out" className="sidenav"  >
                            <li  style={{ maxHeight:200, width:200 }}>
                                <div className="user-view">
                                    <div className="background">
                                        <img src={logo} style={{ maxHeight:200, width:200 }}/>
                                    </div>

                                </div>
                            </li>
                        </ul>
                        <li><Link to="/admin/workouts"><i className="fa fa-calendar"></i> Zarządzaj grafikiem zajęć</Link></li>
                        <li><Link to="/admin/users"><i className="fa fa-users"></i> Zarządzaj użytkownikami</Link></li>
                        <li><Link to="/admin/addTrainer"><i className="fa fa-users"></i> Zarządzaj trenerami</Link></li>
                        <li><Link to="/about"><i className="fa fa-question-circle"></i> Informacje </Link></li>
                    </ul>
                </div>
            </nav>
        </div>

    )};
    }export default withRouter(Landing)


