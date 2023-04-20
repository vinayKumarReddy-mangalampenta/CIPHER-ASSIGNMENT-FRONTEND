import React, { useEffect, useState } from 'react'
import { AiFillLinkedin } from 'react-icons/ai'
import { BsGlobe, BsInstagram, BsTwitter, BsFacebook, BsGithub } from "react-icons/bs"
import Navbar from '../Navbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import "./index.css"


import 'bootstrap/dist/css/bootstrap.min.css';
const API_STATUSES = {
    initial: "INITIAL",
    success: "SUCCESS",
    loading: "LOADING",
    failure: "FAILURE"
}


const Profile = () => {
    const [apiStatus, setApiStatus] = useState(API_STATUSES.initial)
    const [profile, setProfile] = useState({})
    const [followersCount, setFollowersCount] = useState(0)

    const fetchUserData = async () => {
        setApiStatus(API_STATUSES.loading)
        try {
            const accessToken = Cookies.get("access-token")
            const response = await axios.get("http://localhost:8080/profile", {
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
    }, [])


    const displayLoadingView = () => (
        <div >
            <h1 >Loading........!</h1>
        </div>
    )

    const displayFailureView = () => (
        <div >
            unable to display your profile please try again later
        </div>
    )

    const displayProfileView = () => {
        const { username, firstName, lastName, email, aboutMe, linkedIn, github, facebook, twitter, website, instagram, currentPosition, highestEducation } = profile
        return (
            <div className='profile-container' >
                <div className='intro-container d-flex  align-items-center justify-content-between px-3'>
                    <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" className='user-dp' alt={username} />
                    <div className='intro-details me-auto ms-2'>
                        <span style={{ fontSize: "23px" }} >Hello,</span>
                        <h2 className='mb-1' >{firstName + " " + lastName}</h2>
                        <span className='d-block' >{email}</span>
                    </div>
                    <span ><b >{followersCount} followers</b></span>
                </div>


                <div className='px-3 mt-3 d-flex flex-column gap-3' >
                    {/* About me */}
                    <div >
                        <h1 className='profile-headings' >ABOUT ME</h1>
                        <div className='about-me-container' >
                            <p >{aboutMe === "" ? "write about your self .....!" : aboutMe}</p>
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

                    <div  >
                        <h1 className='profile-headings'>Password & Security</h1>
                        <div className='container' >
                            <div className="row ">
                                <div className="col-12">
                                    <h5 className='social-media-name'>password</h5>
                                    <div className='social-media-links-container'>
                                        <span >
                                            ●●●●●●●●●●●
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className='hr' />

                    <div  >
                        <h1 className='profile-headings'>Interests</h1>
                        {/* // TODO: need to add interests */}
                    </div>

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

export default Profile