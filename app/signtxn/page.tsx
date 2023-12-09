"use client";

import React, { useEffect, useState } from 'react';
import { useSignMessage } from 'wagmi';
import { useAccount } from 'wagmi';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function TxnSigner() {

  const router = useRouter();
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();

  // const [otp, setOtp] = useState<string>(''); // Assuming OTP is input by the user
  const [message, setMessage] = useState<string>('{"key": "hardcoded data to be signed"}'); // message to be signed by the user

  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: message
  });

  useEffect(() => {

    async function sendSignedData() {
      try {
        const response = await axios.post('http://localhost:3000/mail', { signature: data });
        console.log(`Sent data\n{ signature: ${data} }`);
        console.log('Response from server:', response.data);
      } catch (error) {
        console.error('Error sending email data:', error);
      }
    }

    if (isSuccess) {
      console.log('Signature:', data);
      sendSignedData(); // send signature to server
      console.log('Signature sent to server');
      router.push('/');
    }

  }, [data]);


  if (isConnecting) return <main className="flex flex-col items-center justify-between p-24 border border-gray-500 rounded-xl m-4"><div>Connecting…</div></main>
  
  if (isDisconnected) return <main className="flex flex-col items-center justify-between p-24 border border-gray-500 rounded-xl m-4"><div>Connect wallet to proceed</div></main>

  return (isConnected &&
    <div>
      <div>Message: {message}</div>
      <button className='p-2 w-32 bg-blue-500 font-bold rounded-xl' disabled={isLoading} onClick={() => signMessage()}>
        Sign message
      </button>
      {isSuccess && <div> Signature: {data} </div>}
      {isError && <div>Error signing message</div>}
    </div>
  )
}