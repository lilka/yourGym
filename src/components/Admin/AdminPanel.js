import React, {Component} from 'react'
import jwt_decode from 'jwt-decode'
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import axios from "axios";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import PieChart from "recharts/lib/chart/PieChart";
import Pie from "recharts/lib/polar/Pie";
import User from "./User";
import Button from "reactstrap/es/Button";

class AdminPanel extends Component {
    constructor() {
        super()
        this.state = {
            chartData:[],
            lastRegisterUsers:[],
            errors: {}
        }
    }

    componentDidMount() {
       this.getStatistic()
        this.getLastRegisterUsers()
    }
    getStatistic = () => {

        axios
            .get('/admin/staticstic')

            .then((response) => {
                console.log("response", response);
                const statistics = response.data;

                this.setState({chartData: statistics});

            })
            .catch (error => {
                console.log(error)
            });
    }
    generateColor () {
        return '#' +  Math.random().toString(16).substr(-6);
    }

    getLastRegisterUsers = () => {
        axios
            .get('/admin/last_users')

            .then((response) => {
                console.log("response", response);
                const users = response.data;

                this.setState({lastRegisterUsers: users});

            })
            .catch (error => {
                console.log(error)
            });
    }

    saveStatistic = () => {
        axios
            .get('/workout/getHistory')

            .then((response) => {
                console.log("response", response);


            })
            .catch (error => {
                console.log(error)
            });
    }



    render() {
        const lastUsers = this.state.lastRegisterUsers.map((user, i) => {
            return(
                <User key={user.id} item={user} />
            )
        })
    return (
        <div  className="container">
            <div className="row">
                <div className="col-sm-8">
            <h4 className="text-center" style={{color:'#3bb6e3'}} >Statystyki z zajęć z ostatniego miesiąca</h4>
            <ResponsiveContainer width="70%" height={250}>
                <PieChart height={250}>
                    <Pie
                        data={this.state.chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        fill="#2e5ba3"
                        dataKey="value"
                        label={({
                                    cx,
                                    cy,
                                    midAngle,
                                    innerRadius,
                                    outerRadius,
                                    value,
                                    index
                                }) => {
                            console.log("handling label?");
                            const RADIAN = Math.PI / 180;
                            // eslint-disable-next-line
                            const radius = 25 + innerRadius + (outerRadius - innerRadius);
                            // eslint-disable-next-line
                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                            // eslint-disable-next-line
                            const y = cy + radius * Math.sin(-midAngle * RADIAN);

                            return (
                                <text
                                    x={x}
                                    y={y}
                                    fill="#3bb6e3"
                                    textAnchor={x > cx ? "start" : "end"}
                                    dominantBaseline="central"
                                >
                                    {this.state.chartData[index].name} ({value})
                                </text>
                            );
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>

            </div>
                <div className="col-sm-4">
                <h4 className="text-left" style={{color:'#3bb6e3'}} >Ostatnio zarejestrowani użytkownicy</h4>
                <ul className="collection">
                    {lastUsers}
                </ul>
            </div>
            </div>
            <Button onClick={this.saveStatistic}>Pobierz statystyki</Button>
        </div>
    )
}

}export default AdminPanel;