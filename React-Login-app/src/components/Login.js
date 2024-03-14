import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import email from "./images/email.png";
import lock from "./images/lock.png";
import profile from "./images/icon.jpg";
import axios from 'axios';

const client = axios.create({
    baseURL: "http://localhost:8080/api"
});

function Login() {
    let navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await client.post('/users/login', {
                email: userData.email,
                password: userData.password,
            });
            console.log('Login response:', response.data);

            if (response.data.role === "Buyer") {
                navigate("/HomeA");
            } else {
                navigate("/HomeB");
            }
        } catch (error) {
            console.error('Error during login:', error);
            // Display error message to the user
            
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='main'>
                <div className='sub-main'>
                    <div>
                        <div className='imgs'>
                            <div className='container-image'>
                                <img src={profile} alt='profile' className='profile' />
                            </div>
                        </div>
                        <div>
                            <h1 className='LHeader'>Login</h1>
                            <div>
                                <img src={email} alt="email" className='email' />
                                <input id="email" value={userData.email} onChange={handleInputChange} type="email"
                                    placeholder='Enter Email' className='fill' required />
                            </div>
                            <div className='second-input'>
                                <img src={lock} alt='password' className='email' />
                                <input id="password" value={userData.password} onChange={handleInputChange} type="password"
                                    placeholder='Enter Password' className='fill' required />
                            </div>
                            <div className='login-btn'>
                                <button type="submit">Login</button>
                            </div>
                            <div className='reg-link'>
                                <Link className='link' to='/registration'>
                                    <li>Register Now</li>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Login;
