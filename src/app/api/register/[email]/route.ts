import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(request: NextRequest, {params}: {params: {email: string}}){
    try {
        const { email } = params;

        // first let's check if email already exist.
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (user){
            return NextResponse.json({
                error: "User already exists"
            }, {status: 400})
        }

        // let's generate otp.
        var minm = 100000;
        var maxm = 999999;
        var otp =  String(Math.floor(Math.random() * (maxm - minm + 1)) + minm);

        const sentOtp = await prisma.otp.findFirst({
            where: {
                email
            }
        })

        var savedOtp = null;

        if (sentOtp){

            savedOtp = await prisma.otp.update({
                where: {
                    email
                },
                data: {
                    otp: otp,
                    sentAt: new Date(Date.now())
                }
            })

        }
        else{

            savedOtp = await prisma.otp.create({
                data: {
                    email,
                    otp
                }
            })
        }

        if (!savedOtp){
            return NextResponse.json({
                error: "Unable to send OTP, try again"
            }, {status: 400})
        }

        // once otp is saved to the database let send it to email.
        return NextResponse.json({
            success: true,
            message: "Otp sent successfully"
        }, {status: 200})
        
    } catch (error: any) {
        return NextResponse.json({
            error: "Unable to send OTP"
        }, {status: 500})
    }
}