import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { SignupValidation } from "@/app/FormValidation/FormValidation";


export async function POST(request: NextRequest){
    try {
        const body = await request.json();

        // let's first validate the data.
        const validation = SignupValidation.safeParse(body);

        if (!validation.success){
            return NextResponse.json({
                error: validation.error.format(),
            }, {status: 400});
        }

        const {name, email, otp, password} = body;

        // Let's check if this user already exists.
        const _user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (_user){
            return NextResponse.json({
                error: "User already exists"
            }, {status: 400})
        }

        // now let's verify the otp.
        const _otp = await prisma.otp.findFirst({
            where: {
                email
            }
        }) 

        const isOtpExpired = new Date(_otp!.sentAt) > new Date(Date.now() + 900000)

        if (!_otp || _otp.otp !== otp || isOtpExpired){
            return NextResponse.json({
                error: "Please provide an valid OTP.",
            }, {status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword
            }
        })

        if (!user){
            return NextResponse.json({
                error: "Unable to sign up",
            }, {status: 400});
        }

        return NextResponse.json({
            success: true,
            message: "Account successfully created"
        }, {status: 200})

    } catch (error: any) {
        return Response.json({error: error.message}, {status: 500})
    }
}