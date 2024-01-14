"use client";

import Link from 'next/link';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { LoginValidation } from '@/app/FormValidation/FormValidation';
import z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

type User = z.infer<typeof LoginValidation>;

interface Props{
    setActivePage: CallableFunction
}

const LoginForm = (props: Props) => {
    const [gettingLogin, setGettingLogin] = useState(false);

    const {register, handleSubmit, formState: { errors }} = useForm<User>({
        resolver: zodResolver(LoginValidation)
    });

    function onSubmit(user: User){
        setGettingLogin(true);

        signIn("credentials", {
            ...user,
            redirect: false

        }).then((callback)=>{

            if(callback?.error){
                toast.error("Invalid credentials");
            }
            else if (callback?.ok){
                toast.success("Login successful");
            }

        }).finally(()=>{
            setGettingLogin(false);
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="sm:glass sm:bg-base-200 sm:shadow-xl sm:border-opacity-0 px-8 py-4 sm:py-14 mt-9 overflow-hidden rounded-lg flex flex-col gap-3 w-96">
            <div className="flex flex-col gap-4">
                <input type="text" placeholder="Email" {...register("email")} className="input input-bordered w-full max-w-xs" />
                <input type="password" placeholder="Password" {...register("password")} className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="self-end text-xs text-neutral-content cursor-pointer" onClick={()=>{props.setActivePage('forgotPassword')}}>forgot password ?</div>
            <button className="btn btn-primary mt-4">
                {gettingLogin ? <span className="loading loading-spinner loading-sm"></span> : "Login"}
            </button>
            <div className="text-xs cursor-pointer text-primary text-center mt-2" onClick={()=>{props.setActivePage("signup")}}>Don't have account ? Click Here</div>
            <div className="divider">OR</div>
            <div className="flex w-full justify-center gap-3">
                <button className="btn shadow-lg btn-square mt-4 text-lg"><FaGithub/></button>
                <button className="btn shadow-lg btn-square mt-4 text-lg"><FcGoogle/></button>
                <button className="btn shadow-lg btn-square mt-4 text-lg"><FaApple/></button>
            </div>
        </form>
    )
}

export default LoginForm;