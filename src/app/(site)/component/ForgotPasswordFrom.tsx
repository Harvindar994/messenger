"use client";

import Link from 'next/link';
import React from 'react'
import { useForm } from 'react-hook-form';
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

interface Props{
    setActivePage: CallableFunction
}

const ForgotPassword = (props: Props) => {
    const {register, handleSubmit} = useForm({

    });

    return (
        <form className="sm:glass sm:bg-base-200 sm:shadow-xl sm:border-opacity-0 px-8 py-4 sm:py-14 mt-9 overflow-hidden rounded-lg flex flex-col gap-3 w-96">
            <div className="flex flex-col gap-4">
                <input type="text" placeholder="Email" className="input input-bordered w-full max-w-xs" />
                <div className="flex items-center gap-3">
                    <input type="text" placeholder="OTP" className="input input-bordered w-full max-w-xs" />
                    <button className="btn btn-primary">Send OTP</button>
                </div>
                <input type="password" placeholder="New Password" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="self-end text-xs text-neutral-content cursor-pointer" onClick={()=>{props.setActivePage("login")}}>Want to login? Click Here</div>
            <button className="btn btn-primary mt-4">Reset</button>
            <div className="flex w-full justify-center gap-1 flex-col items-center mt-5">
                <div className="text-xs cursor-pointer text-primary" onClick={()=>{props.setActivePage("signup")}}>Don't have account ? Click Here</div>
                <p className="text-xs">Note: otp will be valid only for 15 minutes</p>
            </div>
        </form>
    )
}

export default ForgotPassword;