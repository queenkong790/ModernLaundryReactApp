import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import SearchLogo from "./search-logo.svg";
// import LoginLogo from "./login-logo.svg";
// import SignupLogo from "./signup-logo.svg";
import BrandImage from '../assets/ModernLaundryLogo.png';
import classes from './Secheader.module.css'
import Profile from "../pages/Profile/Profile";
import MyOrders from "../pages/Profile/MyOrders";
import 'bootstrap/dist/css/bootstrap.css';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BookNow from "../pages/BookNow";

function SecHeader() {
    const [tab, setTab] = useState(true)
    const [isActive, SetisActive] = useState(true)
    const loggedIn=useSelector(state=>state.auth.loggedIn)
    const navigate=useNavigate()
    const tabProfile = () => {
        setTab(true)
        SetisActive(true)
    }
    const tabOrders = () => {
        setTab(false)
        SetisActive(false)
    }

    return (
        <>
        {!loggedIn ?(<><BookNow/></>): (<div className={classes.siteWrapper}>
            <div  className={`container bg bg-white ${classes.view}`}>
                <h1 className={classes.myacc}>My Account</h1>
                <nav className={classes.navbar} style={{ textAlign: 'center' }}>
                    <a

                        onClick={tabProfile}
                        className={isActive ? `${classes.activeNavLink}` : `${classes.navLink}`}>
                        Profile
                    </a>
                    <a

                        onClick={tabOrders}
                        className={!isActive ? `${classes.activeNavLink}` : `${classes.navLink}`}>
                        MyOrders
                    </a>

                </nav>
                {tab ? <Profile /> : <MyOrders />}
            </div>
        </div>)
         
         }
        </>
    )
}
export default SecHeader