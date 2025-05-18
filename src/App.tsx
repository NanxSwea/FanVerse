import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import FandomSelect from './pages/FandomSelect';
import Quiz from './pages/Quiz';
import Gallery from './pages/Gallery';
import Leaderboard from './pages/Leaderboard';
import { WalletProvider } from './context/WalletContext';

function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/select-fandom" element={<FandomSelect />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;