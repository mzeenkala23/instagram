import React, {useEffect, useState, useContext} from 'react'
import { Link, useHistory} from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import phone from '../assets/phone.png';
import logo from '../assets/logo.png';
import FirebaseContext from '../context/firebase';


const Login = () => {
    const history = useHistory();
    const {Firebase} = useContext(FirebaseContext);

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isValid = emailAddress === '' || password === '';

    const handleLogin = async( event) => {
        event.preventDefault();

        try {
            await Firebase.auth().signInWithEmailAndPassword(emailAddress,password);
            history.push(ROUTES.DASHBOARD);
        } catch (error) {
            setEmailAddress('');
            setPassword('');
            setError(error.message);
        }
    }

    useEffect(() => {
        document.title = 'Login - Instagram';
    }, []);

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img src={phone} alt="Iphone with instagram app"/>
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border mb-4">
                    <h1 className="flex justify-center w-full">
                        <img src={logo} alt="Instagram" className="mt-2 w-6/12 mb-4" />
                    </h1>
                    {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
                    <form method="POST" onSubmit={handleLogin}>
                        <input
                            aria-label="Enter your email address"
                            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
                            type="text"
                            placeholder="Email address"
                            onChange={(e) => setEmailAddress(e.target.value)}
                        />
                        <input
                            aria-label="Enter your password"
                            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={isValid}
                            className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${!isValid ? '' : 'opacity-50'}`}
                        >
                            Log In
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
                    <p className="text-sm">
                        Don't have an account?{' '}
                        <Link to={ROUTES.SIGN_UP} className="font-bold">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;
