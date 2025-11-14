'use client';

import { useState } from 'react';

interface EmailSignupProps {
  source?: string;
  className?: string;
}

export default function EmailSignup({ source = 'general', className = '' }: EmailSignupProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Store in localStorage for now (in production, this would be an API call)
    try {
      const subscribers = JSON.parse(localStorage.getItem('email-subscribers') || '[]');

      // Check if already subscribed
      if (subscribers.some((sub: any) => sub.email === email)) {
        setError('This email is already subscribed');
        setLoading(false);
        return;
      }

      // Add new subscriber
      subscribers.push({
        email,
        source,
        timestamp: Date.now(),
      });

      localStorage.setItem('email-subscribers', JSON.stringify(subscribers));

      // Simulate API delay
      setTimeout(() => {
        setSuccess(true);
        setEmail('');
        setLoading(false);

        // Reset success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      }, 500);

      // In production, you would make an API call here:
      // const response = await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, source }),
      // });
      // if (!response.ok) throw new Error('Subscription failed');

    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center gap-2 text-green-800">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Successfully subscribed!</span>
        </div>
        <p className="text-sm text-green-700 mt-1">
          Check your inbox for a confirmation email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          disabled={loading}
          required
        />
        {error && (
          <p className="text-xs text-red-600 mt-1">{error}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Subscribing...' : 'Subscribe'}
      </button>

      <p className="text-xs text-gray-500">
        We'll send you updates about new content. Unsubscribe anytime.
      </p>
    </form>
  );
}
