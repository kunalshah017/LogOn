import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineLoading } from "react-icons/ai";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import NavBar from './NavBar';
import axios from 'axios';


const SignIn = (props) => {

    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        email: '',
        password: '',
    });

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [signinSuccess, setSigninSuccess] = useState(false);

    const ToggleShowPassword = () => {
        if (showPassword) {
            return (
                <FaRegEyeSlash className="text-xl text-gray-900 cursor-pointer" onClick={() => {
                    setShowPassword(false);
                    document.getElementById('Password').type = 'password';
                }} />
            );
        } else {
            return (
                <FaRegEye className="text-xl text-gray-900 cursor-pointer" onClick={() => {
                    setShowPassword(true);
                    document.getElementById('Password').type = 'text';
                }} />
            );
        }
    }

    const handleSubmission = (e) => {
        console.log(userDetails);
        e.preventDefault();

        if (!emailRegex.test(userDetails.email)) {
            setError('Invalid email');
            return;
        }

        if (!userDetails.password) {
            setError('Password is required');
            return;
        }

        setLoading(true);
        axios.post('http://localhost:3000/api/auth/login', userDetails)
            .then(response => {
                console.log(response);
                if (response.data.status !== 'success') {
                    setError('Invalid credentials');
                    setLoading(false);
                    return;
                }
                setLoading(false);
                setSigninSuccess(true);
                if (!localStorage.getItem('token')) {
                    localStorage.setItem('token', response.data.token);
                }
                setTimeout(() => {
                    navigate('/main', { replace: true });
                }, 1000);
            })
            .catch(error => {
                console.log(error);
                setError('Invalid credentials');
                setLoading(false);
            });
    }

    return (
        <>
            <NavBar />
            <div className="flex justify-center items-center min-h-screen bg-cover bg-center lg:justify-end md:pr-[10%]" style={{ backgroundImage: "url('https://walker-web.imgix.net/cms/Gradient_builder_2.jpg?auto=format,compress&w=1920&h=1200&fit=crop&dpr=1.5')" }}>
                <div className="bg-white bg-opacity-20 backdrop-blur-md p-4 sm:p-6 md:p-8 lg:p-16 rounded shadow-2xl w-[85%] sm:w-[70%] md:w-[50%] lg:w-1/3">
                    <h2 className="text-3xl font-bold mb-10 text-gray-900">Sign In</h2>
                    <form action="post" className="space-y-5">
                        <div>
                            <label htmlFor="Email" className="text-sm font-bold text-gray-900 block">Email</label>
                            <input type="email" placeholder="Email" className="w-full p-2 border-2 bg-white bg-opacity-30 text-black border-gray-400 rounded mt-1 outline-none ring-0" onChange={(e) => { const email = e.target.value.toLowerCase(); setUserDetails({ ...userDetails, email: email }) }} />
                        </div>
                        <div className='flex items-center justify-between gap-5'>
                            <div className='w-full'>
                                <label htmlFor="Password" className="text-sm font-bold text-gray-900 block">Password</label>
                                <input type="password"
                                    id="Password"
                                    className="w-full p-2 border-2 bg-white bg-opacity-30 text-black border-gray-400 rounded mt-1 outline-none ring-0"
                                    placeholder="Password"
                                    onChange={(e) => {
                                        setUserDetails({ ...userDetails, password: e.target.value });
                                    }}
                                />
                            </div>
                            <div className='pt-5 pr-5'>
                                {
                                    ToggleShowPassword()
                                }
                            </div>
                        </div>
                        <div>
                            {
                                error ? <p className="text-red-500 text-sm">{error}</p> : ''
                            }
                            {
                                userDetails.client_password_confirmation === false ? <p className="text-red-500 text-sm">Passwords do not match</p> : ''
                            }
                        </div>
                        <div>
                            <button type='submit' className="w-full py-2 px-4 text-lg bg-blue-600 hover:bg-blue-700 rounded text-white" onClick={(e) => {
                                handleSubmission(e);
                            }}>
                                {
                                    loading ? <AiOutlineLoading className="animate-spin inline-block text-2xl" /> : (signinSuccess ? 'Signed In Successfully' : 'Sign In')
                                }
                            </button>
                        </div>
                    </form>
                    <div className="mt-5 text-center text-gray-900">
                        <p>Don't have an account? <Link to="/sign-up" className="text-blue-500">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn