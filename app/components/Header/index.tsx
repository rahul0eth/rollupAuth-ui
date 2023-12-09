"use client"

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {

  return (
    <header className='flex w-screen justify-center items-center border-4 border-gray-500 rounded-xl'>
      <nav className='flex justify-between items-center w-full max-w-7xl p-4'>
        <Link href="/start" className='text-xl'> rollupAuth </Link>
        <ConnectButton />
      </nav>
    </header>
  );
};

export default Header;
