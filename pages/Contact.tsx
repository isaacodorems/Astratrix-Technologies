import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setStatus('success');
    // Reset after 5 seconds
    setTimeout(() => {
      setStatus('idle');
      setFormData({ name: '', email: '', message: '' });
    }, 5000);
  };

  return (
    <div className="animate-in fade-in duration-500 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-16 text-center">
          Get in Touch
        </h1>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Office Address</h2>
              <div className="flex items-start gap-4">
                <div className="bg-azure/10 p-3 rounded-xl text-azure">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg text-gray-600">26 Health Center Road</p>
                  <p className="text-lg text-gray-600">Okuru, Port Harcourt, Nigeria</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Phone</h3>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="h-5 w-5 text-azure" />
                  <span>+234 800 ASTRATRIX</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Email</h3>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="h-5 w-5 text-azure" />
                  <span>hello@astratrix.cc</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-gray-200 h-64 flex items-center justify-center text-gray-500">
              <p>[Map Placeholder: Port Harcourt, Nigeria]</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-xl shadow-gray-200/50">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h2>
            
            {status === 'success' ? (
              <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-azure/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="h-8 w-8 text-azure" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600 max-w-sm">
                  Thank you for contacting Astratrix. Your message has been successfully delivered. 
                </p>
                <div className="mt-4 px-4 py-2 bg-azure/5 rounded-full border border-azure/10">
                   <p className="text-azure text-sm font-medium">Estimated response time: 2-4 hours</p>
                </div>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-sm text-gray-500 hover:text-azure transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-50 border border-gray-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-azure focus:ring-1 focus:ring-azure transition-all placeholder:text-gray-400"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-50 border border-gray-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-azure focus:ring-1 focus:ring-azure transition-all placeholder:text-gray-400"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-slate-50 border border-gray-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-azure focus:ring-1 focus:ring-azure transition-all placeholder:text-gray-400"
                    placeholder="How can we help?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-azure text-white py-4 rounded-lg font-bold text-lg hover:bg-ocean transition-all flex items-center justify-center gap-2 shadow-lg shadow-azure/20"
                >
                  Send Message <Send className="h-5 w-5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;