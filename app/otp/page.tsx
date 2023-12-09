"use client";

import React, { useEffect, useState } from 'react';
import { useSignMessage } from 'wagmi';
import { useAccount } from 'wagmi';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SendOTP() {

  const router = useRouter();
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();

  const [otp, setOtp] = useState<string>(''); // Assuming OTP is input by the user

    // functions

    async function sendOTP() {
      try {
        const response = await axios.post('http://localhost:3000/verify', { otp: otp });
        console.log(`Sent data\n{ otp: ${otp} }`);
        console.log('Response from server:', response.data);
      } catch (error) {
        console.error('Error sending email data:', error);
      }
    }

  function handleClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendOTP();
    console.log('DONE?!');
  }

  if (isConnecting) return <main className="flex flex-col items-center justify-between p-24 border border-gray-500 rounded-xl m-4"><div>Connecting…</div></main>
  
  if (isDisconnected) return <main className="flex flex-col items-center justify-between p-24 border border-gray-500 rounded-xl m-4"><div>Connect wallet to proceed</div></main>

  return (isConnected &&
    <main className="flex flex-col items-center justify-between p-24 border border-gray-500 rounded-xl m-4">
      <div>
        <form className='flex flex-col justify-center items-center space-y-4' onSubmit={handleClick}>
          <div className='flex justify-center items-center space-x-4 p-4'>
            <label htmlFor="otp">Enter OTP:</label>
            <input 
              className='p-1 rounded-lg text-black' 
              type="text" 
              inputMode="numeric" // ensures a numeric keyboard on mobile devices
              pattern="\d*"  // ensures only digits can be entered
              name="otp" 
              id="otp" 
              placeholder='696969' 
              onChange={(e) => {setOtp(e.target.value as any)}} 
              maxLength={6}
            />
          </div>
          <div><button className='p-2 w-32 bg-blue-500 font-bold rounded-xl' type='submit'>Submit</button></div>
        </form>
      </div>
    </main>
  )
}