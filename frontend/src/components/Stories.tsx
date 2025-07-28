
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus, User } from 'lucide-react';
import { useSocial } from '@/contexts/SocialContext';

const Stories = () => {
  const { users, currentUser } = useSocial();
  const [showStoryViewer, setShowStoryViewer] = useState(false);

  return (
    <Card className="p-4 mb-6 dark:bg-slate-800/90 dark:border-slate-700/50">
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {/* Add Your Story */}
        {currentUser && (
          <div className="flex flex-col items-center space-y-2 min-w-0 flex-shrink-0">
            <div className="relative">
              <Avatar className="w-16 h-16 ring-2 ring-gray-300 dark:ring-slate-600">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="dark:bg-slate-700"><User className="w-8 h-8" /></AvatarFallback>
              </Avatar>
              <Button size="sm" className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full p-0 social-gradient">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <span className="text-xs text-gray-600 dark:text-slate-400 text-center">Your Story</span>
          </div>
        )}
        
        {/* Other Users' Stories */}
        {users.slice(0, 8).map((user) => (
          <div key={user.id} className="flex flex-col items-center space-y-2 min-w-0 flex-shrink-0 cursor-pointer">
            <div className="story-gradient-ring">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="dark:bg-slate-700"><User className="w-8 h-8" /></AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs text-gray-600 dark:text-slate-400 text-center truncate w-16">{user.name.split(' ')[0]}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Stories;
