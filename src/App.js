import React, {Component} from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import AdminPanel from "./components/AdminPanel";
import ViewWorkouts from "./components/ViewWorkouts";
import AddWorkout from "./components/AddWorkout";
import EditWorkout from "./components/EditWorkout";
import WorkoutDetails from "./components/WorkoutDetails";
import ViewUser from "./components/ViewUser";

class App extends Component {
 render(){
  return (
  <Router>
   <div className="App">
    <Navbar/>
     <Route exact path ='/' component ={Landing} />
        <div className = "container">
           <Route exact path ='/register' component ={Register} />
           <Route exact path ='/login' component ={Login} />
           <Route exact path ='/profile' component ={UserProfile} />
           <Route exact path ='/admin' component ={AdminPanel} />
           <Route exact path ='/admin/workouts' component ={ViewWorkouts} />
           <Route exact path = '/admin/workout/delete' component={ViewWorkouts} />
           <Route exact path = '/admin/add/workout' component={AddWorkout} />
           <Route exact path ='/admin/workout/update/:id' component={EditWorkout}/>
           <Route exact path ='/admin/workout/details/:id' component={WorkoutDetails}/>
           <Route exact path = '/admin/users' component = {ViewUser}/>
        </div>
     </div>
   </Router>
  );
}
}
export default App;
