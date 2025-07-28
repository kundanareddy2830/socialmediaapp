
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Heart, MessageSquare, Share, User, Bookmark, MoreHorizontal } from 'lucide-react';
import { Post } from '@/contexts/SocialContext';
import { useSocial } from '@/contexts/SocialContext';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { likePost, addComment, currentUser, bookmarkPost, sharePost, deletePost } = useSocial();

  const handleLike = () => {
    likePost(post.id);
  };

  const handleBookmark = () => {
    bookmarkPost(post.id);
  };

  const handleShare = () => {
    sharePost(post.id);
    navigator.clipboard.writeText(`Check out this post: ${post.content}`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
    }
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    addComment(post.id, commentText);
    setCommentText('');
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const isOwnPost = currentUser?.id === post.userId;

  return (
    <Card className="post-card">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Link to={`/profile/${post.user.id}`} className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.user.avatar} alt={post.user.name} />
              <AvatarFallback>
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-1">
                <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                {post.user.isVerified && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {post.user.username} • {formatTime(post.timestamp)}
                {post.isEdited && <span className="ml-1">(edited)</span>}
              </p>
            </div>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleBookmark}>
                {post.isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleShare}>Share</DropdownMenuItem>
              {isOwnPost && (
                <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                  Delete Post
                </DropdownMenuItem>
              )}
              {!isOwnPost && (
                <DropdownMenuItem className="text-red-600">Report</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mb-4">
          <p className="text-gray-800 leading-relaxed">{post.content}</p>
          {post.hashtags && post.hashtags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {post.hashtags.map((tag, index) => (
                <span key={index} className="text-blue-600 hover:underline cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          )}
          {post.image && (
            <div className="mt-4 rounded-xl overflow-hidden">
              <img 
                src={post.image} 
                alt="Post content" 
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between py-3 border-t border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex items-center space-x-2 ${post.isLiked ? 'text-red-500' : 'text-gray-600'} hover:text-red-500`}
          >
            <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
            <span>{post.likes}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
          >
            <MessageSquare className="w-5 h-5" />
            <span>{post.comments.length}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="flex items-center space-x-2 text-gray-600 hover:text-green-500"
          >
            <Share className="w-5 h-5" />
            <span>Share</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={`flex items-center space-x-2 ${post.isBookmarked ? 'text-yellow-500' : 'text-gray-600'} hover:text-yellow-500`}
          >
            <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {showComments && (
          <div className="border-t border-gray-100 pt-4 mt-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3 mb-4">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="font-semibold text-sm">{comment.user.name}</p>
                    <p className="text-gray-800">{comment.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{formatTime(comment.timestamp)}</p>
                </div>
              </div>
            ))}

            {currentUser && (
              <form onSubmit={handleComment} className="flex space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 flex space-x-2">
                  <Input
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="sm" disabled={!commentText.trim()}>
                    Post
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default PostCard;
