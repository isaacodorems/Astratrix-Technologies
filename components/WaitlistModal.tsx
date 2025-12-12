
import React, { useState } from 'react';
import { X, CheckCircle, Bell } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  appName: string;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose, appName }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this email to your backend here
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
       {/* Modal Content */}
       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative overflow-hidden animate-in zoom-in-95 duration-200">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">You're on the list for {appName}!</h3>
              <p className="text-gray-600">We'll notify you as soon as it's ready for early access.</p>
              <button 
                onClick={onClose} 
                className="mt-6 text-azure font-bold hover:text-ocean hover:underline transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 bg-azure/10 text-azure rounded-xl flex items-center justify-center mb-4">
                <Bell className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{appName} is Coming Soon</h2>
              <p className="text-gray-600 mb-6">
                This solution will be available soon. Register to be amongst the first set of people to use the app.
              </p>
              
              <form onSubmit={handleSubmit}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-azure focus:border-azure outline-none transition-all mb-4 text-slate-900"
                />
                <button type="submit" className="w-full bg-azure text-white font-bold py-3 rounded-lg hover:bg-ocean transition-colors shadow-lg shadow-azure/20">
                  Join Waitlist
                </button>
              </form>
            </>
          )}
       </div>
    </div>
  );
};

export default WaitlistModal;
