
import { User, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSocial } from '@/contexts/SocialContext';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import NotificationCenter from './NotificationCenter';
import DarkModeToggle from './DarkModeToggle';

const Header = () => {
  const { currentUser } = useSocial();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 dark:bg-slate-800/90 dark:border-slate-700/50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 social-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SocialSpace
            </span>
          </Link>

          <div className="flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            <NotificationCenter />
            
            <Button variant="ghost" size="sm" className="dark:hover:bg-slate-700/50">
              <MessageCircle className="w-5 h-5" />
            </Button>

            {currentUser ? (
              <Link to={`/profile/${currentUser.id}`}>
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-blue-300 dark:hover:ring-blue-500/50 transition-all">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback className="dark:bg-slate-700">
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  {currentUser.isOnline && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="social-gradient">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
