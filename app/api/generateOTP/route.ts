"use server";

import nodemailer from 'nodemailer';

function generateOTP(length: number): string {
    const digits = '0123456789';
    let otp = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        otp += digits[randomIndex];
    }

    return otp;
}

async function sendOTPByEmail(email: string, otp: string): Promise<void> {
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'your_email_service_provider',
        auth: {
            user: 'rollupauth@apple.testinator.com',
            pass: 'your_password',
        },
    });
 
    // Define the email options
    const mailOptions = {
        from: 'your_email',
        to: email,
        subject: 'Your OTP',
        text: `Your OTP is: ${otp}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('OTP sent to email:', email);
}

const otp = generateOTP(6);
const email = 'user@example.com';
sendOTPByEmail(email, otp)
    .catch((error) => console.error('Failed to send OTP:', error));
console.log('Generated OTP:', otp);
