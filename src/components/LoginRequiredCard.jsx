import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, LogIn, AlertCircle } from 'lucide-react';

export default function LoginRequiredCard({ 
  children, 
  title = "Authentication Required", 
  message = "Please sign in to access this form and submit your request securely." 
}) {
  const { user, loading, loginWithGoogle, logout } = useAuth();
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setIsLoggingIn(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user is NOT logged in, show the prompt
  if (!user) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center max-w-2xl mx-auto my-8">
        <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock size={32} />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-4">{title}</h3>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">{message}</p>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2 mb-6 max-w-md mx-auto text-left text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <button 
          onClick={handleLogin} 
          disabled={isLoggingIn}
          className="btn btn-primary inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoggingIn ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <LogIn size={20} />
              Sign in with Google
            </>
          )}
        </button>
      </div>
    );
  }

  // If user IS logged in, render the actual form (children)
  return (
    <div className="relative">
      {/* Small badge showing authenticated state */}
      <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6 flex items-center justify-between text-sm shadow-sm">
        <div className="flex items-center gap-3">
          {user.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full shadow-sm" />
          ) : (
            <div className="w-8 h-8 bg-green-200 text-green-800 rounded-full flex items-center justify-center font-bold">
              {user.email?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
          <div>
            <p className="font-semibold m-0 leading-tight">Signed in as {user.displayName || user.email}</p>
            <p className="text-xs text-green-700 m-0 opacity-80 mt-0.5">Your identity will be attached to this submission securely.</p>
          </div>
        </div>
        <button 
          onClick={logout} 
          className="text-green-700 hover:text-green-900 font-medium underline text-xs"
        >
          Not you? Sign out
        </button>
      </div>
      
      {/* The protected form */}
      {children}
    </div>
  );
}
