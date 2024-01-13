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

const LoginForm = (props: Props) => {
    const {register, handleSubmit} = useForm({

    });

    return (
        <form className="sm:glass sm:bg-base-200 sm:shadow-xl sm:border-opacity-0 px-8 py-4 sm:py-14 mt-9 overflow-hidden rounded-lg flex flex-col gap-3 w-96">
            <div className="flex flex-col gap-4">
                <input type="text" placeholder="Email" className="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="Password" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="self-end text-xs text-neutral-content cursor-pointer" onClick={()=>{props.setActivePage('forgotPassword')}}>forgot password ?</div>
            <button className="btn btn-primary mt-4">Login</button>
            <div className="text-xs cursor-pointer text-primary text-center mt-2" onClick={()=>{props.setActivePage("signup")}}>Don't have account ? Click Here</div>
            <div className="divider">OR</div>
            <div className="flex w-full justify-center gap-3">
                <button className="btn shadow-lg btn-square mt-4 text-lg"><FaGithub/></button>
                <button className="btn shadow-lg btn-square mt-4 text-lg"><FcGoogle/></button>
                <button className="btn shadow-lg btn-square mt-4 text-lg"><FaFacebook/></button>
            </div>
        </form>
    )
}

export default LoginForm