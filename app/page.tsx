"use client"

import React, { use, useEffect } from 'react';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import axios from 'axios';
import { domain,otpMock, types } from './otp/data'
import { useSignMessage, useWalletClient } from 'wagmi';
import * as ethers from 'ethers';

export default function Home() {
  const { data: signer } = useWalletClient()

  const { address, isConnected, isConnecting, isDisconnected } = useAccount();

  const [email, setEmail] = React.useState<string>('');
  const [oEmail, setOEmail] = React.useState<string>('');


  const [emailSubmitted, setEmailSubmitted] = React.useState<boolean>(false);
  const [otpSubmitted, setOtpSubmitted] = React.useState<boolean>(false);
  const [trxIn, setTrxIn] = React.useState<boolean>(false);
  const [com,setCom] = React.useState<boolean>(false);
  const[otp, setOtp] = React.useState<number>(0);
  const [pack,setPack] = React.useState<boolean>(false);

  useEffect(() => {
    if (address) {
        axios.get(`http://localhost:3000/get-email?ethAddress=${address}`)
            .then(response => {
                setOEmail(response.data.email);
                setEmailSubmitted(true);
                setOtpSubmitted(true);
            })
            .catch(error => {
                console.log('Email not linked yet.');
            });
    }
}, [address]);

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

  async function setEmailAndAddress() {
    try {
      const response = await axios.post('http://localhost:3000/addmail',
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

  async function handleSubmitEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // setEmail(e.target.value);
    await setEmailAndAddress();
    setEmailSubmitted(true);
    console.log('Email submitted.');
  }

  async function sendOTP() {
    const data = {
      type: "valid",
      otp: Number(otp)
    };

    // const ethersSigner = new ethers.providers
    
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();

    const signature = await signer._signTypedData(
      domain,  
      {
        "verify-otp": [
          {
            name: "type",
            type: "string",
          }, 
          {
            name: "otp",
            type: "uint256",
          }
        ],
      }, 
      data
    )


    // const signature = await signer?.signTypedData({
    //   domain, 
    //   primaryType: 'verify-otp', 
    //   types: otpMock, 
    //   message: data
    // })
    console.log(signature);
    const payload = JSON.stringify({
      msgSender: address,
      signature: signature,
      payload: data,
    });
    // const valid = await verifyTypedData({
    //   address: "0xFa00D29d378EDC57AA1006946F0fc6230a5E3288",
    //   domain,
    //   types: otpMock,
    //   primaryType: 'verify-otp',
    //   message: data,
    //   signature:"0x8ed9bbae7217c40aa574a5395a522c9f367a9020a526a19ca3c82f8edce3502f36aa3570f36c85c0c5cac5582afbdb65133342a0a27bf577c11aa5f92ca367671b",
    // })
    
    console.log(payload);

    // try {
    // const response = await axios.post('http://localhost:3000/', {payload:payload});
    // console.log(response);
    // } catch(error){
    //   console.error('Failed to send OTP:', error);
    // }
  }

  async function handleSubmitOtp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // await sendOTP();
    // setTrxIn(false);
    await sendEmailAndAddress();
    setPack(true);
    setOtpSubmitted(true);
    console.log('Transction Submitted.');
  }

  async function handleSignTxn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await sendOTP();
    setCom(true);
    console.log('Signed txn.');
  }





  
  return (
    <div className='flex flex-col justify-between items-center'>
    <main className="flex flex-col items-center justify-between  font-mono w-full max-w-5xl">
      { !trxIn && emailSubmitted && <div className='bg-green-500 absolute fadein h-[100vh] w-[100vw] top-0 p-4 z-20 flex justify-center items-center flex-col'>
          <p className='text-4xl'>Email indexed with address!</p>
          <button className='p-2 m-4 w-32 bg-blue-500 font-bold' onClick={() => setTrxIn(true)}>Do a trnx</button>
      </div>}
      { !isConnected && <div className='text-2xl m-4'>Connect Wallet</div>}

      {isConnected && !emailSubmitted &&
      
        <form className='flex flex-col justify-center items-center mt-40  w-full max-w-5xl' onSubmit={(e) => handleSubmitEmail(e)}>
          <div className='flex flex-col items-center w-full space-x-4 p-4'>
            <div className='text-2xl m-4'>Enter Email</div>
            <input 
              className='px-2 py-3 text-black w-[60%]' 
              type="text"
              name="email" 
              id="email" 
              placeholder='abc@xyz'
              onChange={(e) => {setEmail(e.target.value as any)}}
            />
          </div>
          <button className='p-2 m-4 w-32 bg-blue-500 font-bold' type='submit'>Submit</button>
        </form>
      }
      { isConnected && emailSubmitted && trxIn && !pack &&
      <div className='flex flex-col fadein justify-center items-center m-40'>
        <form className='flex flex-col justify-center items-center space-y-4' onSubmit={(e) => handleSubmitOtp(e)}>
          <p>{oEmail}</p>
          <div className='flex justify-center items-center space-x-4 p-4'>
            <div className='text-2xl m-4'>Tsx Details</div>
            <input 
              className='px-2 py-3 text-black'  
              name="to" 
              id="to" 
              placeholder='0x1234567890' 
              onChange={(e) => {}}
            />
            <input 
              className='px-2 py-3 text-black'  
              name="amount" 
              id="amount" 
              placeholder='0.1 ETH' 
              onChange={(e) => {}}
            />
          </div>
          <button className='p-2 w-32 bg-blue-500 font-bold' type='submit'>sign txn</button>
        </form>
      </div>
      }

      { isConnected && emailSubmitted && otpSubmitted && !com &&
      <div className='flex flex-col fadein justify-center items-center m-40'>
        <form className='flex flex-col justify-center items-center space-y-4' onSubmit={(e) => handleSignTxn(e)}>
          <div className='flex justify-center items-center space-x-4 p-4'>
            <div className='text-2xl m-4'>Enter OTP</div>
            <input 
              className='px-2 py-3 text-black'  
              name="otp" 
              id="otp" 
              placeholder='696969' 
              onChange={(e) => {setOtp(parseInt(e.target.value))}}
            />
          </div>
          <button className='p-2 w-32 bg-blue-500 font-bold' type='submit'>sign txn</button>
        </form>
      </div> }

      {com && <div className='bg-green-500 absolute fadein h-[100vh] w-[100vw] top-0 p-4 z-20 flex justify-center items-center flex-col'> 
          <p className='text-4xl'>Transaction Signed!</p>
      </div>}

    </main>
    </div>
  )
}
