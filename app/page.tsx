"use client"

import React, { use, useEffect } from 'react';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import axios from 'axios';

export default function Home() {

  const { address, isConnected, isConnecting, isDisconnected } = useAccount();

  const [email, setEmail] = React.useState<string>('');

  const [emailSubmitted, setEmailSubmitted] = React.useState<boolean>(false);
  const [otpSubmitted, setOtpSubmitted] = React.useState<boolean>(false);
  const[otp, setOtp] = React.useState<number | null>(null);

  async function sendEmailAndAddress() {
    try {
      const response = await axios.post('http://localhost:4000/addmail', { email: email, userAddress: address });
      console.log(`Sent data\nemail: ${email}, address: ${address}`);
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error sending email data:', error);
    }
  }

  function handleSubmitEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendEmailAndAddress();
    setEmailSubmitted(true);
    console.log('Email submitted.');
  }

  function handleSubmitOtp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOtpSubmitted(true);
    console.log('OTP submitted.');
  }

  function handleSignTxn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('Signed txn.');
  }





  
  return (
    <div className='flex justify-center items-center h-[80vh]'>
    <main className="flex flex-col items-center justify-between p-24 font-mono w-full max-w-5xl">

      { !isConnected && <div className='text-2xl m-4'>Connect Wallet</div>}

      {isConnected && 
      
        <form className='flex flex-col justify-center items-center space-y-4 w-full max-w-5xl' onSubmit={(e) => handleSubmitEmail(e)}>
          <div className='flex flex-col items-center w-full space-x-4 p-4'>
            <div className='text-2xl m-4'>Enter Email</div>
            <input 
              className='px-2 py-3 text-black w-[60%]' 
              type="text"
              name="email" 
              id="email" 
              placeholder='abc@xyz'
              onChange={(e) => {setOtp(e.target.value as any)}}
            />
          </div>
          <button className='p-2 m-4 w-32 bg-blue-500 font-bold' type='submit'>Submit</button>
        </form>
      }


      { isConnected && emailSubmitted && 
      <div className='flex flex-col justify-center items-center m-4'>
        <div className='text-green-400 text-lg'>email submitted</div>
        <form className='flex flex-col justify-center items-center space-y-4' onSubmit={(e) => handleSignTxn(e)}>
          <div className='flex justify-center items-center space-x-4 p-4'>
            <div className='text-2xl m-4'>Enter OTP</div>
            <input 
              className='px-2 py-3 text-black' 
              type="text" 
              name="otp" 
              id="otp" 
              placeholder='696969' 
              onChange={(e) => {setOtp(e.target.value as any)}}
            />
          </div>
          <button className='p-2 w-32 bg-blue-500 font-bold' type='submit'>sign txn</button>
        </form>
      </div> }

    </main>
    </div>
  )
}
