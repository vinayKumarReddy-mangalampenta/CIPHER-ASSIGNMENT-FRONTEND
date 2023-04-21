import React from 'react'
import Cookies from 'js-cookie'
import './index.css'
import { NavLink, useNavigate } from 'react-router-dom'


const Navbar = () => {
    const isCookieAvailable = Cookies.get("access-token")
    const username = Cookies.get("username")
    const navigate = useNavigate()

    const logoutUser = () => {
        Cookies.remove("username")
        Cookies.remove("access-token")
        navigate("/login")
    }

    return (
        <div className='navbar-container d-flex align-items-center justify-content-between'>
            <a href='/' className='me-2 text-decoration-none'>
                <div className='d-flex'>

                    <img src='https://www.cipherschools.com/static/media/Cipherschools_icon@2x.3b571d743ffedc84d039.png' alt='cipher schools' className='nav-logo' />
                    <h2 className='ms-2'>CipherSchools</h2>
                </div>
            </a>



            {
                isCookieAvailable ?
                    <div >

                        <a href="/users/all" className='' >All Users</a>

                        <button onClick={logoutUser} className='logout-button'> logout</button>
                    </div> :

                    <NavLink
                        to="/login"
                        className='logout-button'
                    >
                        Login
                    </NavLink>
            }

        </div>
    )
}



export default Navbar