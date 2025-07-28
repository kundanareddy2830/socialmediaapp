
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Heart, MessageSquare, User } from 'lucide-react';
import { useSocial } from '@/contexts/SocialContext';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { users } = useSocial();

  const notifications = [
    {
      id: 1,
      type: 'like',
      user: users[1],
      message: 'liked your post',
      time: '2m ago',
      read: false
    },
    {
      id: 2,
      type: 'follow',
      user: users[2],
      message: 'started following you',
      time: '1h ago',
      read: false
    },
    {
      id: 3,
      type: 'comment',
      user: users[3],
      message: 'commented on your post',
      time: '3h ago',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="sm" 
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute top-full right-0 mt-2 w-80 max-h-96 overflow-y-auto z-50">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <div className="divide-y">
            {notifications.map(notification => (
              <div key={notification.id} className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                <div className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                    <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{notification.user.name}</span>
                      {' '}{notification.message}
                    </p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {notification.type === 'like' && <Heart className="w-4 h-4 text-red-500" />}
                    {notification.type === 'comment' && <MessageSquare className="w-4 h-4 text-blue-500" />}
                    {notification.type === 'follow' && <User className="w-4 h-4 text-green-500" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default NotificationCenter;
