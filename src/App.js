import React, {Component} from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import AdminPanel from "./components/Admin/AdminPanel";
import ViewWorkouts from "./components/Admin/ViewWorkouts";
import AddWorkout from "./components/Admin/AddWorkout";
import EditWorkout from "./components/Admin/EditWorkout";
import WorkoutDetails from "./components/Admin/WorkoutDetails";
import ViewUser from "./components/Admin/ViewUser";
import WorkoutSchedule from "./components/Client/WorkoutSchedule";
import AddTrainer from "./components/Admin/AddTrainer";
import {UserLogin} from "./components/UserLogin";
import CookieConsent, {Cookies} from "react-cookie-consent";
import AddUser from "./components/Admin/AddUser";
import EditUser from "./components/Admin/EditUser";
import { instanceOf } from 'prop-types';
import { withCookies } from 'react-cookie';

class App extends Component {





    render(){

  return (

  <Router>
   <div className="App">
    <Navbar/>
       <CookieConsent
           location="bottom"
           buttonText="Pewnie, że akceptuje!"
           cookieName="myAwesomeCookieName2"
           style={{ background: "#2B373B" }}
           buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
           acceptOnScroll={true}
           acceptOnScrollPercentage={50}
           expires={150}
           onAccept={() => {alert("yay!")}}
           enableDeclineButton
           declineButtonText="Nie akceptuje"
           onDecline={() => {alert("nay!")
           }}
       >
           Strona używa cookies.{" "}
           <span style={{ fontSize: "10px" }}>
    </span>
       </CookieConsent>

       <Route exact path ='/' component ={Landing} />
        <div className = "container">

           <Route exact path ='/register' component ={Register} />
           <Route exact path ='/login' component ={Login} />
           <Route exact path ='/profile/:id' component ={UserProfile} />
           <Route exact path ='/admin' component ={AdminPanel} />
           <Route exact path ='/admin/workouts' component ={ViewWorkouts} />
           <Route exact path = '/admin/workout/delete' component={ViewWorkouts} />
           <Route exact path = '/admin/add/workout' component={AddWorkout} />
           <Route exact path ='/admin/workout/update/:id' component={EditWorkout}/>
           <Route exact path ='/admin/workout/details/:id' component={WorkoutDetails}/>
           <Route exact path ='/admin/addTrainer' component ={AddTrainer}/>
           <Route exact path = '/admin/users' component = {ViewUser}/>
           <Route exact path ='/schedule' component ={WorkoutSchedule}/>
           <Route exact path ='/admin/add/user' component ={AddUser}/>
           <Route exact path ='/admin/user/edit/:id' component ={EditUser}/>
        </div>
     </div>
   </Router>
  );
}
}
export default withCookies(App);
