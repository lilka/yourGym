import axios from 'axios'

export const addWorkout = workout => {
    return axios
        .post('/admin/add/workout', {
            name: workout.name,
            duration: workout.duration,
            limits: workout.limits,
            date: workout.date,
            trainer_id: workout.trainer,
            time: workout.time
        })
        .then(response => {
            console.log("Workout added")
        })
}

