import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { JsonRpcProvider, Connection } from '@mysten/sui.js';
import { PriceServiceConnection, PriceFeed } from '@pythnetwork/price-service-client';

interface WalletContextType {
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  suiPrice: number | null;
}

const WalletContext = createContext<WalletContextType>({
  walletAddress: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  suiPrice: null,
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [suiPrice, setSuiPrice] = useState<number | null>(null);

  const connectWallet = async () => {
    try {
      if (window.slush) {
        const accounts = await window.slush.connect();
        setWalletAddress(accounts[0]);
      } else {
        alert('Please install Slush Wallet');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
  };

  useEffect(() => {
    const connection = new PriceServiceConnection('https://hermes-beta.pyth.network');
    const suiPriceId = 'ff61491a931112ddf1bd8147cd1b080f527b59b4c64f0ac66e5e1552ad78135d';

    const updatePrice = async () => {
      try {
        const priceFeed = await connection.getLatestPriceFeeds([suiPriceId]);
        if (priceFeed && priceFeed[0]) {
          const price = priceFeed[0].getPriceNoOlderThan(60);
          if (price) {
            setSuiPrice(price.price);
          }
        }
      } catch (error) {
        console.error('Error fetching SUI price:', error);
      }
    };

    // Initial price fetch
    updatePrice();

    // Update price every 30 seconds
    const interval = setInterval(updatePrice, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <WalletContext.Provider value={{ walletAddress, connectWallet, disconnectWallet, suiPrice }}>
      {children}
    </WalletContext.Provider>
  );
};