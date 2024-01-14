"use client";

import Link from 'next/link';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupValidation } from '@/app/FormValidation/FormValidation';
import axios from 'axios';
import toast from 'react-hot-toast';

type User = z.infer<typeof SignupValidation>;

interface Props{
    setActivePage: CallableFunction
}

const SignupForm = (props: Props) => {
    const [sendingOtp, setSendingOtp] = useState(false);
    const [creatingAccount, setCreatingAccount] = useState(false);

    const {register, handleSubmit, formState: { errors }, getValues} = useForm<User>({
        resolver: zodResolver(SignupValidation)
    });

    async function onSubmit(user: User){
        try {
            setCreatingAccount(true);
            const response = await axios.post("/api/register", user);

            toast.success(response.data.message);

        } catch (error: any) {
            toast.error(error.response.data.error);

        } finally {
            setCreatingAccount(false);
        }
    }

    async function sendOtp(){
        
        try {
            setSendingOtp(true);
            const response = await axios.get(`/api/register/${getValues("email")}`);

            toast.success(response.data.message);

        } catch (error: any) {
            toast.error(error.response.data.error);

        } finally{
            setSendingOtp(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="sm:glass sm:bg-base-200 sm:shadow-xl sm:border-opacity-0 px-8 py-4 sm:py-14 mt-9 overflow-hidden rounded-lg flex flex-col gap-3 w-96">
            <div className="flex flex-col gap-4">
                <input type="text" placeholder="Name" {...register("name")} className="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="Email" {...register("email")} className="input input-bordered w-full max-w-xs" />
                <div className="flex items-center gap-3">
                    <input type="text" placeholder="OTP" {...register("otp")} className="input input-bordered w-full max-w-xs" />
                    <button type="button" className="btn btn-primary w-2/6" onClick={sendOtp}>
                        {sendingOtp ? <span className="loading loading-spinner loading-sm"></span> : "Send OTP"}
                    </button>
                </div>
                <input type="password" {...register("password")} placeholder="Password" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="self-end text-xs text-neutral-content" onClick={()=>{props.setActivePage("login")}}>Want to login? Click here</div>
            <button type='submit' className="btn btn-primary mt-4">
                {creatingAccount ? <span className="loading loading-spinner loading-sm"></span> : "Signup"}
            </button>
            <div className="flex w-full justify-center gap-1 flex-col items-center mt-5">
                <div className="text-xs cursor-pointer text-primary" onClick={()=>{props.setActivePage("forgotPassword")}}>Forgot your password ? Click Here</div>
                <p className="text-xs">Note: otp will be valid only for 15 minutes</p>
            </div>
        </form>
    )
}

export default SignupForm;