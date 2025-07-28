
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Hash } from 'lucide-react';
import { useSocial } from '@/contexts/SocialContext';

const TrendingSidebar = () => {
  const { trendingTopics, users } = useSocial();

  const suggestedUsers = users.filter(user => !user.isFollowing).slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Trending Topics */}
      <Card className="p-4 dark:bg-slate-800/90 dark:border-slate-700/50">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900 dark:text-slate-100">Trending Now</h3>
        </div>
        <div className="space-y-2">
          {trendingTopics.slice(0, 5).map((topic, index) => (
            <div key={topic} className="flex items-center justify-between py-2 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-lg px-2 cursor-pointer">
              <div className="flex items-center space-x-2">
                <Hash className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-800 dark:text-slate-200">{topic.replace('#', '')}</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-slate-400">#{index + 1}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Suggested Users */}
      <Card className="p-4 dark:bg-slate-800/90 dark:border-slate-700/50">
        <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-4">Suggested for you</h3>
        <div className="space-y-3">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center space-x-3">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-slate-100 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 truncate">{user.username}</p>
              </div>
              <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                Follow
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TrendingSidebar;
