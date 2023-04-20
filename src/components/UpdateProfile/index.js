import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Navbar from '../Navbar'
import { toast } from "react-toastify"
import './index.css'
const API_STATUSES = {
    initial: "INITIAL",
    success: "SUCCESS",
    loading: "LOADING",
    failure: "FAILURE"
}

const UpdateProfile = () => {
    const [apiStatus, setApiStatus] = useState(API_STATUSES.initial)
    const [profile, setProfile] = useState({})
    const navigate = useNavigate()
    const fetchUserData = async () => {
        setApiStatus(API_STATUSES.loading)
        try {
            const accessToken = Cookies.get("access-token")
            const user = Cookies.get("username")
            const response = await axios.get(`${process.env.API_URL}/profile/${user}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            setApiStatus(API_STATUSES.success)
            setProfile(response.data.userProfile)


        }
        catch (error) {
            setApiStatus(API_STATUSES.failure)

            console.log(error)
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    const onSubmitForm = async (e) => {
        e.preventDefault()
        const accessToken = Cookies.get("access-token")

        try {
            const response = await axios.put(`${process.env.API_URL}/profile/update`, {
                profileFields: profile
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            toast.success(response.data, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    const onChangeInput = (e) => {
        setProfile((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const displayLoadingView = () => (
        <div >
            <h1 >Loading........!</h1>
        </div>
    )

    const displayFailureView = () => (
        <div >
            unable to display profile please try again later
        </div>
    )

    const displayProfileView = () => {
        const { firstName, lastName, email, aboutMe, linkedIn, github, facebook, twitter, website, instagram, currentPosition, highestEducation } = profile
        return (
            <div className='update-main-container' >
                <div className='update-form-container' >
                    <div className='update-heading-container' >
                        <h4 className='update-heading'>Profile Updating</h4>
                        <div className='underline'></div>
                    </div>
                    <form className='update-form' onSubmit={onSubmitForm}>
                        <div className='update-field-container'>
                            <label >First name:</label>
                            <input type='text' required name='firstName' onChange={onChangeInput} value={firstName} />
                        </div>

                        <div className='update-field-container'>
                            <label >Last name:</label>
                            <input type='text' required name='lastName' onChange={onChangeInput} value={lastName} />
                        </div>

                        <div className='update-field-container'>
                            <label >Email:</label>
                            <input type='email' required name='email' onChange={onChangeInput} value={email} />
                        </div>

                        <div className='update-field-container'>
                            <label >AboutMe:</label>
                            <textarea type='text' name='aboutMe' onChange={onChangeInput} value={aboutMe}></textarea>
                        </div>

                        <div className='update-field-container'>
                            <label >Linked In:</label>
                            <input type='text' name='linkedIn' onChange={onChangeInput} value={linkedIn} />
                        </div>

                        <div className='update-field-container'>
                            <label >facebook:</label>
                            <input type='text' name='facebook' onChange={onChangeInput} value={facebook} />
                        </div>

                        <div className='update-field-container'>
                            <label >Instagram:</label>
                            <input type='text' name='instagram' onChange={onChangeInput} value={instagram} />
                        </div>

                        <div className='update-field-container'>
                            <label >Github:</label>
                            <input type='text' name='github' onChange={onChangeInput} value={github} />
                        </div>

                        <div className='update-field-container'>
                            <label >Twitter:</label>
                            <input type='text' name='twitter' onChange={onChangeInput} value={twitter} />
                        </div>
                        <div className='update-field-container'>
                            <label >Website:</label>
                            <input type='text' name='website' onChange={onChangeInput} value={website} />
                        </div>

                        <div className='update-field-container'>
                            <label >Highest Education:</label>
                            <select value={highestEducation} onChange={onChangeInput} name='highestEducation' >
                                <option value="Primary" >Primary</option>
                                <option value="Secondary" >Secondary</option>
                                <option value="Higher Secondary" >Higher Secondary</option>
                                <option value="Graduation" >Graduation</option>
                                <option value="Post Graduation" >Post Graduation</option>
                            </select>
                        </div>

                        <div className='update-field-container'>
                            <label >What do you do currently?:</label>
                            <select value={currentPosition} onChange={onChangeInput} name='currentPosition' >
                                <option value="Schooling" >Schooling</option>
                                <option value="College Student" >College Student</option>
                                <option value="Teaching" >Teaching</option>
                                <option value="Freelancer" >Freelancer</option>
                                <option value="Job" >Job</option>
                            </select>
                        </div>


                        <button className='update-submit-button' type='submit'>Submit</button>
                    </form>

                </div>


            </div>
        )
    }


    const renderProfile = () => {
        switch (apiStatus) {
            case API_STATUSES.initial:
            case API_STATUSES.loading:
                return displayLoadingView();
            case API_STATUSES.success:
                return displayProfileView()
            case API_STATUSES.failure:
                return displayFailureView()
            default:
                return displayLoadingView()
        }
    }

    return (
        <div>
            <Navbar />
            {
                renderProfile()
            }
        </div>
    )
}

export default UpdateProfile