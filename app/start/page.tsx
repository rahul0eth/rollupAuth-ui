"use client"

import { useState } from 'react';
import axios from 'axios';

export default function Start() {

  const [data, setData] = useState(null);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    try {
      const response = await axios.post('http://localhost:4000/');
      setData(response.data);
      console.log("fetching done");
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  return (
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
