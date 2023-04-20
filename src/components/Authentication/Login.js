import React, { useState } from 'react'
import { AiOutlineEye } from "react-icons/ai"
import axios from 'axios'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar';

import { toast } from 'react-toastify'
import Cookies from "js-cookie"
import { Navigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const [submitting, setSubmitting] = useState(false)

    const onFormSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const response = await axios.post("http://localhost:8080/Auth/login",
                {
                    password,
                    email,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            // const data = await response.json()

            Cookies.set('access-token', response.data.jwtToken, { expires: 7 })
            Cookies.set('username', response.data.username, { expires: 7 })

            toast.success('Login success', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        } catch (error) {
            toast.error(error.response.data, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            console.log(error.response.data)
        }
        setSubmitting(false)

    }

    const isTokenAvailable = Cookies.get("access-token")
    const username = Cookies.get("username")

    if (isTokenAvailable !== undefined && username !== undefined) {
        return <Navigate to="/" replace />
    }

    return (
        <div className="login-container">
            <Navbar />
            <div className='auth-container d-flex flex-column'>
                <h1 >Sign In</h1>
                <form className='d-flex flex-column align-items-center auth-form' onSubmit={onFormSubmit}>
                    <div className='d-flex'>
                        <img src='https://www.cipherschools.com/static/media/Cipherschools_icon@2x.3b571d743ffedc84d039.png' alt='cipher schools' className='auth-logo' />
                        <h2 className='ms-2'>CipherSchools</h2>
                    </div>
                    <h5 className='mt-2 auth-welcome' >Hey, Welcome!</h5>
                    <span className='auth-hint mb-3'>Please provide your email and password to signin</span>

                    <div className='auth-input-container'>
                        <input type='text' className='auth-input-field' placeholder='Email Id' required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>

                    <div className='auth-input-container d-flex align-items-center'>
                        <input type={showPassword ? "text" : "password"} required className='auth-input-field' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        <button className='bg-transparent outline-none border-0 text-white fs-3 my-auto ' type='button' onClick={() => { setShowPassword(!showPassword) }} >
                            <AiOutlineEye />
                        </button>
                    </div>



                    <p className='ms-auto auth-forgot-password' >forgot password ?</p>

                    <button className='auth-submit-button align-self-stretch rounded' disabled={submitting} type='submit'>SignIn</button>

                    <div className='mt-4' >
                        <span >Don't have an account ? </span>
                        <a href='/register' target='_self' className='get-started' >Get Started</a>
                    </div>


                    {/* google login separator */}

                    <div className='auth-separator'>
                        <span >OR</span>
                    </div>

                    <button className='google-login-button' type='button' onClick={(e) => alert("Google Auth need to be added")}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png" className='google-logo' alt='google' />
                        <span >Sign in with Google</span>
                    </button>
                </form>

            </div>
        </div>
    )
}

export default Login