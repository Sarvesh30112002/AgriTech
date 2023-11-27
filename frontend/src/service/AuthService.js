import axios from 'axios';

export class AuthService {

    signIn(signInData) {
        return axios.post('http://localhost:3001/api/auth/login', signInData).then(res => {
            return res.data;
        });
    }

    signUp(signUpData) {
        return axios.post('http://localhost:3001/api/auth/signup', signUpData).then(res => {
            return res.data;
        });
    }

}