import React, {Component} from "react";
import axios from "axios";
import {ActivationDate, PassSelection} from "./AddUser";





export default class EditUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'error': false,
            first_name: '',
            last_name: '',
            email: '',


            errorMessage: ''


        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkResponse = this.checkResponse.bind(this);
        this.getUserDetails = this.getUserDetails.bind(this);
    }

    onChange(e){
        this.setState( {
            [e.target.name]: e.target.value
        })}





    onSubmit(e){
        e.preventDefault()

        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
           }

           this.editUser(user);
    }

    editUser(user){
        axios.request({
            method: 'put',
            url: `/admin/user/update/${this.props.match.params.id}`,
            data: user
        }).then(this.checkResponse)
            .catch(err=>console.log(err))
    }


    getUserDetails(){
        const user_id = this.props.match.params.id;
        axios.get(`/user/${user_id}`)
            .then(response => {
                const user = response.data;
                this.setState({
                    first_name: user[0].first_name,
                    last_name: user[0].last_name,
                    email: user[0].email,
                });
            })

            .catch(error => {console.log(error)});
    }




    checkResponse(response){
        console.log(response)
        if(response.data == 'error'){
            console.log("ssdkjkjdskj");
            this.setState({error: true});

        }else{

            this.props.history.push('/admin/users')
        }

    }



    componentDidMount() {
        this.getUserDetails()

    }



    render() {
       const {first_name, last_name,email} = this.state;

        return(
            <div className={"container"}>
                <div className={"row"}>
                    <div className="col-md-6 mt-5 mx-auto">
                        { this.state.error ?  <div className={"alert alert-danger"} role="alert">"Bledne dane"</div>   : " "}
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className={"h3 mb-3 font-weight-normal"}>Edytuj użytkownika </h1>
                            <div className={"form-group"}>
                                <label htmlFor={"first_name"}> Imie </label>
                                <input
                                    type={"text"}
                                    className={"form-control"}
                                    name={"first_name"}
                                    value= {first_name}
                                    onChange={this.onChange}
                                    required={"required"}
                                />
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor={"last_name"}> Nazwisko</label>
                                <input
                                    type={"text"}
                                    className={"form-control"}
                                    name={"last_name"}
                                    value={last_name}
                                    onChange={this.onChange}
                                    required={"required"}
                                />
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor={"email"}> Email</label>
                                <input
                                    type={"email"}
                                    className={"form-control"}
                                    name={"email"}
                                    value={email}
                                    onChange={this.onChange}
                                    required={"required"}
                                />

                            </div>
                            <button
                                type={"submit"}
                                className={"btn btn-primary"}>
                                Edytuj
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        )};
}