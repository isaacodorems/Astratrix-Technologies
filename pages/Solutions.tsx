import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SOLUTIONS } from '../constants';
import * as Icons from 'lucide-react';

const Solutions: React.FC = () => {
  const categories = Array.from(new Set(SOLUTIONS.map(s => s.category)));

  return (
    <div className="animate-in fade-in duration-500 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
            Our Ecosystem
          </h1>
          <p className="text-xl text-gray-600">
            We provide end-to-end AI tools across automation, analytics, security, creator tools, EdTech, FinTech and more.
          </p>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <span key={cat} className="px-4 py-2 rounded-lg bg-white text-gray-700 text-sm border border-gray-200 shadow-sm font-medium">
              {cat}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SOLUTIONS.map((solution) => {
             const IconComponent = (Icons as any)[solution.iconName] || Icons.Box;

             return (
              <NavLink 
                to={`/solutions/${solution.id}`} 
                key={solution.id}
                className="group bg-white border border-gray-200 rounded-2xl p-8 hover:border-azure hover:shadow-lg transition-all duration-300 flex flex-col h-full shadow-sm"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-azure/10 rounded-xl text-azure group-hover:scale-110 transition-transform">
                    <IconComponent size={28} />
                  </div>
                  <ArrowUpRight className="text-gray-400 group-hover:text-azure transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">{solution.title}</h3>
                <p className="text-sm text-azure mb-4 uppercase tracking-wider font-semibold opacity-80">{solution.category}</p>
                <p className="text-gray-600 mb-6 flex-grow">{solution.shortDescription}</p>
                
                <div className="text-sm font-bold text-slate-900 group-hover:text-azure flex items-center gap-2 transition-colors mt-auto">
                  Learn more <ArrowUpRight className="h-4 w-4" />
                </div>
              </NavLink>
             );
          })}
        </div>
      </div>
    </div>
  );
};

export default Solutions;