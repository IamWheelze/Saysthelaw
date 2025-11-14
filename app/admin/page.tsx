'use client';

import { useState, useEffect } from 'react';
import ContentEditor from '@/components/admin/ContentEditor';
import SubscriberManager from '@/components/admin/SubscriberManager';
import ImageUploader from '@/components/admin/ImageUploader';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'content' | 'subscribers' | 'images' | 'stats'>('content');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem('admin-auth');
    if (auth === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password protection (in production, use proper authentication)
    if (password === 'saysthelaw2024') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin-auth', 'authenticated');
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin-auth');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button type="submit" className="w-full btn-primary">
              Login
            </button>
            <p className="text-xs text-gray-500 mt-4">
              Demo password: saysthelaw2024
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="container-custom">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('content')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'content'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Content Editor
            </button>
            <button
              onClick={() => setActiveTab('images')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'images'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Images
            </button>
            <button
              onClick={() => setActiveTab('subscribers')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'subscribers'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Subscribers
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'stats'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Statistics
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container-custom py-8">
        {activeTab === 'content' && <ContentEditor />}
        {activeTab === 'images' && <ImageUploader />}
        {activeTab === 'subscribers' && <SubscriberManager />}
        {activeTab === 'stats' && <StatsView />}
      </div>
    </div>
  );
}

function StatsView() {
  const [stats, setStats] = useState({
    subscribers: 0,
    comments: 0,
    articles: 0,
  });

  useEffect(() => {
    // Load stats from localStorage
    const subscribers = JSON.parse(localStorage.getItem('email-subscribers') || '[]');
    const allComments = Object.keys(localStorage)
      .filter(key => key.startsWith('comments-'))
      .reduce((total, key) => {
        const comments = JSON.parse(localStorage.getItem(key) || '[]');
        return total + comments.length;
      }, 0);

    setStats({
      subscribers: subscribers.length,
      comments: allComments,
      articles: 5, // Sample count
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Platform Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {stats.subscribers}
          </div>
          <div className="text-gray-600">Email Subscribers</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {stats.comments}
          </div>
          <div className="text-gray-600">Total Comments</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {stats.articles}
          </div>
          <div className="text-gray-600">Published Articles</div>
        </div>
      </div>
    </div>
  );
}
