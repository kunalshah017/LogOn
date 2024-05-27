import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineLoading } from "react-icons/ai";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import NavBar from './NavBar';

const SignUp = () => {

    const navigate = useNavigate();
    // state variables for form fields
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        userName: '',
        client_confirm_password: '',
        client_password_confirmation: true,
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    // check if the password and confirm password match
    useEffect(() => {
        if (userDetails.password !== userDetails.client_confirm_password) {
            setUserDetails({ ...userDetails, client_password_confirmation: false });
        } else {
            setUserDetails({ ...userDetails, client_password_confirmation: true });
        }
    }, [userDetails.password, userDetails.client_confirm_password]);

    const ToggleShowPassword = () => {
        if (showPassword) {
            return (
                <FaRegEyeSlash className="text-xl text-gray-900 cursor-pointer" onClick={() => {
                    setShowPassword(false);
                    document.getElementById('ConfirmPassword').type = 'password';
                }} />
            );
        } else {
            return (
                <FaRegEye className="text-xl text-gray-900 cursor-pointer" onClick={() => {
                    setShowPassword(true);
                    document.getElementById('ConfirmPassword').type = 'text';
                }} />
            );
        }
    }

    // handle form submission
    const handleSubmission = (e) => {

        e.preventDefault();

        setLoading(true);

        setError('');

        if (userDetails.name.length < 3) {
            setError('Name must be at least 3 characters long');
            setLoading(false);
            return;
        }

        if (userDetails.name === '' || userDetails.email === '' || userDetails.password === '' || userDetails.client_confirm_password === '') {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        if (!emailRegex.test(userDetails.email)) {
            setError('Invalid email address');
            setLoading(false);
            return;
        }

        if (!passwordRegex.test(userDetails.password)) {
            setError('Password must be at least 6 characters long and contain a number, a lowercase letter, and an uppercase letter');
            setLoading(false);
            return;
        }

        if (userDetails.client_password_confirmation === false) {
            setLoading(false);
            return;
        }
        register();
    }

    const register = () => {
        console.log(userDetails);
        axios.post('http://localhost:3000/api/auth/register', {
            name: userDetails.name,
            email: userDetails.email,
            password: userDetails.password,
            userName: userDetails.userName,
        }).then((response) => {
            console.log(response.data);
            if (response.data.status === "user added") {
                document.querySelector('form').reset();
                setError('');
                setLoading(false);
                setSignupSuccess(true);
                localStorage.setItem('token', response.data.token);
                setTimeout(() => {
                    navigate('/main'), { replace: true };
                }, 1000);
            }
        }).catch((error) => {
            // Handle the error here. For example, you can set the error message to state.
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred while registering.');
            }
            setLoading(false);
        });
    }

    return (
        <>
            <NavBar />
            <div className="flex justify-center items-center min-h-screen bg-cover bg-center lg:justify-end md:pr-[10%]" style={{ backgroundImage: "url('https://walker-web.imgix.net/cms/Gradient_builder_2.jpg?auto=format,compress&w=1920&h=1200&fit=crop&dpr=1.5')" }}>
                <div className="bg-white bg-opacity-20 backdrop-blur-md p-4 sm:p-6 md:p-8 lg:p-16 rounded shadow-2xl w-[85%] sm:w-[70%] md:w-[50%] lg:w-1/3 lg:mt-[5%]">
                    <h2 className="text-3xl font-bold mb-10 text-gray-900">Sign Up</h2>
                    <form action="" className="space-y-5">
                        <div>
                            <label htmlFor="Name" className="text-sm font-bold text-gray-900 block">Name</label>
                            <input type="text" placeholder="Name" className="w-full p-2 border-2 bg-white bg-opacity-30 text-black border-gray-400 rounded mt-1 outline-none ring-0" onChange={(e) => { setUserDetails({ ...userDetails, name: e.target.value }) }} />
                        </div>
                        <div>
                            <label htmlFor="Email" className="text-sm font-bold text-gray-900 block">Email</label>
                            {/* set lower case email id */}
                            <input type="email" placeholder="Email" className="w-full p-2 border-2 bg-white bg-opacity-30 text-black border-gray-400 rounded mt-1 outline-none ring-0" onChange={(e) => { const email = e.target.value.toLowerCase(); setUserDetails({ ...userDetails, email: email, userName: email.split('@')[0] }); }} />
                        </div>
                        <div>
                            <label htmlFor="Password" className="text-sm font-bold text-gray-900 block">Password</label>
                            <input type="password" placeholder="Password" className="w-full p-2 border-2 bg-white bg-opacity-30 text-black border-gray-400 rounded mt-1 outline-none ring-0" onChange={(e) => { setUserDetails({ ...userDetails, password: e.target.value }) }} />
                        </div>
                        <div className='flex items-center justify-between gap-5'>
                            <div className='w-full'>
                                <label htmlFor="ConfirmPassword" className="text-sm font-bold text-gray-900 block">Confirm Password</label>
                                <input type="password"
                                    id="ConfirmPassword"
                                    className="w-full p-2 border-2 bg-white bg-opacity-30 text-black border-gray-400 rounded mt-1 outline-none ring-0"
                                    placeholder="Confirm Password"
                                    onChange={(e) => {
                                        setUserDetails({ ...userDetails, client_confirm_password: e.target.value });
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
                                    loading ? <AiOutlineLoading className="animate-spin inline-block text-2xl" /> : (signupSuccess ? 'Signed Up Successfully' : 'Sign Up')
                                }
                            </button>
                        </div>
                    </form>
                    <div className="mt-5 text-center text-gray-900">
                        <p>Already have an account? <Link to="/sign-in" className="text-blue-500">Sign In</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;