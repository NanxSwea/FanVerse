import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWallet } from '../context/WalletContext';

interface Fandom {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

const fandoms: Fandom[] = [
  { id: 'dhoni', name: 'MS Dhoni', emoji: '🏏', color: 'bg-blue-500' },
  { id: 'bts', name: 'BTS', emoji: '🎤', color: 'bg-purple-500' },
  { id: 'messi', name: 'Messi', emoji: '⚽', color: 'bg-red-500' },
  { id: 'taylor', name: 'Taylor Swift', emoji: '🎶', color: 'bg-pink-500' },
  { id: 'naruto', name: 'Naruto', emoji: '🍥', color: 'bg-orange-500' },
];

export default function FandomSelect() {
  const [selectedFandom, setSelectedFandom] = useState<string | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const navigate = useNavigate();
  const { walletAddress } = useWallet();

  const handleFandomSelect = async (fandomId: string) => {
    setSelectedFandom(fandomId);
    setIsMinting(true);
    
    try {
      // TODO: Implement NFT minting logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated minting delay
      navigate('/quiz');
    } catch (error) {
      console.error('Error minting NFT:', error);
    } finally {
      setIsMinting(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-8 text-gray-800"
      >
        Choose Your Fandom
      </motion.h2>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {fandoms.map((fandom) => (
          <motion.button
            key={fandom.id}
            variants={item}
            onClick={() => handleFandomSelect(fandom.id)}
            disabled={isMinting}
            className={`
              ${fandom.color} p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all
              flex flex-col items-center justify-center space-y-4 min-h-[200px]
              ${isMinting && selectedFandom === fandom.id ? 'animate-pulse' : ''}
            `}
          >
            <span className="text-4xl">{fandom.emoji}</span>
            <h3 className="text-xl font-semibold text-white">{fandom.name}</h3>
            {isMinting && selectedFandom === fandom.id && (
              <p className="text-white text-sm">Minting your badge...</p>
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}