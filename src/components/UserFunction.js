import axios from 'axios'

export const register = newUser => {
    return axios
        .post('users/register', {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        password: newUser.password,
        email: newUser.email
    })
        .then(response => {
            console.log("Registered")
        })
}



export const getProfile = user => {
    return axios
        .get('users/profile'), {

    }
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}