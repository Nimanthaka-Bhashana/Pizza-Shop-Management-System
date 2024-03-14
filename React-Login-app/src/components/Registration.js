import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mail from "./images/email.png";
import lock from "./images/lock.png";
import profile from "./images/icon.jpg";
import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:8080/api"
});

function Registration() {
    let navigate = useNavigate();

    const [userData, setUserData] = useState({
        employeeName: "",
        email: "",
        role: "",
        password: ""
    });

    function handleInputChange(e) {
        const { id, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await client.post('/users/register', userData);
            console.log('Registration response:', response.data);
            if (userData.role === "Buyer") {
                navigate("/HomeA");
            } else {
                navigate("/HomeB");
            }
        } catch (error) {
            console.error('Error during registration:', error);
            // Handle error here
        }
    }

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
                            <h1>Registration</h1>
                            <div className='mail-id'>
                                <img src={mail} alt="email" className='email' />
                                <input id="employeeName" value={userData.employeeName} onChange={handleInputChange} type="text" placeholder='Enter Your Full Name' className='fill' required />
                            </div>
                            <div className='mail-id'>
                                <img src={lock} alt="password" className='email' />
                                <input id="email" value={userData.email} onChange={handleInputChange} type="email" placeholder='Enter Your Email' className='fill' required />
                            </div>
                            <div className='mail-id'>
                                <img src={lock} alt="password" className='email' />
                                <input id="password" value={userData.password} onChange={handleInputChange} type="password" placeholder='Enter Your password' className='fill' required />
                            </div>
                            <div className='select'>
                                <select id="role" value={userData.role} onChange={handleInputChange} required>
                                    <option value="">Select Role</option>
                                    <option value="Buyer">Buyer</option>
                                    <option value="Seller">Seller</option>
                                </select>
                            </div>
                            <div className='login-btn'>
                                <button type="submit">Register</button>
                            </div>
                            <div className='reg-link'>
                                <p>If Account exists, then</p><Link className='link' to='/login'>Login!!!</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Registration;
