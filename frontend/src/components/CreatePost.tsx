
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Camera } from 'lucide-react';
import { useSocial } from '@/contexts/SocialContext';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from './ImageUpload';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [showImageUpload, setShowImageUpload] = useState(false);
  const { currentUser, createPost } = useSocial();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !selectedImage) return;
    
    createPost(content, selectedImage);
    setContent('');
    setSelectedImage(undefined);
    setShowImageUpload(false);
    toast({
      title: "Post created!",
      description: "Your post has been shared successfully.",
    });
  };

  if (!currentUser) return null;

  return (
    <Card className="p-6 post-card">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>
              <User className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-4">
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] border-0 resize-none text-lg placeholder:text-gray-400 focus-visible:ring-0"
            />
            
            {showImageUpload && (
              <ImageUpload
                onImageSelect={setSelectedImage}
                selectedImage={selectedImage}
                onRemoveImage={() => setSelectedImage(undefined)}
              />
            )}
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowImageUpload(!showImageUpload)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Photo
                </Button>
                
                <div className="text-sm text-gray-500">
                  {content.length}/280
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={(!content.trim() && !selectedImage) || content.length > 280}
                className="social-gradient hover:opacity-90 transition-opacity"
              >
                Share Post
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default CreatePost;
