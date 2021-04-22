import React, { useState } from 'react'
import { toast } from 'react-toastify'
import LoginForm from '../components/LoginForm'
import { login } from '../actions/auth'
import { useDispatch } from 'react-redux'

const Login = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await login({
                email,
                password
            });
            
            if (res.data) {
                localStorage.setItem('auth', JSON.stringify(res.data));
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: res.data
                });
                history.push("/dashboard");
            }

        } catch (error) {
            console.log(error);
            if (error.response.status === 400) toast.error(error.response.data);
        }
    }

    return (
        <>
            <div className="container-fluid bg-secondary p-4 text-center">
                <h1>Iniciar Sesion</h1>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <LoginForm
                             handleSubmit={handleSubmit}
                             email={email}
                             setEmail={setEmail}
                             password={password}
                             setPassword={setPassword} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
