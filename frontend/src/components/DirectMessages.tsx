
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Send, User } from 'lucide-react';
import { useSocial } from '@/contexts/SocialContext';

const DirectMessages = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { users, currentUser } = useSocial();

  const sendMessage = () => {
    if (!message.trim() || !selectedUser) return;
    
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: currentUser,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 social-gradient shadow-lg"
      >
        <MessageSquare className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold">Messages</h3>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>×</Button>
      </div>

      {!selectedUser ? (
        <div className="flex-1 p-4 overflow-y-auto">
          <h4 className="text-sm font-medium mb-3">Start a conversation</h4>
          {users.filter(u => u.id !== currentUser?.id).map(user => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
              </Avatar>
              <span className="text-sm">{user.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="p-3 border-b flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => setSelectedUser(null)}>←</Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
              <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
            </Avatar>
            <span className="font-medium">{selectedUser.name}</span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map(msg => (
              <div key={msg.id} className="mb-3">
                <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs ml-auto">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t flex space-x-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button size="sm" onClick={sendMessage}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

export default DirectMessages;
