
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-12 text-center">
          Building the <span className="text-azure">Intelligent Future</span> of Africa
        </h1>

        <div className="space-y-16">
          {/* Who We Are with Image */}
          <section className="bg-seagreen p-8 md:p-12 rounded-3xl border border-gray-200 shadow-sm">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                   <h2 className="text-3xl font-bold text-slate-900 mb-6">Who We Are</h2>
                   <p className="text-lg text-gray-600 leading-relaxed mb-6">
                     We are a Nigerian AI startup building affordable, accessible, and practical AI tools designed for real business use. From small shops to large enterprises, we empower people to automate tasks, improve decision-making, and grow their business—no technical skills required.
                   </p>
                   <p className="text-lg text-gray-600 leading-relaxed">
                     Headquartered in Port Harcourt, our team of engineers, data scientists, and local business experts works tirelessly to bridge the digital divide.
                   </p>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white h-full max-h-[400px]">
                    <img 
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                        alt="Astratrix Team" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
          </section>

          {/* Mission & Vision Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-azure/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-azure/10 transition-colors"></div>
              <h2 className="text-2xl font-bold text-azure mb-4">Our Mission</h2>
              <p className="text-gray-600 text-lg relative z-10">
                To make AI adoption simple for businesses without online presence and to accelerate Africa’s transition into intelligent digital economies.
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-ocean/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-ocean/10 transition-colors"></div>
              <h2 className="text-2xl font-bold text-azure mb-4">Our Vision</h2>
              <p className="text-gray-600 text-lg relative z-10">
                A future where every business in Nigeria and Africa can leverage AI, no matter their size or technical background.
              </p>
            </div>
          </div>

          {/* Values */}
          <section className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Our Core Values</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['Innovation', 'Integrity', 'Simplicity', 'Security', 'Customer Success'].map((val) => (
                <span key={val} className="px-8 py-4 rounded-full bg-white border border-gray-200 text-slate-700 font-bold hover:border-azure hover:text-azure hover:shadow-md transition-all cursor-default">
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
