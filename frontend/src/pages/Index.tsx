
import { useSocial } from "@/contexts/SocialContext";
import Header from "@/components/Header";
import Stories from "@/components/Stories";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import UserCard from "@/components/UserCard";
import TrendingSidebar from "@/components/TrendingSidebar";
import QuickActions from "@/components/QuickActions";
import Footer from "@/components/Footer";
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

const Index = () => {
  const { users } = useSocial();
  const { data: posts = [], isLoading: postsLoading, error: postsError } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await api.get('/posts');
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Hidden on mobile */}
          <div className="hidden lg:block space-y-6">
            <QuickActions />
            {/* People You May Know */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">People You May Know</h2>
              {users.slice(0, 3).map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </div>
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <Stories />
            <CreatePost />
            <div className="space-y-6">
              {postsLoading ? (
                <div>Loading posts...</div>
              ) : postsError ? (
                <div>Error loading posts.</div>
              ) : (
                posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))
              )}
            </div>
          </div>
          {/* Right Sidebar */}
          <div className="hidden lg:block">
            <TrendingSidebar />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
