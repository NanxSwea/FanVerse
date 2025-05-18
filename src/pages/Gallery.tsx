import { useState } from 'react';
import { motion } from 'framer-motion';

interface NFT {
  id: string;
  name: string;
  fandom: string;
  type: 'badge' | 'rare';
  image: string;
}

// Demo NFTs
const demoNFTs: NFT[] = [
  {
    id: '1',
    name: 'MS Dhoni Fan Badge',
    fandom: 'dhoni',
    type: 'badge',
    image: 'https://images.pexels.com/photos/1327430/pexels-photo-1327430.jpeg'
  },
  {
    id: '2',
    name: 'World Cup Winning Six',
    fandom: 'dhoni',
    type: 'rare',
    image: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg'
  },
  {
    id: '3',
    name: 'BTS Army Badge',
    fandom: 'bts',
    type: 'badge',
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'
  }
];

export default function Gallery() {
  const [selectedFandom, setSelectedFandom] = useState<string | 'all'>('all');

  const filteredNFTs = selectedFandom === 'all' 
    ? demoNFTs 
    : demoNFTs.filter(nft => nft.fandom === selectedFandom);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
        Your NFT Collection
      </motion.h2>

      <div className="mb-8 flex justify-center space-x-4">
        <button
          onClick={() => setSelectedFandom('all')}
          className={`px-4 py-2 rounded-lg ${
            selectedFandom === 'all' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedFandom('dhoni')}
          className={`px-4 py-2 rounded-lg ${
            selectedFandom === 'dhoni' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          MS Dhoni
        </button>
        <button
          onClick={() => setSelectedFandom('bts')}
          className={`px-4 py-2 rounded-lg ${
            selectedFandom === 'bts' 
              ? 'bg-purple-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          BTS
        </button>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredNFTs.map((nft) => (
          <motion.div
            key={nft.id}
            variants={item}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img 
              src={nft.image} 
              alt={nft.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{nft.name}</h3>
              <span className={`
                px-2 py-1 rounded-full text-sm
                ${nft.type === 'rare' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}
              `}>
                {nft.type === 'rare' ? 'Rare' : 'Badge'}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}