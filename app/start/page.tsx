"use client"

import React from 'react'
import axios from 'axios';

export default function Home() {

  interface VerifyRequest {
    msgSender: string;
    signature: string;
    payload: {
      type: string;
      otp: number;
    };
  }

  const verifyRequest: VerifyRequest = {
    msgSender: "0xA4ABbB9be9AFFc59e6d6A4079c71584B7a801240",
    signature: "0x376166ba6bdf2a520edc0e2686e984ad89a8768b4ffa263442e9e68d9081739f4afe944089643d03082f6dcfb24fd7c9e67e5ae435c25721780b1143f0c427f81b",
    payload: {
      type: "valid",
      otp:1, // Assuming otp is not null
    },
  };

  const[otp, setOtp] = React.useState<number | null>(null);

  const handleClick = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/verify',{
        verifyRequest: verifyRequest
      });
      
      console.log(response.data);
      console.log("OTP sent");
    } catch (error) {
      console.error('Failed to OTP:', error);
    }
  };

  

  return (
    
    <main className="flex flex-col items-center justify-between p-24 border border-gray-500 rounded-xl m-4">
      <div>
        <form className='flex flex-col justify-center items-center space-y-4' onSubmit={(e) => handleClick(e)}>
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
              maxLength="6"
            />
          </div>
          <div><button className='p-2 w-32 bg-blue-500 font-bold rounded-xl' type='submit'>Submit</button></div>
        </form>
      </div>
    </main>
  )
}