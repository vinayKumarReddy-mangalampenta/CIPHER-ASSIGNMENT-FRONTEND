import React, { useState } from 'react'
import { AiOutlineEye } from "react-icons/ai"
import { toast } from 'react-toastify'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Navbar';


const Register = () => {
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()
    const onFormSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/Auth/register`,
                {
                    password,
                    email,
                    lastName,
                    firstName,
                    username
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );


            toast.success('Registration success', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            navigate("/login")
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

    if (isTokenAvailable !== undefined) {
        return <Navigate to="/" replace />
    }

    return (
        <div className="login-container">
            <Navbar />
            <div className='auth-container mt-4 d-flex flex-column'>
                <h1 >Sign up</h1>
                <form className='d-flex flex-column align-items-center auth-form' onSubmit={onFormSubmit}>
                    <div className='d-flex'>
                        <img src='https://www.cipherschools.com/static/media/Cipherschools_icon@2x.3b571d743ffedc84d039.png' alt='cipher schools' className='auth-logo' />
                        <h2 className='ms-2'>CipherSchools</h2>
                    </div>
                    <h5 className='mt-2 auth-welcome' >Create New Account</h5>
                    <span className='auth-hint mb-3'>Please provide your valid information to signup</span>

                    <div className='auth-input-container'>
                        <input type='text' minLength={4} className='auth-input-field' placeholder='Username ' value={username} onChange={(e) => { setUsername(e.target.value) }} required />
                    </div>

                    <div className='auth-input-container'>
                        <input type='text' minLength={4} className='auth-input-field' placeholder='First Name' value={firstName} onChange={(e) => { setFirstName(e.target.value) }} required />
                    </div>

                    <div className='auth-input-container'>
                        <input type='text' minLength={4} className='auth-input-field' placeholder='Last Name' value={lastName} onChange={(e) => { setLastName(e.target.value) }} required />
                    </div>

                    <div className='auth-input-container'>
                        <input type='email' className='auth-input-field' placeholder='Email Id' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>


                    <div className='auth-input-container d-flex align-items-center'>
                        <input minLength={6} type={showPassword ? "text" : "password"} className='auth-input-field' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        <button className='bg-transparent outline-none border-0 text-white fs-3 my-auto ' type='button' onClick={() => { setShowPassword(!showPassword) }} >
                            <AiOutlineEye />
                        </button>
                    </div>


                    <button disabled={submitting} className='auth-submit-button align-self-stretch rounded mt-4' type='submit'>Sign up</button>

                    <div className='mt-4' >
                        <span >Already have an account ? </span>
                        <a href='/login' target='_self' className='get-started' >Login</a>
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

export default Register