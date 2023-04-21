import React, { useEffect, useState } from 'react'
import { AiFillEye, AiFillLinkedin } from 'react-icons/ai'
import { BsGlobe, BsInstagram, BsTwitter, BsFacebook, BsGithub } from "react-icons/bs"
import { toast } from "react-toastify"
import Navbar from '../Navbar'
import axios from 'axios'
import Spinner from 'react-bootstrap/spinner'
import Cookies from 'js-cookie'
import "./index.css"


import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom'
const API_STATUSES = {
    initial: "INITIAL",
    success: "SUCCESS",
    loading: "LOADING",
    failure: "FAILURE"
}


const Profile = (props) => {
    const [apiStatus, setApiStatus] = useState(API_STATUSES.initial)
    const [profile, setProfile] = useState({})
    const [followersCount, setFollowersCount] = useState(0)
    const [changePassword, setChangePassword] = useState(false)
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [changingPassword, setChangingPassword] = useState(false)

    const params = useParams()
    const fetchUserData = async () => {
        setApiStatus(API_STATUSES.loading)
        try {
            const accessToken = Cookies.get("access-token")
            const username = Cookies.get("username")

            let user = params.user || username
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile/${user}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            setApiStatus(API_STATUSES.success)
            setProfile(response.data.userProfile)
            setFollowersCount(response.data.followersCount)
            console.log(response)
        }
        catch (error) {
            setApiStatus(API_STATUSES.failure)

            console.log(error)
        }
    }

    useEffect(() => {
        fetchUserData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onChangePassword = async (e) => {
        e.preventDefault()
        const accessToken = Cookies.get("access-token")
        setChangingPassword(true)
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/auth/change-password`,
                {
                    currentPassword,
                    newPassword,
                    confirmPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })

            toast.success("password changed successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            setChangePassword(false)
        } catch (error) {
            console.log(error)
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
        }
        setChangingPassword(false)

    }

    const displayLoadingView = () => (
        <div className='h-100 w-100 d-flex justify-content-center align-items-center mt-5' >
            <Spinner animation="border" />
        </div>
    )

    const displayFailureView = () => (
        <div >
            <h1 >unable to display profile please try again later</h1>
        </div>
    )

    const displayPasswordField = () => {
        return (
            <div  >
                <div className='d-flex flex-row justify-content-between'>
                    <h1 className='profile-headings'>Password & Security</h1>
                    <button className='btn btn-outline btn-danger' onClick={() => { setChangePassword(!changePassword) }}>{changePassword ? "cancel" : "change"}</button>
                </div>
                <div className='container' >
                    <div className="row ">
                        {changePassword ?
                            <form onSubmit={onChangePassword}>
                                <h5 className='social-media-name'>current password</h5>
                                <div className='social-media-links-container'>
                                    <input required type={showCurrentPassword ? "text" : 'password'} placeholder='current password' value={currentPassword} onChange={(e) => { setCurrentPassword(e.target.value) }} />
                                    <button type='button' onClick={() => { setShowCurrentPassword(!showCurrentPassword) }} className='eye-button'>
                                        <AiFillEye />
                                    </button>
                                </div>
                                <h5 className='social-media-name'>new password</h5>
                                <div className='social-media-links-container'>
                                    <input required type={showNewPassword ? "text" : 'password'} placeholder='new password' value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} />
                                    <button type='button' onClick={() => { setShowNewPassword(!showNewPassword) }} className='eye-button'>
                                        <AiFillEye />
                                    </button>
                                </div>
                                <h5 className='social-media-name'>confirm password</h5>
                                <div className='social-media-links-container'>
                                    <input required type={showConfirmPassword ? "text" : 'password'} placeholder='confirm password' value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                                    <button type='button' onClick={() => { setShowConfirmPassword(!showConfirmPassword) }} className='eye-button'>
                                        <AiFillEye />
                                    </button>
                                </div>

                                <button type='submit' disabled={changingPassword} className='btn btn-success' >save</button>
                            </form>

                            :
                            <div className="col-12">
                                <h5 className='social-media-name'>password</h5>
                                <div className='social-media-links-container'>
                                    <span >
                                        ●●●●●●●●●●●
                                    </span>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        )
    }

    const displayProfileView = () => {
        const currUsername = Cookies.get("username")
        const { username, firstName, lastName, email, aboutMe, linkedIn, github, facebook, twitter, website, instagram, currentPosition, highestEducation } = profile
        return (
            <div className='profile-container' >
                <div className='intro-container d-flex  align-items-center justify-content-between px-3'>
                    <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" className='user-dp' alt={username} />
                    <div className='intro-details me-auto ms-2'>
                        {currUsername === username && <span style={{ fontSize: "23px" }} >Hello,</span>}
                        <h2 className='mb-1' >{firstName + " " + lastName}</h2>
                        <span className='d-block' >{email}</span>
                    </div>
                    <span ><b >{followersCount} followers</b></span>
                </div>


                <div className='px-3 mt-3 d-flex flex-column gap-3' >
                    {/* About me */}
                    <div >
                        <div className='d-flex justify-between'>
                            <h1 className='profile-headings' >ABOUT ME</h1>

                            {currUsername === username && <a className='ms-auto' style={{ textDecoration: "none", color: "orange" }} href='/update-profile' >
                                <h5  >
                                    Edit
                                </h5>
                            </a>}
                        </div>
                        <div className='about-me-container' >
                            <p >{
                                aboutMe === "" ?
                                    currUsername === username ? "write about your self .....!" : `I am ${firstName}`
                                    :
                                    aboutMe}</p>
                        </div>
                    </div>

                    <hr className='hr' />

                    <div  >
                        <h1 className='profile-headings'>ON THE WEB</h1>
                        <div className='container' >
                            <div className="row ">
                                <div className="col-12 col-md-6">
                                    <h5 className='social-media-name'>Linkedin</h5>
                                    <div className='social-media-links-container'>
                                        <AiFillLinkedin />
                                        <span >
                                            {linkedIn === "" ? "Linked in" : linkedIn}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <h5 className='social-media-name'>Github</h5>
                                    <div className='social-media-links-container'>
                                        <BsGithub />
                                        <span >
                                            {github === "" ? "Github" : github}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <h5 className='social-media-name'>Facebook</h5>
                                    <div className='social-media-links-container'>
                                        <BsFacebook />
                                        <span >
                                            {facebook === "" ? "facebook" : facebook}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <h5 className='social-media-name'>twitter</h5>
                                    <div className='social-media-links-container'>
                                        <BsTwitter />
                                        <span >
                                            {twitter === "" ? "twitter" : twitter}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6">
                                    <h5 className='social-media-name'>instagram</h5>
                                    <div className='social-media-links-container'>
                                        <BsInstagram />
                                        <span >
                                            {instagram === "" ? "instagram" : instagram}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <h5 className='social-media-name'>website</h5>
                                    <div className='social-media-links-container'>
                                        <BsGlobe />
                                        <span >
                                            {website === "" ? "website" : website}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                    <hr className='hr' />

                    <div  >
                        <h1 className='profile-headings'>PROFESSIONAL INFORMATION</h1>
                        <div className='container' >
                            <div className="row ">
                                <div className="col-12 col-md-6">
                                    <h5 className='social-media-name'>Highest Graduation</h5>
                                    <div className='social-media-links-container'>
                                        <span >
                                            {highestEducation}
                                        </span>
                                    </div>
                                </div>



                                <div className="col-12 col-md-6">
                                    <h5 className='social-media-name'>What do you do currently?</h5>
                                    <div className='social-media-links-container'>

                                        <span >
                                            {currentPosition}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                    <hr className='hr' />

                    {currUsername === username && displayPasswordField()}



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
        <div style={{ minHeight: "100vh" }}>
            <Navbar />
            {
                renderProfile()
            }
        </div>
    )
}

export default Profile