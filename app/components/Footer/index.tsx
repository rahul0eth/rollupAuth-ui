import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import twitter_logo from '@/public/twitter/twitter.jpg';
import github_logo from '@/public/github.svg';

const Footer: React.FC = () => {
    return (
        <footer className='flex flex-col justify-center items-center border border-gray-500 rounded-xl m-4'>
            <p className='mt-2'>© rollupAuth. All rights reserved</p>
            <div className='m-2 flex justify-center items-center space-x-2'>
                <Link className='rounded-2xl overflow-hidden' href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Image src={twitter_logo} alt="Twitter" width={35}/>
                </Link>
                <Link className='rounded-2xl overflow-hidden' href="https://github.com/rahul0eth/rollupAuth" target="_blank" rel="noopener noreferrer">
                    <Image className='bg-white' src={github_logo} alt="GitHub" width={35}/>
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
