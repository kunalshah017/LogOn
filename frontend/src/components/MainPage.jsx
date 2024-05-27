import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from './NavBar'
import SignIn from './SignIn'

const MainPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/sign-in'), { replace: true };
        }
        getUserDetails();
    }, []);

    const [userDetails, setUserDetails] = useState({
        name: '',
        userName: '',
        email: '',
        role: '',
        createdAt: '',
    });

    const getUserDetails = async () => {
        axios.get('http://localhost:3000/api/user/user-details', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            setUserDetails(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <>
            <NavBar />
            <div className="flex justify-center items-center h-screen flex-col">
                <h1 className="text-4xl font-bold">Welcome to the Main Page</h1>
                <div className="flex flex-col mt-5 gap-5 ">
                    <h2 className="text-2xl font-bold">User Details</h2>
                    <p className="text-xl">Name: {userDetails.name}</p>
                    <p className="text-xl">Username: {userDetails.userName}</p>
                    <p className="text-xl">Email: {userDetails.email}</p>
                    <p className="text-xl">Role: {userDetails.role}</p>
                    <p className="text-xl">Created At: {userDetails.createdAt}</p>
                </div>
            </div>
        </>
    )
}

export default MainPage