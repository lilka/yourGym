import React, {Component} from "react";
import axios from "axios";


export const PassSelection =({onChange, pass_type_id, mapping}) =>
    <div className={"form-group"}>
        <label htmlFor={"pass_type_id"}> Typy karnetu</label>
        <select
            value = {pass_type_id}
            className={"form-control"}
            onChange = {onChange} >
            <option>Wybierz typ karnetu </option>
            {mapping}
        </select>
    </div>


export const ActivationDate =({start_date, onChange}) =>
     <div className={"form-group"}>
         <label htmlFor={"start_date"}>Data rozpoczęcia karnetu</label>
         <input
             type={"datetime"}
             className={"form-control"}
             name={"start_date"}
             placeholder={"Podaj date"}
             value={start_date}
             onChange={onChange}
         />
     </div>


export default class AddUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'error': false,
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            start_date: '',
            role: '',
            pass_type_id: '',
            pass_types: [],

            errorMessage: ''


        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handelPassTypeChange = this.handelPassTypeChange.bind(this);
        this.checkResponse = this.checkResponse.bind(this);
        this.handelRoleChange = this.handelRoleChange.bind(this);
    }

    onChange(e){
        this.setState( {
            [e.target.name]: e.target.value
        })}

    handelRoleChange(e)  {
        console.log(e.target.value)
        this.setState({role : e.target.value});
        console.log(this.state.role);
    }


    handelPassTypeChange(e)  {
        this.setState({pass_type_id : e.target.value});
    }

    onSubmit(e){
        e.preventDefault()

        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            start_date: this.state.start_date,
            pass_type_id: this.state.pass_type_id,
            role:  this.state.role
        }
        axios
            .post('/admin/add/user', {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password,
                start_date: this.state.start_date,
                pass_type_id: this.state.pass_type_id,
                role:  this.state.role
            })
            .then(this.checkResponse)
            .catch(err=>console.log(err))
    }




    checkResponse(response){
        console.log(response)
        if(response.data == 'error'){
            this.setState({error: true});

        }else{

            this.props.history.push('/admin/users')
        }

    }
    getPassTypes = () => {
        axios
            .get('/passTypes')
            .then((response) => {
                const pass_types = response.data;
                this.setState({pass_types: pass_types});
            })
            .catch (error => {
                console.log(error)
            });
    }


    componentDidMount() {
        this.getPassTypes()
    }



    render() {
        const {pass_types, first_name, last_name, email, password, start_date, pass_type_id,role } = this.state
        const optionItems = ({id, type}) =>
            <option value = {id}>{type}  </option>
        return(
            <div className={"container"}>
                <div className={"row"}>
                    <div className="col-md-6 mt-5 mx-auto">
                        { this.state.error ?  <div className={"alert alert-danger"} role="alert">"Błędne dane"</div>   : " "}
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className={"h3 mb-3 font-weight-normal"}>Dodaj użytkownika </h1>
                            <div className={"form-group"}>
                                <label htmlFor={"first_name"}> Imie </label>
                                <input
                                    type={"text"}
                                    className={"form-control"}
                                    name={"first_name"}
                                    placeholder={"Podaj imię"}
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
                                    placeholder={"Podaj nazwisko"}
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
                                    placeholder={"Podaj email"}
                                    value={email}
                                    onChange={this.onChange}
                                    required={"required"}
                                />
                                <div className={"form-group"}>
                                    <label htmlFor={"password"}>Ustaw hasło użytkownikowi</label>
                                    <input
                                        type={"password"}
                                        className={"form-control"}
                                        name={"password"}
                                        placeholder={"Ustwa hasło"}
                                        value={password}
                                        onChange={this.onChange}
                                        required={"required"}
                                    />
                                </div>
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor={"role"}> Rola</label>
                                <select
                                    value = {role}
                                    className={"form-control"}
                                    onChange = {this.handelRoleChange} >
                                    <option>Wybierz role </option>
                                    <option value={"admin"}>admin</option>
                                    <option value={"client"}>klient</option>
                                </select>
                            </div>
                            {this.state.role == 'client' ? <PassSelection onChange={this.handelPassTypeChange}  pass_type_id={pass_type_id} mapping={pass_types.map(optionItems)}/> :''}
                            {this.state.role == 'client' ? <ActivationDate start_date={start_date} onChange={this.onChange}/>:''}
                            <button
                                type={"submit"}
                                className={"btn btn-primary"}>
                                Dodaj użytkownika
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        )};
}