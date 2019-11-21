import React  from "react";
import MaterialTable from 'material-table'
import axios from 'axios';

export default function WorkoutsTable() {
    const [state, setState] = React.useState({
        columns: [
            {title: 'Name', field: 'name'},
            {title: 'Duration', field: 'duration'},
            {title: 'Limits', field: 'limits'},
            {title: 'Date', field: 'date'},
            {title: 'Time', field: 'time'},
            {title: 'Trainer', field: 'trainer_last_name'}
            ],
        workouts: [],
    });

    componentDidMount()
    {
        axios
            .get('/admin/workouts')
            .then((response) => {
                console.log("response", response);
                const workouts = response.data;
                console.log("response", response)
                console.log("workouts",workouts);
                this.setState({workouts});

            })
            .catch (error => {
                console.log(error)
            });
    }

    return (
        <MaterialTable
            title={"MyGym Workouts"}
            columns={state.columns}
            data={state.workouts}
            editable={{
                onRowAdd : newData =>
                    new Promise(resolve => {
                        setTimeout(()=>{
                            resolve();
                         setState(prevState => {
                         const workouts = [prevState.date];
                         workouts.push(newData)
                         return {...prevState, workouts};
                         });
                        },600);
                    }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(()=>{
                                resolve();
                                if(oldData){
                                    setState(prevState => {
                                    const workouts = [...prevState.workouts];
                                    workouts[workouts.indexOf(oldData)] = newData;
                                    return {...prevState, workouts};

                                });
                                }
                            }, 600);
                        }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(()=>{
                            resolve();
                            setState(prevState => {
                                const workouts = [...prevState.workouts];
                                workouts.splice(workouts.indexOf(oldData), 1);
                                return {...prevState, workouts};
                            });
                        },600);
                    }),
                    }}
            />
    );
}