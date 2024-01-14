import z from "zod";

export const LoginValidation = z.object({
    email: z.string().min(1, "Email is required"),
    password: z.string().min(4, "Password length shouuld be atleast 4 characters.").max(15, "password length should not be grater than 15 characters.")
})

export const SignupValidation = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required"),
    otp: z.string().min(6, "Otp is required").max(6, "Invalid Otp"),
    password: z.string().min(4, "Password length shouuld be atleast 4 characters.").max(15, "password length should not be grater than 15 characters.")
})

export const ForgotPasswordValidation =z.object({
    email: z.string().min(1, "Email is required"),
    otp: z.string().min(6, "Otp is required").max(6, "Invalid Otp"),
    password: z.string().min(4, "Password length shouuld be atleast 4 characters.").max(15, "password length should not be grater than 15 characters.")
})

