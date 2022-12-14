import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Login.css'
import { auth } from './firebase';


function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();

        //firebase login
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/')
            })
            .catch(error =>
                alert(error.message))
    }

    const register = e => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                console.log(auth);
                if (auth) {
                    history.push('/')
                }

            })
            .catch(error => alert(error.message))
        // firebase register
    }
    return (
        <div className='login'>
            <Link to="/">
                <img className='login_logo'
                    src='https://thumbs.dreamstime.com/b/simple-vector-filled-flat-amazon-icon-logo-solid-black-pictogram-isolated-white-background-amazon-logo-159029074.jpg'
                    alt='' />
            </Link>
            <div className='login_container'>
                <h1>
                    Sign-In
                </h1>
                <form>
                    <h5>
                        E-mail
                    </h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
                    <h5>
                        Password
                    </h5>
                    <input type='password' value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <button type='submit' onClick={signIn}
                        className='login_signInButton'>
                        Sign In
                    </button>
                </form>
                <p>
                    By signing-in you agree to Amazon Clone's
                    Conditions of Use & Sale.
                    Please see our Privacy Notice, our Cookies Notice
                    and our Interest-based Ads Notice.
                </p>
                <button onClick={register}
                    className='login_registerButton'>
                    Create your Amazon account
                </button>
            </div>
        </div>
    )
}

export default Login