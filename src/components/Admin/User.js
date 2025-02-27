import React, {Component} from "react";
import Link from "react-router-dom/Link";

class User extends Component{
    constructor(props){
        super(props);
        this.state = {
            item:props.item
        }
    }

    render(){
        return (
            <li className="collection-item">
                <Link to={`/admin/user/edit/${this.state.item.id}`}>{this.state.item.first_name} {this.state.item.last_name}</Link>
            </li>
        )
    }
}

export default User;