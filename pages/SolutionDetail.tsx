import React from 'react';
import { useParams, Navigate, NavLink } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { SOLUTIONS } from '../constants';

const SolutionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const solution = SOLUTIONS.find(s => s.id === id);

  if (!solution) {
    return <Navigate to="/solutions" replace />;
  }

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="bg-seagreen border-b border-gray-200 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-azure font-bold tracking-wide uppercase mb-4 block">{solution.category}</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6">
            {solution.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {solution.shortDescription}
          </p>
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