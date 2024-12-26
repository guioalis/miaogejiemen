import { NavLink } from 'react-router-dom';
import { Moon, Sun, Home, Info } from 'lucide-react';
import { Theme } from '../types';

interface NavigationProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const Navigation = ({ theme, toggleTheme }: NavigationProps) => {
  return (
    <nav className={`sticky top-0 z-10 ${
      theme === 'dark' ? 'bg-gray-900/80' : 'bg-white/80'
    } backdrop-blur-sm border-b ${
      theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
    }`}>
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? theme === 'dark'
                  ? 'bg-gray-800 text-purple-400'
                  : 'bg-purple-50 text-purple-600'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>主页</span>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? theme === 'dark'
                  ? 'bg-gray-800 text-purple-400'
                  : 'bg-purple-50 text-purple-600'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Info className="w-5 h-5" />
            <span>关于</span>
          </NavLink>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Sun className="w-5 h-5 text-gray-300" />
          )}
        </button>
      </div>
    </nav>
  );
};
