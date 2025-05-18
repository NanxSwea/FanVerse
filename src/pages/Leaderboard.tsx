import { motion } from 'framer-motion';

interface LeaderboardEntry {
  rank: number;
  address: string;
  score: number;
  badges: number;
  rareNFTs: number;
}

const demoLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    address: '0x1234...5678',
    score: 150,
    badges: 3,
    rareNFTs: 2
  },
  {
    rank: 2,
    address: '0x8765...4321',
    score: 120,
    badges: 2,
    rareNFTs: 1
  },
  {
    rank: 3,
    address: '0x9876...1234',
    score: 90,
    badges: 2,
    rareNFTs: 1
  }
];

export default function Leaderboard() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-8 text-gray-800"
      >
        Top Fans Leaderboard
      </motion.h2>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Wallet
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Badges
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rare NFTs
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {demoLeaderboard.map((entry) => (
              <motion.tr 
                key={entry.address}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: entry.rank * 0.1 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`
                    inline-flex items-center justify-center w-8 h-8 rounded-full
                    ${entry.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                      entry.rank === 2 ? 'bg-gray-100 text-gray-800' :
                      entry.rank === 3 ? 'bg-orange-100 text-orange-800' :
                      'bg-white text-gray-800'}
                  `}>
                    {entry.rank}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {entry.score}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {entry.badges}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {entry.rareNFTs}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}