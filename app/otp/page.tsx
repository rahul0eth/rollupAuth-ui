"use client";

import { account, walletClient } from './config'
import { domain,otpMock, types } from './data'
import { verifyTypedData } from 'viem'
import React, { useEffect, useState } from 'react';
import { useSignMessage, useWalletClient } from 'wagmi';
import { useAccount } from 'wagmi';
import { ethers } from "ethers";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signTypedData } from '@wagmi/core'
// import { ActionSchema } from "@stackr/stackr-js";

export default function SendOTP() {
  const router = useRouter();
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const { data: signer } = useWalletClient()
  const [otp, setOtp] = useState<number>(0); // Assuming OTP is input by the user
  
  // const otpInput = new ActionSchema("verify-otp", actionSchemaType);
    // functions

    async function sendOTP() {
      const data = {
        type: "valid",
        otp: otp
      };

      const signature = await signer?.signTypedData({
        domain, 
        primaryType: 'verify-otp', 
        types: otpMock, 
        message: data
      })
      console.log(signature);
      const payload = JSON.stringify({
        msgSender: address,
        signature: signature,
        payload: data,
      });
      const valid = await verifyTypedData({
        address: "0xFa00D29d378EDC57AA1006946F0fc6230a5E3288",
        domain,
        types: otpMock,
        primaryType: 'verify-otp',
        message: data,
        signature:"0x8ed9bbae7217c40aa574a5395a522c9f367a9020a526a19ca3c82f8edce3502f36aa3570f36c85c0c5cac5582afbdb65133342a0a27bf577c11aa5f92ca367671b",
      })
      
      console.log(payload,valid);

      try {
      const response = await axios.post('http://localhost:3000/', {payload:payload});
      console.log(response);
      } catch(error){
        console.error('Failed to send OTP:', error);
      }
    }

  function handleClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendOTP();
    router.push('/signtxn');
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
              name="otp" 
              id="otp" 
              placeholder='696969' 
              onChange={(e) => setOtp(parseInt(e.target.value))} 
              
            />
          </div>
          <div><button className='p-2 w-32 bg-blue-500 font-bold rounded-xl' type='submit'>Submit</button></div>
        </form>
      </div>
    </main>
  )
}