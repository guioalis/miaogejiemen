import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Chat } from './components/Chat';
import { About } from './components/About';
import { Navigation } from './components/Navigation';
import './index.css';
import { Theme } from './types';
import { useState, useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white' 
          : 'bg-gradient-to-b from-purple-50 to-white'
      }`}>
        <Navigation theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Chat theme={theme} />} />
          <Route path="/about" element={<About theme={theme} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
