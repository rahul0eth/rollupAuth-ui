"use client"

import { useState } from 'react';
import { useAccount } from 'wagmi';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Start() {

  const { address, isConnected, isConnecting, isDisconnected } = useAccount();

  const router = useRouter();
  const [email, setEmail] = useState<string>('');

  // functions

  async function sendEmailAndAddress() {
    try {
      const response = await axios.post('http://localhost:3000/mail',
      {
        email: email,
        userAddress: address,
      }
      );
      console.log(`Sent data\nemail: ${email}, address: ${address}`);
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error sending email data:', error);
    }
  }

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    await sendEmailAndAddress();
    console.log(email)
    router.push('/otp');
    
  };


  if (isConnecting) return <main className="flex flex-col items-center justify-between p-24 border border-gray-500 rounded-xl m-4"><div>Connecting…</div></main>
  
  if (isDisconnected) return <main className="flex flex-col items-center justify-between p-24 border border-gray-500 rounded-xl m-4"><div>Connect wallet to proceed</div></main>

  return (isConnected &&
    <main className="flex flex-col items-center justify-between p-24 border border-gray-500 rounded-xl m-4">
        <form className='flex flex-col justify-center items-center space-y-4' onSubmit={handleSubmit}>
            <div className='flex justify-center items-center space-x-4 p-4'>
                <label htmlFor="email">Enter Email:</label>
                <input
                    className='p-1 rounded-lg text-black' 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
            </div>
        <button className='p-2 w-32 bg-blue-500 font-bold rounded-xl' type="submit">Submit</button>
        </form>
    </main>
  );
}
