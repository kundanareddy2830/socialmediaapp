
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 social-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SocialSpace
              </span>
            </div>
            <p className="text-gray-600 dark:text-slate-400 mb-4">
              Connect, share, and discover amazing content with people around the world.
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-slate-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>using Lovable</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">About</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Careers</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Press</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-slate-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-slate-400">
            © 2024 SocialSpace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
