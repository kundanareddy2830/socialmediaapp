
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Users, Calendar, Settings } from 'lucide-react';

const QuickActions = () => {
  return (
    <Card className="p-4 dark:bg-slate-800/90 dark:border-slate-700/50">
      <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-4">Quick Actions</h3>
      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start dark:hover:bg-slate-700/50">
          <Plus className="w-4 h-4 mr-3" />
          Create Event
        </Button>
        <Button variant="ghost" className="w-full justify-start dark:hover:bg-slate-700/50">
          <Users className="w-4 h-4 mr-3" />
          Find Friends
        </Button>
        <Button variant="ghost" className="w-full justify-start dark:hover:bg-slate-700/50">
          <Calendar className="w-4 h-4 mr-3" />
          Schedule Post
        </Button>
        <Button variant="ghost" className="w-full justify-start dark:hover:bg-slate-700/50">
          <Settings className="w-4 h-4 mr-3" />
          Privacy Settings
        </Button>
      </div>
    </Card>
  );
};

export default QuickActions;
