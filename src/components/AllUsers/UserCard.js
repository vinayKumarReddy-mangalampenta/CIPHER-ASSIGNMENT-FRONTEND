import axios from "axios"
import "./index.css"
import { toast } from "react-toastify"
import { AiFillLinkedin } from 'react-icons/ai'
import { BsGlobe, BsInstagram, BsTwitter, BsFacebook, BsGithub } from "react-icons/bs"
import Cookies from "js-cookie"


import 'react-toastify/dist/ReactToastify.css';
const UserCard = (props) => {
    const { user, fetchUsersList } = props
    const { username, email, firstName, lastName, id, isFollowing, instagram, website, twitter, linkedIn, github, facebook } = user
    const fullName = firstName + " " + lastName


    const onClickFollowUnfollowButton = async () => {
        const accessToken = Cookies.get("access-token")

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/profile/follow-unfollow-user`,
                {
                    followingId: id
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
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
            console.log(response)
            fetchUsersList()
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
    }

    const displayInstagram = () => {
        if (instagram) {
            return <a href={instagram}>
                <BsInstagram />
            </a>
        }

        return null
    }
    const displayWebsite = () => {
        if (website) {
            return <a href={website}>
                <BsGlobe />
            </a>
        }

        return null
    }
    const displayGithub = () => {
        if (github) {
            return <a href={github}>
                <BsGithub />
            </a>
        }

        return null
    }
    const displayLinkedIn = () => {
        if (linkedIn) {
            return <a href={linkedIn}>
                <AiFillLinkedin />
            </a>
        }

        return null
    }
    const displayFacebook = () => {
        if (facebook) {
            return <a href={facebook}>
                <BsFacebook />
            </a>
        }

        return null
    }
    const displayTwitter = () => {
        if (twitter) {
            return <a href={twitter}>
                <BsTwitter />
            </a>
        }

        return null
    }

    const buttonClassName = `user-follow-button ${isFollowing ? "unfollow-btn" : "follow-btn"}`
    return (
        <li className="user-card" >
            <a href={`/${username}`} className="d-flex align-items-center justify-content-center w-100 text-decoration-none" target="_self">
                <img src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" alt={username} className="user-profile-photo" />

            </a>
            <a href={`/${username}`} className="d-block w-100 text-decoration-none" target="_self">
                <h3 title={fullName} className="username"  >{fullName}</h3>
            </a>
            <span className="user-email" >{email}</span>
            <div className="user-contact" >
                {displayInstagram()}
                {displayWebsite()}
                {displayTwitter()}

                {displayGithub()}
                {displayLinkedIn()}
                {displayFacebook()}

            </div>


            <button type="button" onClick={onClickFollowUnfollowButton} className={buttonClassName} >
                {isFollowing ? "unfollow" : "follow"}
            </button>
        </li>
    )
}

export default UserCard