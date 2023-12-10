"use client"
import logo from '@/public/logo.jpg';
import Link from 'next/link';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {

  return (
    <header className='flex w-screen justify-center items-center border-b-2 border-blue-500 bg-black px-8'>
      <nav className='flex justify-between items-center w-full max-w-7xl'>
        <Link href="/" className='flex items-center'>
          <Image src={logo} alt='logo' width={90} height={90} />
          <p className='text-2xl'>rollupAuth</p>
        </Link>
        <ConnectButton />
      </nav>
    </header>
  );
};

export default Header;