"use client"

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {

  return (
    <header className=''>
      <nav className='flex justify-between items-center max-w-7xl p-4'>
        <Link href="/"> rollupAuth </Link>
        <ConnectButton />
      </nav>
    </header>
  );
};

export default Header;
