'use client';

import { useState, useEffect } from 'react';

interface Subscriber {
  email: string;
  source: string;
  timestamp: number;
}

export default function SubscriberManager() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [broadcastSubject, setBroadcastSubject] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = () => {
    const stored = localStorage.getItem('email-subscribers');
    if (stored) {
      setSubscribers(JSON.parse(stored));
    }
  };

  const handleExport = () => {
    const csv = ['Email,Source,Date\n'];
    subscribers.forEach((sub) => {
      csv.push(`${sub.email},${sub.source},${new Date(sub.timestamp).toLocaleDateString()}\n`);
    });

    const blob = new Blob(csv, { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${Date.now()}.csv`;
    a.click();
  };

  const handleSendBroadcast = () => {
    if (!broadcastSubject || !broadcastMessage) {
      alert('Please enter subject and message');
      return;
    }

    setSending(true);

    // In production, this would be an API call to your email service
    setTimeout(() => {
      alert(`Broadcast sent to ${subscribers.length} subscribers!`);
      setBroadcastSubject('');
      setBroadcastMessage('');
      setSending(false);
    }, 1000);
  };

  const handleDelete = (email: string) => {
    if (confirm(`Delete subscriber ${email}?`)) {
      const updated = subscribers.filter(sub => sub.email !== email);
      setSubscribers(updated);
      localStorage.setItem('email-subscribers', JSON.stringify(updated));
    }
  };

  const filteredSubscribers = filter === 'all'
    ? subscribers
    : subscribers.filter(sub => sub.source === filter);

  const sources = Array.from(new Set(subscribers.map(sub => sub.source)));

  return (
    <div className="space-y-6">
      {/* Broadcast Email */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Send Broadcast Email</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              value={broadcastSubject}
              onChange={(e) => setBroadcastSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Email subject line"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Compose your message to subscribers..."
            />
          </div>

          <button
            onClick={handleSendBroadcast}
            disabled={sending}
            className="btn-primary disabled:opacity-50"
          >
            {sending ? 'Sending...' : `Send to ${subscribers.length} Subscribers`}
          </button>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> In production, integrate with an email service like SendGrid,
              Mailchimp, or AWS SES for actual email delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Subscriber List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">
            Subscribers ({filteredSubscribers.length})
          </h2>
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Sources</option>
              {sources.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium"
            >
              Export CSV
            </button>
          </div>
        </div>

        {subscribers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No subscribers yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Source</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.map((subscriber, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{subscriber.email}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded text-xs">
                        {subscriber.source}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(subscriber.timestamp).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDelete(subscriber.email)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
