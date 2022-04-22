import React from "react";
import { useEffect } from "react";
import {useNavigate, Navigate } from 'react-router';

const  Header = ({setUser, user}) => {
    const [session, setSession] = React.useState(null);
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    }; 

    return (
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/home">Repost Buster</a>
                </div>
                <div class="collapse navbar-collapse" id="myNavbar">
                    {user ? (
                        <ul class="nav navbar-nav">
                            <li class="active"><a href="/home">Home</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li class="dropdown">
                                <a class="dropdown-toggle" data-toggle="dropdown" href="#">Help Center<span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                    <li><a href="/faq">FAQs</a></li>
                                    <li><a href="/contact">Contact</a></li>
                                    <li><a href="/howItWorks">How it Works</a></li>
                                </ul>
                                </li>
                            <li><a href="/our-tech">Our Technology</a></li>
                            <li><button className="btn btn-danger" onClick={handleLogout}>Logout</button></li>
                            
                        </ul>
                            ):(
                                <ul class="nav navbar-nav">
                                    <li class="active"><a href="/home">Home</a></li>
                                    <li><a href="/about">About Us</a></li>
                                    <li class="dropdown">
                                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">Help Center<span class="caret"></span></a>
                                        <ul class="dropdown-menu">
                                            <li><a href="/faq">FAQs</a></li>
                                            <li><a href="/contact">Contact</a></li>
                                            <li><a href="/howItWorks">How it Works</a></li>
                                        </ul>
                                        </li>
                                    <li><a href="/our-tech">Our Technology</a></li>  
                                    <li><a href="/login">Login</a></li>
                                    <li><a href="/register">Register</a></li>                    
                                </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Header;