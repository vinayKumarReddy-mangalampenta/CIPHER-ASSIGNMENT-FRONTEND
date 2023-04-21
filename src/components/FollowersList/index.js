import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import Navbar from '../Navbar'
import UserCard from '../AllUsers/UserCard'

import MoonLoader from 'react-spinners/MoonLoader'
import '../AllUsers/index.css'
import "./index.css"
import { useParams } from 'react-router-dom'

const API_STATUSES = {
    initial: "INITIAL",
    success: "SUCCESS",
    loading: "LOADING",
    failure: "FAILURE"
}

const MyFollowers = () => {
    const [apiStatus, setApiStatus] = useState(API_STATUSES.initial)
    const [users, setUsers] = useState([])
    const accessToken = Cookies.get("access-token")
    const params = useParams()
    const fetchUsersList = async () => {

        setApiStatus(API_STATUSES.loading)
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile/followers/${params.username}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            setApiStatus(API_STATUSES.success)
            setUsers(response.data.users)
            console.log(response)

        }
        catch (error) {
            setApiStatus(API_STATUSES.failure)

            console.log(error)
        }
    }

    useEffect(() => {

        fetchUsersList()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const displayLoadingView = () => (
        <div className='h-100 w-100 d-flex justify-content-center align-items-center mt-5' >
            <MoonLoader color="#36d7b7" />
        </div>
    )

    const displayFailureView = () => (
        <div >
            unable to display your followers please try again later
        </div>
    )

    const displayProfilesView = () => {
        return (
            <ul className='users-container' >
                {
                    users.map((each) => (
                        <UserCard key={each.id} fetchUsersList={fetchUsersList} user={each} />
                    ))
                }
            </ul>
        )
    }


    const renderProfiles = () => {
        switch (apiStatus) {
            case API_STATUSES.initial:
            case API_STATUSES.loading:
                return displayLoadingView();
            case API_STATUSES.success:
                return displayProfilesView()
            case API_STATUSES.failure:
                return displayFailureView()
            default:
                return displayLoadingView()
        }
    }

    return (
        <div>
            <Navbar />
            <div className='my-followers-heading' >
                <h4 >{params.username} Followers</h4>
                <div className='followers-underline'></div>
            </div>
            {
                renderProfiles()
            }
        </div>
    )
}

export default MyFollowers