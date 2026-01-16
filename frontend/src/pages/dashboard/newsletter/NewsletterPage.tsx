/**
 * Newsletter Subscribers Admin Page
 */
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { newsletterApi } from '@/services/api';
import { 
  Mail, 
  Download, 
  Search, 
  Filter,
  Calendar,
  TrendingUp,
  Users,
  UserCheck,
  UserX
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface Subscriber {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  is_active: boolean;
}

const NewsletterPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Fetch subscribers
  const { data: subscribers = [], isLoading, error } = useQuery<Subscriber[]>({
    queryKey: ['newsletter-subscribers', activeFilter, searchTerm],
    queryFn: async () => {
      const params: any = {};
      
      if (activeFilter === 'active') params.is_active = true;
      if (activeFilter === 'inactive') params.is_active = false;
      if (searchTerm) params.search = searchTerm;
      
      const response = await newsletterApi.list(params);
      return response.data;
    },
  });

  // Export to CSV
  const handleExport = async () => {
    try {
      const response = await newsletterApi.export();
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `newsletter_subscribers_${format(new Date(), 'yyyy-MM-dd')}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Export Successful', {
        description: 'Subscribers exported to CSV',
      });
    } catch (error) {
      toast.error('Export Failed', {
        description: 'Failed to export subscribers',
      });
    }
  };

  // Calculate stats
  const stats = {
    total: subscribers.length,
    active: subscribers.filter(s => s.is_active).length,
    inactive: subscribers.filter(s => !s.is_active).length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <Mail className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Newsletter Subscribers</h1>
        </div>
        <p className="text-gray-600">Manage your email newsletter subscribers</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Subscribers</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active</p>
              <p className="text-3xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Unsubscribed</p>
              <p className="text-3xl font-bold text-gray-600">{stats.inactive}</p>
            </div>
            <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <UserX className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by email or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeFilter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('active')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeFilter === 'active'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveFilter('inactive')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeFilter === 'inactive'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Unsubscribed
            </button>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600">
            Failed to load subscribers. Please try again.
          </div>
        ) : subscribers.length === 0 ? (
          <div className="p-12 text-center">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No subscribers found</p>
            <p className="text-gray-500 text-sm mt-2">
              {searchTerm ? 'Try a different search term' : 'Subscribers will appear here once they sign up'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subscriber
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subscribed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-semibold">
                            {subscriber.full_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {subscriber.full_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{subscriber.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {format(new Date(subscriber.created_at), 'MMM dd, yyyy')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {subscriber.is_active ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Unsubscribed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> Export the subscriber list to use with your email marketing platform (Mailchimp, SendGrid, etc.) or send newsletters manually via Gmail/Outlook.
        </p>
      </div>
    </div>
  );
};

export default NewsletterPage;
