import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import logo from '../img/yourGym.png'
import jwt_decode from "jwt-decode";

class Landing extends Component {
    constructor(props) {
        super(props)
    }

    logOut(){

        localStorage.removeItem('usertoken')
        this.props.history.push('/')
    }

    setRole(){
        const token = localStorage.usertoken
        var role = null
        console.log(token)
        if(token !== undefined){
            const decoded = jwt_decode(token)
            role = decoded.identity.role;}
        return role

    }

    getId() {
        const token = localStorage.usertoken
        var id = null;
        if (token !== undefined) {
            const decoded = jwt_decode(token)
            const id = decoded.identity.id;

            return id
        }
    }





    render() {
     const id = this.getId()
    if (this.setRole() !== null){
    return(
        <div>
            <nav className="blue darken-3">


                <div className="nav-wrapper">
                    <a href="/" className="brand-logo center">yourGym</a>
                    <a data-activates="main-menu" className="button-collapse show-on-large">
                        <i className="fa fa-bars"></i>
                    </a>

                    <ul className="right hide-on-small-only">
                        <a className=" waves-effect waves-light btn-small" onClick = {()=>{if (window.confirm('Napewno chcesz sie wylogowac?')) this.logOut()}} >Wyloguj sie</a>
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
                        {this.setRole() ==='admin' ?  <li><Link to="/admin/workouts"><i className="fa fa-calendar"></i> Zarządzaj grafikiem zajęć</Link></li>:
                            <li><Link  link to={`/profile/${id}`}><i className="fa fa-calendar"></i> Profil</Link></li>
                        }
                        {this.setRole() ==='admin' ?  <li><Link to="/admin/users"><i className="fa fa-users"></i> Zarządzaj użytkownikami</Link></li>:
                            <li><Link link to="/schedule"><i className="fa fa-users"></i> Grafik zajęć</Link></li>
                        }
                        {this.setRole() === 'admin' ?  <li><Link to="/admin/addTrainer"><i className="fa fa-users"></i> Zarządzaj trenerami</Link></li>:  <li><Link to="/about"><i className="fa fa-question-circle"></i> Informacje </Link></li>}

                    </ul>
                </div>
            </nav>
        </div>


    );
    }else{
        return (
            <div>
                <nav className="blue darken-3">


                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo center">yourGym</a>

                        <ul >
                            <li><Link to="/register"><i className="fa fa-id-card"></i> Rejestracja</Link></li>
                        </ul>
                        <ul>
                            <li><Link to="/login"><i className="fa fa-user"></i> Logowanie</Link></li>
                        </ul>
                        <ul className="right hide-on-small-only">
                            <li><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
    }}export default withRouter(Landing)


