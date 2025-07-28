
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User as UserIcon, Shield } from 'lucide-react';
import { User } from '@/contexts/SocialContext';
import { useSocial } from '@/contexts/SocialContext';
import { Link } from 'react-router-dom';
import LiveIndicator from './LiveIndicator';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { followUser, currentUser } = useSocial();

  const handleFollow = () => {
    followUser(user.id);
  };

  const isCurrentUser = currentUser?.id === user.id;

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-300 dark:bg-slate-800/90 dark:border-slate-700/50">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <Link to={`/profile/${user.id}`}>
            <div className="relative">
              <Avatar className="w-16 h-16 avatar-ring">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="dark:bg-slate-700">
                  <UserIcon className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1">
                <LiveIndicator isOnline={user.isOnline} />
              </div>
            </div>
          </Link>
          
          <div className="flex-1 min-w-0">
            <Link to={`/profile/${user.id}`}>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-lg text-gray-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate">{user.name}</h3>
                {user.isVerified && (
                  <Shield className="w-4 h-4 text-blue-500 flex-shrink-0" />
                )}
              </div>
              <p className="text-gray-600 dark:text-slate-400 truncate">{user.username}</p>
            </Link>
          </div>
          
          {!isCurrentUser && (
            <Button
              onClick={handleFollow}
              variant={user.isFollowing ? "outline" : "default"}
              className={`shrink-0 ${user.isFollowing ? "border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950" : "social-gradient"}`}
              size="sm"
            >
              {user.isFollowing ? 'Following' : 'Follow'}
            </Button>
          )}
        </div>
        
        <div className="space-y-3">
          <p className="text-sm text-gray-500 dark:text-slate-400 line-clamp-2">{user.bio}</p>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-700 dark:text-slate-300"><strong>{user.posts.toLocaleString()}</strong> posts</span>
            <span className="text-gray-700 dark:text-slate-300"><strong>{user.followers.toLocaleString()}</strong> followers</span>
            <span className="text-gray-700 dark:text-slate-300"><strong>{user.following.toLocaleString()}</strong> following</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
