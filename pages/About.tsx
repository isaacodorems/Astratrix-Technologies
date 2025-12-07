import React from 'react';

const About: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-12 text-center">
          Building the <span className="text-azure">Intelligent Future</span> of Africa
        </h1>

        <div className="space-y-16">
          {/* Who We Are */}
          <section className="bg-seagreen p-8 md:p-12 rounded-3xl border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Who We Are</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We are a Nigerian AI startup building affordable, accessible, and practical AI tools designed for real business use. From small shops to large enterprises, we empower people to automate tasks, improve decision-making, and grow their business—no technical skills required.
            </p>
          </section>

          {/* Mission & Vision Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-azure mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To make AI adoption simple for businesses without online presence and to accelerate Africa’s transition into intelligent digital economies.
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-azure mb-4">Our Vision</h2>
              <p className="text-gray-600">
                A future where every business in Nigeria and Africa can leverage AI, no matter their size or technical background.
              </p>
            </div>
          </div>

          {/* Values */}
          <section className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Our Core Values</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['Innovation', 'Integrity', 'Simplicity', 'Security', 'Customer Success'].map((val) => (
                <span key={val} className="px-6 py-3 rounded-full bg-white border border-gray-200 text-slate-700 font-medium hover:border-azure hover:text-azure transition-colors shadow-sm">
                  {val}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;