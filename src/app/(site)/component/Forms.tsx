"use client";

import React, { useState } from 'react'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotPassword from './ForgotPasswordFrom';

const Forms = () => {
    const [activeForm, setActiveForm] = useState("login");

    if (activeForm === 'login'){
        return (
            <>
                <h2 className="mt-3 text-center text-2xl lg:text-3xl font-bold tracking-tight text-neutral-content">Sign into your account</h2>
                <LoginForm setActivePage={setActiveForm}/>
            </>
        )
    }
    else if(activeForm === 'signup'){
        return (
            <>
                <h2 className="mt-3 text-center text-2xl lg:text-3xl font-bold tracking-tight text-neutral-content">Create your Account</h2>
                <SignupForm setActivePage={setActiveForm}/>
            </>
        )
    }
    else if(activeForm === 'forgotPassword'){
        return (
            <>
                <h2 className="mt-3 text-center text-2xl lg:text-3xl font-bold tracking-tight text-neutral-content">Reset Your Password</h2>
                <ForgotPassword setActivePage={setActiveForm}/>
            </>
        )
    }
}

export default Forms