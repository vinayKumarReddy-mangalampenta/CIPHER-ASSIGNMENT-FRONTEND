import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import Navbar from '../Navbar'
import UserCard from './UserCard'


import './index.css'

const API_STATUSES = {
    initial: "INITIAL",
    success: "SUCCESS",
    loading: "LOADING",
    failure: "FAILURE"
}

const AllUsers = () => {
    const [apiStatus, setApiStatus] = useState(API_STATUSES.initial)
    const [users, setUsers] = useState([])
    const accessToken = Cookies.get("access-token")
    const fetchUsersList = async () => {
        setApiStatus(API_STATUSES.loading)
        try {
            const response = await axios.get(`${process.env.API_URL}/profile/users/all`, {
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
        <div >
            <h1 >Loading........!</h1>
        </div>
    )

    const displayFailureView = () => (
        <div >
            unable to display your profiles please try again later
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
            {
                renderProfiles()
            }
        </div>
    )
}

export default AllUsers