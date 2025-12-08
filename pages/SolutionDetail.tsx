
import React from 'react';
import { useParams, Navigate, NavLink } from 'react-router-dom';
import { Check, ArrowRight, Download, Share2 } from 'lucide-react';
import { SOLUTIONS } from '../constants';
import { getSolutionLogo } from '../components/SolutionLogos';

const SolutionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const solution = SOLUTIONS.find(s => s.id === id);

  if (!solution) {
    return <Navigate to="/solutions" replace />;
  }

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-slate-50 border-b border-gray-200 pt-32 pb-20 px-4">
        {/* Blurred Background Logo Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03] pointer-events-none grayscale">
           {getSolutionLogo(solution.id, "w-full h-full", solution.iconName)}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Main App Icon */}
            <div className="w-40 h-40 rounded-3xl overflow-hidden shadow-2xl border-4 border-white flex-shrink-0">
               {getSolutionLogo(solution.id, "w-full h-full", solution.iconName)}
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-2">
                {solution.title}
              </h1>
              <p className="text-azure font-bold tracking-wide uppercase mb-4 text-sm">{solution.category}</p>
              
              <p className="text-xl text-gray-600 max-w-2xl mb-6">
                {solution.shortDescription}
              </p>

              <div className="flex items-center justify-center md:justify-start gap-4">
                 <NavLink 
                    to="/contact" 
                    className="px-8 py-3 bg-azure text-white rounded-full font-bold hover:bg-ocean transition-all shadow-lg shadow-azure/30 hover:-translate-y-1 flex items-center gap-2"
                  >
                    Get {solution.title}
                    <Download className="h-4 w-4" />
                 </NavLink>
                 <button className="p-3 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-azure hover:border-azure transition-colors">
                    <Share2 className="h-5 w-5" />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Description</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {solution.fullDescription}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Features</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {solution.features.map((feature, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 p-4 rounded-xl flex items-start gap-3 shadow-sm">
                    <div className="bg-azure/10 p-1 rounded-full">
                      <Check className="h-4 w-4 text-azure" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Benefits</h2>
              <div className="space-y-4">
                {solution.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-4 border-l-2 border-azure pl-6 py-2">
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Information</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Provider</span>
                  <span className="text-slate-900 font-medium">Astratrix Tech</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Category</span>
                  <span className="text-slate-900 font-medium">{solution.category}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Rating</span>
                  <span className="text-slate-900 font-medium">{solution.rating} / 5.0</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Downloads</span>
                  <span className="text-slate-900 font-medium">{solution.downloads}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Use Cases</h3>
              <ul className="space-y-3">
                {solution.useCases.map((useCase, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-azure"></span>
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-azure/20 to-transparent p-[1px] rounded-2xl shadow-sm">
              <div className="bg-white rounded-2xl p-8 text-center border border-azure/20">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Ready to Integrate?</h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Get started with {solution.title} today and transform your workflow.
                </p>
                <NavLink 
                  to="/contact" 
                  className="block w-full py-3 bg-azure text-white rounded-lg font-bold hover:bg-ocean transition-colors shadow-lg shadow-azure/20"
                >
                  Try {solution.title}
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionDetail;
