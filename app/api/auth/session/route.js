// src/app/api/auth/session/route.js
import { cookies } from 'next/headers'; // ⚡ Import cookies directly here ⚡
import { NextResponse } from 'next/server';

const TOKEN_COOKIE_NAME = 'auth_token';
const MAX_AGE_SEVEN_DAYS = 60 * 60 * 24 * 7; 


// POST /api/auth/session (Set Cookie)
export async function POST(request) {
    const cookiesAuth = await cookies();

    try {
        const { token } = await request.json();
        if (!token) {
            return NextResponse.json({ message: "Token missing" }, { status: 400 });
        }
        
        // ⚡ FIX: Call cookies().set() directly in the Route Handler ⚡
        cookiesAuth.set(TOKEN_COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: MAX_AGE_SEVEN_DAYS,
            path: '/',
            sameSite: 'lax',
        });
        
        return NextResponse.json({ success: true, message: "Cookie set" }, { status: 200 });

    } catch (error) {
        console.error("Error setting cookie:", error);
        // This is the error path that was being triggered previously
        return NextResponse.json({ success: false, message: "Internal Server Error during cookie setting" }, { status: 500 });
    }
}

// DELETE /api/auth/session (Clear Cookie)
export async function DELETE(request) {
    const cookiesAuth = await cookies();

    try {
        cookiesAuth.delete(TOKEN_COOKIE_NAME);
        return NextResponse.json({ success: true, message: "Cookie cleared" }, { status: 200 });
    } catch (error) {
        console.error("Error clearing cookie:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error during cookie clearing" }, { status: 500 });
    }
}