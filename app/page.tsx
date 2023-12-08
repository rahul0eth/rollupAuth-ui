"use client"

import Image from 'next/image'

export default function Home() {

  function handleClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <form className='flex flex-col justify-center items-center space-y-4' onSubmit={(e) => handleClick(e)}>
          <div className='flex justify-center items-center space-x-4 p-4'>
            <label htmlFor="otp">Enter OTP:</label>
            <input className='p-1' type="otp" name="otp" id="otp" placeholder='696969'/>
          </div>
          <div><button className='p-2 w-32 bg-blue-500 font-bold rounded-xl' type='submit'>Submit</button></div>
        </form>
      </div>
    </main>
  )
}
