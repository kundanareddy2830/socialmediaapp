
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, User } from 'lucide-react';
import { useSocial } from '@/contexts/SocialContext';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { users, posts } = useSocial();

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search users, posts, hashtags..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowResults(e.target.value.length > 0);
          }}
          className="pl-10"
          onFocus={() => setShowResults(searchQuery.length > 0)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
        />
      </div>

      {showResults && (
        <Card className="absolute top-full mt-2 w-full z-50 max-h-96 overflow-y-auto">
          <div className="p-4">
            {filteredUsers.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-sm text-gray-600 mb-2">Users</h3>
                {filteredUsers.slice(0, 5).map(user => (
                  <Link key={user.id} to={`/profile/${user.id}`} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.username}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {filteredPosts.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm text-gray-600 mb-2">Posts</h3>
                {filteredPosts.slice(0, 3).map(post => (
                  <div key={post.id} className="p-2 hover:bg-gray-50 rounded-lg">
                    <p className="text-sm truncate">{post.content}</p>
                    <p className="text-xs text-gray-500">by {post.user.name}</p>
                  </div>
                ))}
              </div>
            )}

            {filteredUsers.length === 0 && filteredPosts.length === 0 && (
              <p className="text-gray-500 text-sm">No results found</p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default SearchBar;
