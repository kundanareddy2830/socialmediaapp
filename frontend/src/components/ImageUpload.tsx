
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, X } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (imageUrl: string) => void;
  selectedImage?: string;
  onRemoveImage: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, selectedImage, onRemoveImage }) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const sampleImages = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=200&fit=crop'
  ];

  return (
    <div className="space-y-4">
      {selectedImage ? (
        <div className="relative">
          <img src={selectedImage} alt="Selected" className="w-full h-48 object-cover rounded-lg" />
          <Button
            onClick={onRemoveImage}
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <Card className="p-4 border-dashed border-2 border-gray-300">
          <div className="text-center">
            <Camera className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-4">Add an image to your post</p>
            
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Button
                onClick={() => document.getElementById('image-upload')?.click()}
                variant="outline"
                size="sm"
              >
                Upload Image
              </Button>
              
              <div className="text-xs text-gray-500 mb-2">Or choose from samples:</div>
              <div className="grid grid-cols-2 gap-2">
                {sampleImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Sample ${index + 1}`}
                    className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
                    onClick={() => onImageSelect(img)}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ImageUpload;
