
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import LiveIndicator from '@/components/LiveIndicator';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User as UserIcon, MapPin, Calendar, Link as LinkIcon, Shield } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import { getCurrentUserId, logout } from '../lib/auth';
import { useSocial } from '../contexts/SocialContext';

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { users: mockUsers } = useSocial();

  // Try to fetch from backend
  const { data: userData, isLoading, error } = useQuery({
    queryKey: ['user-profile', userId],
    queryFn: async () => {
      const { data } = await api.get(`/users/id/${userId}`);
      return data;
    },
    enabled: !!userId,
    retry: false,
  });

  // Fallback to mock data if backend fails
  let user = userData;
  if ((error || !userData) && userId) {
    user = mockUsers.find(u => u.id === userId);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div>Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">User not found</h1>
          </div>
        </div>
      </div>
    );
  }

  const userPosts = user.posts || [];
  const currentUserId = getCurrentUserId();
  const isCurrentUser = currentUserId && user.id === currentUserId;

  const handleFollow = () => {
    // Implement follow/unfollow logic with backend mutation
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="post-card p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <Avatar className="w-32 h-32 avatar-ring">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="dark:bg-slate-700">
                  <UserIcon className="w-16 h-16" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2">
                <LiveIndicator isOnline={user.isOnline} size="lg" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">{user.name}</h1>
                  {user.isVerified && (
                    <Shield className="w-6 h-6 text-blue-500" />
                  )}
                </div>
                {/* Follow/Unfollow and Edit Profile Buttons */}
                {!isCurrentUser && (
                  <Button
                    onClick={handleFollow}
                    variant={user.isFollowing ? "outline" : "default"}
                    className={user.isFollowing ? "border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950" : "social-gradient"}
                  >
                    {user.isFollowing ? 'Following' : 'Follow'}
                  </Button>
                )}
                {isCurrentUser && (
                  <>
                    <Link to="/edit-profile">
                      <Button className="ml-4 social-gradient">Edit Profile</Button>
                    </Link>
                    <Button className="ml-4" variant="outline" onClick={handleLogout}>Logout</Button>
                  </>
                )}
              </div>
              <p className="text-gray-600 dark:text-slate-400 text-lg mb-4">{user.username}</p>
              <p className="text-gray-700 dark:text-slate-300 mb-6">{user.bio}</p>
              {/* Additional Profile Info */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500 dark:text-slate-400">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined March 2023</span>
                </div>
                <div className="flex items-center space-x-1">
                  <LinkIcon className="w-4 h-4" />
                  <span className="text-blue-600 hover:underline cursor-pointer">yourwebsite.com</span>
                </div>
              </div>
              <div className="flex justify-center md:justify-start space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{userPosts.length}</div>
                  <div className="text-gray-600 dark:text-slate-400">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{user.followersCount ?? user.followers}</div>
                  <div className="text-gray-600 dark:text-slate-400">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{user.followingCount ?? user.following}</div>
                  <div className="text-gray-600 dark:text-slate-400">Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* User Posts */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
            {isCurrentUser ? 'Your Posts' : `${user.name}'s Posts`}
          </h2>
          {userPosts.length > 0 ? (
            <div className="space-y-6">
              {userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="post-card p-8 text-center">
              <p className="text-gray-500 dark:text-slate-400 text-lg">
                {isCurrentUser ? "You haven't posted anything yet!" : `${user.name} hasn't posted anything yet.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
