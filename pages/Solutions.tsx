
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Star, Search } from 'lucide-react';
import { SOLUTIONS } from '../constants';
import { getSolutionLogo } from '../components/SolutionLogos';

// IDs of apps to feature in the carousel
const FEATURED_APP_IDS = [
  'railearnin', 
  'retail-bot-pro', 
  'vitalcare-health', 
  'fxinsight-ai', 
  'nexus-entertainment'
];

const Solutions: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const categories = ['All', ...Array.from(new Set(SOLUTIONS.map(s => s.category)))];

  const filteredSolutions = activeCategory === 'All' 
    ? SOLUTIONS 
    : SOLUTIONS.filter(s => s.category === activeCategory);

  // Carousel Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setFeaturedIndex((prev) => (prev + 1) % FEATURED_APP_IDS.length);
        setIsAnimating(false);
      }, 300); // Wait for fade out before switching
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const featuredSolution = SOLUTIONS.find(s => s.id === FEATURED_APP_IDS[featuredIndex]) || SOLUTIONS[0];

  const getGradient = (id: string) => {
    switch (id) {
      case 'railearnin': return 'from-orange-500 to-red-600';
      case 'retail-bot-pro': return 'from-red-500 to-rose-600';
      case 'vitalcare-health': return 'from-emerald-400 to-teal-600';
      case 'fxinsight-ai': return 'from-blue-600 to-cyan-500';
      case 'nexus-entertainment': return 'from-violet-600 to-fuchsia-600';
      default: return 'from-slate-700 to-slate-900';
    }
  };

  return (
    <div className="animate-in fade-in duration-500 bg-white min-h-screen">
      
      {/* App Store Header */}
      <div className="border-b border-gray-100 bg-white/80 backdrop-blur-xl sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-display font-bold text-slate-900">Astratrix Store</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search apps, tools & services" 
                className="bg-slate-100 border-none rounded-lg pl-10 pr-4 py-2 text-sm w-full md:w-64 focus:ring-2 focus:ring-azure/20 text-slate-900"
              />
            </div>
          </div>
          
          {/* Categories Tab Bar */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured App Carousel */}
        {activeCategory === 'All' && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4 px-1">
               <h2 className="text-xl font-bold text-slate-900">Featured Apps</h2>
               <div className="flex gap-1">
                 {FEATURED_APP_IDS.map((_, idx) => (
                   <div 
                     key={idx} 
                     className={`h-1.5 rounded-full transition-all duration-300 ${idx === featuredIndex ? 'w-6 bg-slate-900' : 'w-1.5 bg-gray-300'}`} 
                   />
                 ))}
               </div>
            </div>

            <NavLink 
              to={`/solutions/${featuredSolution.id}`} 
              className="block relative h-80 rounded-3xl overflow-hidden group shadow-lg transition-all duration-500"
            >
               {/* Animated Background Gradient */}
               <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(featuredSolution.id)} transition-opacity duration-500`}></div>
               
               {/* Background Logo Watermark */}
               <div className={`absolute -right-20 -bottom-20 w-96 h-96 opacity-10 transform rotate-12 transition-all duration-500 scale-100 group-hover:scale-110 group-hover:opacity-20`}>
                 {getSolutionLogo(featuredSolution.id, "w-full h-full", featuredSolution.iconName)}
               </div>

               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
               
               {/* Content with Fade Transition */}
               <div className={`absolute bottom-0 left-0 p-8 text-white transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                 <div className="flex items-center gap-4 mb-3">
                   {/* Small Icon next to title */}
                   <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg border border-white/20">
                      {getSolutionLogo(featuredSolution.id, "w-full h-full", featuredSolution.iconName)}
                   </div>
                   <span className="text-xs font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                      {featuredSolution.category}
                   </span>
                 </div>
                 <h3 className="text-4xl font-bold mb-2">{featuredSolution.title}</h3>
                 <p className="text-lg text-white/90 max-w-lg line-clamp-2">
                    {featuredSolution.fullDescription}
                 </p>
               </div>
            </NavLink>
          </div>
        )}

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {filteredSolutions.map((solution) => (
            <div 
              key={solution.id} 
              className="flex gap-4 p-4 rounded-3xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-gray-100"
            >
              {/* App Icon */}
              <NavLink to={`/solutions/${solution.id}`} className="flex-shrink-0 w-28 h-28 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {getSolutionLogo(solution.id, "w-full h-full", solution.iconName)}
              </NavLink>

              {/* App Details */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start">
                    <NavLink to={`/solutions/${solution.id}`}>
                      <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1">{solution.title}</h3>
                      <p className="text-xs text-gray-500 font-medium">{solution.category}</p>
                    </NavLink>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-2 leading-relaxed">
                    {solution.shortDescription}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                   {/* Rating */}
                   <div className="flex items-center gap-1">
                     <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill={i < Math.floor(solution.rating || 5) ? "currentColor" : "none"} strokeWidth={i < Math.floor(solution.rating || 5) ? 0 : 2} />
                        ))}
                     </div>
                     <span className="text-xs text-gray-400">({solution.reviews})</span>
                   </div>

                   {/* Get Button */}
                   <NavLink 
                     to={`/solutions/${solution.id}`} 
                     className="bg-slate-100 hover:bg-slate-200 text-azure font-bold text-xs px-5 py-1.5 rounded-full transition-colors uppercase tracking-wide"
                   >
                     GET
                   </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Solutions;
