"use client"

import React from 'react'
import Image from 'next/image'

export default function Home() {

  const[otp, setOtp] = React.useState<number | null>(null);

  function handleClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

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
