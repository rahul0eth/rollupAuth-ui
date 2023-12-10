"use client"

import React from 'react';

import '@rainbow-me/rainbowkit/styles.css';
import { Chain, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, sepolia, arbitrum, scroll, mantle, celo, base } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const arbitrum_testnet: Chain = {
  id: 421614,
  name: 'Arbitrum Sepolia',
  network: 'arbitrum_testnet',
  iconUrl: 'https://cryptologos.cc/logos/arbitrum-arb-logo.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Arbitrum',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://sepolia-rollup.arbitrum.io/rpc'] },
    default: { http: ['https://sepolia-rollup.arbitrum.io/rpc'] },
  },
  testnet: true,
};

const scroll_testnet: Chain = {
  id: 534351,
  name: 'Scroll Sepolia',
  network: 'Scroll Sepolia Testnet',
  iconUrl: 'https://scrollscan.com/images/svg/brands/main.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Scroll',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://scroll-sepolia.blockpi.network/v1/rpc/public'] },
    default: { http: ['https://scroll-sepolia.blockpi.network/v1/rpc/public'] },
  },
  testnet: true,
};

const mantle_testnet: Chain = {
  id: 5001,
  name: 'Mantle Testnet',
  network: 'Mantle Testnet',
  iconUrl: 'https://cryptologos.cc/logos/mantle-mnt-logo.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Mantle Testnet',
    symbol: 'MNT',
  },
  rpcUrls: {
    public: { http: ['https://mantle-testnet.rpc.thirdweb.com'] },
    default: { http: ['https://mantle-testnet.rpc.thirdweb.com'] },
  },
  testnet: true,
};

const alfajores: Chain = {
  id: 44787,
  name: 'Celo Alfajores Testnet',
  network: 'Celo Alfajores Testnet',
  iconUrl: 'https://cryptologos.cc/logos/celo-celo-logo.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Celo Alfajores Testnet',
    symbol: 'CELO',
  },
  rpcUrls: {
    public: { http: ['https://alfajores-forno.celo-testnet.org'] },
    default: { http: ['https://alfajores-forno.celo-testnet.org'] },
  },
  testnet: true,
};

const base_goerli: Chain = {
  id: 84531,
  name: 'Base Goerli Testnet',
  network: 'Base Goerli Testnet',
  iconUrl: 'https://altcoinsbox.com/wp-content/uploads/2023/02/base-logo.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Base Goerli Testnet',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://goerli.base.org'] },
    default: { http: ['https://goerli.base.org'] },
  },
  testnet: true,
};

const xdc_testnet: Chain = {
  id: 51,
  name: 'XDC Apothem Network',
  network: 'XDC Apothem Network',
  iconUrl: 'https://altcoinsbox.com/wp-content/uploads/2023/03/XDC-logo-.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'XDC Apothem Network',
    symbol: 'TXDC',
  },
  rpcUrls: {
    public: { http: ['https://rpc.apothem.network'] },
    default: { http: ['https://rpc.apothem.network'] },
  },
  testnet: true,
};

const okx_x1_testnet: Chain = {
  id: 195,
  name: 'X1 Testnet',
  network: 'X1 Testnet',
  iconUrl: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/okc/info/logo.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'X1 Testnet',
    symbol: 'OKB',
  },
  rpcUrls: {
    public: { http: ['https://rpc.apothem.network'] },
    default: { http: ['https://rpc.apothem.network'] },
  },
  testnet: true,
};

const stackr: Chain = {
  id: 69420,
  name: 'stackr',
  network: 'stackr',
  iconUrl: 'https://example.com/icon.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'stackr',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['http://rpc.stf.xyz'] },
    default: { http: ['http://rpc.stf.xyz'] },
  },
  testnet: true,
};

const { chains, publicClient } = configureChains(
  [ sepolia, stackr, arbitrum_testnet, scroll_testnet, mantle_testnet, alfajores, base_goerli, xdc_testnet, okx_x1_testnet ],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID! }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: `${process.env.NEXT_PUBLIC_WALLETCONNECT_ID}`,
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export default function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    return (
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} >
          {mounted && children}
        </RainbowKitProvider>
      </WagmiConfig>
    );
  }
