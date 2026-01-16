/**
 * Newsletter Unsubscribe Page
 * Handles unsubscribe requests from email links
 */
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';
import { useNewsletterUnsubscribe } from '@/hooks/newsletter.hooks';

const UnsubscribePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { mutate: unsubscribe, isPending, isSuccess, isError, error } = useNewsletterUnsubscribe();
  const [hasAttempted, setHasAttempted] = useState(false);

  useEffect(() => {
    if (token && !hasAttempted) {
      setHasAttempted(true);
      unsubscribe(token);
    }
  }, [token, hasAttempted, unsubscribe]);

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Unsubscribe Link</h1>
          <p className="text-gray-600 mb-6">
            This unsubscribe link is invalid or has expired. Please check your email for the correct link.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {isPending ? (
          <div className="text-center">
            <Loader2 className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Unsubscribing...</h1>
            <p className="text-gray-600">Please wait while we process your request.</p>
          </div>
        ) : isSuccess ? (
          <div className="text-center">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Successfully Unsubscribed</h1>
            <p className="text-gray-600 mb-6">
              You've been removed from our newsletter. You won't receive any more emails from us.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Changed your mind?</strong> You can always resubscribe by visiting our website and signing up again.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                to="/" 
                className="flex-1 inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors text-center"
              >
                Back to Home
              </Link>
              <Link 
                to="/shop" 
                className="flex-1 inline-block bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors text-center"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : isError ? (
          <div className="text-center">
            <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Unsubscribe Failed</h1>
            <p className="text-gray-600 mb-6">
              {(error as any)?.response?.data?.error || 
               'This link may be invalid, expired, or you may have already unsubscribed.'}
            </p>
            <div className="flex flex-col gap-3">
              <Link 
                to="/" 
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Back to Home
              </Link>
              <a 
                href="mailto:support@pentorax.com" 
                className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Contact Support
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UnsubscribePage;
