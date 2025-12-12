
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
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
      }, 500); // Transition duration
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const featuredSolution = SOLUTIONS.find(s => s.id === FEATURED_APP_IDS[featuredIndex]) || SOLUTIONS[0];

  const getGradient = (id: string) => {
    switch (id) {
      case 'railearnin': return 'from-orange-600/90 to-red-700/90';
      case 'retail-bot-pro': return 'from-red-600/90 to-rose-700/90';
      case 'vitalcare-health': return 'from-emerald-500/90 to-teal-700/90';
      case 'fxinsight-ai': return 'from-blue-600/90 to-cyan-600/90';
      case 'nexus-entertainment': return 'from-violet-600/90 to-fuchsia-700/90';
      default: return 'from-slate-700/90 to-slate-900/90';
    }
  };

  return (
    <div className="animate-in fade-in duration-500 bg-white min-h-screen">
      
      {/* App Store Header */}
      <div className="border-b border-gray-100 bg-white/80 backdrop-blur-xl sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Astratrix Store</h1>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-azure transition-colors" />
              <input 
                type="text" 
                placeholder="Search apps, tools & services" 
                className="bg-slate-100 border-none rounded-full pl-10 pr-4 py-2.5 text-sm w-full md:w-72 focus:ring-2 focus:ring-azure/20 focus:bg-white transition-all shadow-inner"
              />
            </div>
          </div>
          
          {/* Categories Tab Bar */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-slate-900 text-white shadow-lg transform scale-105' 
                    : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
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
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6 px-1">
               <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Featured Today</h2>
               <div className="flex gap-1.5">
                 {FEATURED_APP_IDS.map((_, idx) => (
                   <div 
                     key={idx} 
                     className={`h-1.5 rounded-full transition-all duration-500 ${idx === featuredIndex ? 'w-8 bg-slate-900' : 'w-1.5 bg-gray-200'}`} 
                   />
                 ))}
               </div>
            </div>

            <NavLink 
              to={`/solutions/${featuredSolution.id}`} 
              className="block relative h-[420px] rounded-[2rem] overflow-hidden group shadow-2xl transition-all duration-500 hover:shadow-3xl transform hover:-translate-y-1"
            >
               {/* Background Image Layer */}
               <div 
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-105 group-hover:scale-100 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
                  style={{ backgroundImage: `url(${featuredSolution.featureImage})` }}
               />

               {/* Gradient Overlay Layer */}
               <div className={`absolute inset-0 bg-gradient-to-r ${getGradient(featuredSolution.id)} mix-blend-multiply opacity-90 transition-opacity duration-500`}></div>
               
               {/* Text Protection Gradient */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

               {/* Background Logo Watermark */}
               <div className={`absolute -right-20 -bottom-20 w-96 h-96 opacity-10 transform rotate-12 transition-all duration-700 scale-100 group-hover:scale-110 group-hover:opacity-20`}>
                 {getSolutionLogo(featuredSolution.id, "w-full h-full", featuredSolution.iconName)}
               </div>
               
               {/* Content with Fade Transition */}
               <div className={`absolute bottom-0 left-0 p-10 text-white transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                 <div className="flex items-center gap-5 mb-5">
                   {/* App Icon */}
                   <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-white/10 backdrop-blur-md">
                      {getSolutionLogo(featuredSolution.id, "w-full h-full", featuredSolution.iconName)}
                   </div>
                   <div className="flex flex-col items-start gap-2">
                     <span className="text-xs font-bold uppercase tracking-[0.2em] bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                        {featuredSolution.category}
                     </span>
                   </div>
                 </div>
                 <h3 className="text-5xl font-display font-bold mb-3 leading-tight tracking-tight">{featuredSolution.title}</h3>
                 <p className="text-lg text-white/90 max-w-xl line-clamp-2 font-medium leading-relaxed">
                    {featuredSolution.fullDescription}
                 </p>
                 <div className="mt-6 flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    View Details <ArrowRight className="w-4 h-4" />
                 </div>
               </div>
            </NavLink>
          </div>
        )}

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {filteredSolutions.map((solution) => (
            <div 
              key={solution.id} 
              className="flex gap-5 p-5 rounded-[2rem] hover:bg-slate-50 transition-all duration-300 group border border-transparent hover:border-gray-100 hover:shadow-lg"
            >
              {/* App Icon */}
              <NavLink to={`/solutions/${solution.id}`} className="flex-shrink-0 w-24 h-24 rounded-[1.2rem] overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                {getSolutionLogo(solution.id, "w-full h-full", solution.iconName)}
              </NavLink>

              {/* App Details */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start">
                    <NavLink to={`/solutions/${solution.id}`}>
                      <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1 group-hover:text-azure transition-colors">{solution.title}</h3>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{solution.category}</p>
                    </NavLink>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-2 leading-relaxed">
                    {solution.shortDescription}
                  </p>
                </div>

                <div className="flex items-center justify-end mt-4">
                   {/* View Details Button */}
                   <NavLink 
                     to={`/solutions/${solution.id}`}
                     className="bg-slate-100 hover:bg-azure hover:text-white text-azure font-bold text-xs px-6 py-2 rounded-full transition-all uppercase tracking-wider shadow-sm hover:shadow-md"
                   >
                     View
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
