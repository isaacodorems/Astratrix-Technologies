import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Bot, Globe, Shield, Activity, BarChart, Smartphone } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-azure/5 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-azure/10 border border-azure/20">
            <span className="text-azure text-sm font-semibold tracking-wide uppercase">Powering Africa's Future</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 leading-tight mb-8">
            AI Solutions Built for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-azure to-ocean">
              African Businesses
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
            We help organizations—especially offline and traditional businesses—unlock growth with modern AI tools, automation, analytics, and education.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NavLink 
              to="/contact" 
              className="w-full sm:w-auto px-8 py-4 bg-azure text-white rounded-full font-bold text-lg hover:bg-ocean transition-all transform hover:scale-105 shadow-lg shadow-azure/30"
            >
              Get a Free Consultation
            </NavLink>
            <NavLink 
              to="/solutions" 
              className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-slate-900 rounded-full font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              Explore Our AI Tools
              <ArrowRight className="h-5 w-5" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 bg-seagreen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">What We Do</h2>
            <div className="h-1 w-20 bg-azure mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Bot />} 
              title="AI Automation" 
              desc="Streamline operations and gain deep insights from your data automatically." 
            />
            <FeatureCard 
              icon={<Globe />} 
              title="Digital Presence" 
              desc="Helping offline businesses establish and manage a powerful digital footprint." 
            />
            <FeatureCard 
              icon={<Shield />} 
              title="Security & Surveillance" 
              desc="Smart monitoring systems that protect your assets around the clock." 
            />
            <FeatureCard 
              icon={<Activity />} 
              title="Creator Automation" 
              desc="Tools to help content creators grow audiences and manage production." 
            />
            <FeatureCard 
              icon={<Smartphone />} 
              title="Health & EdTech" 
              desc="Accessible AI systems for clinics and schools, even in remote areas." 
            />
            <FeatureCard 
              icon={<BarChart />} 
              title="Predictive Analytics" 
              desc="Forecast market trends and customer behaviors with high accuracy." 
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-8">
                Why Businesses <br/> Choose Us
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                We understand the unique challenges of the African market. Our solutions aren't just copy-pasted from Silicon Valley; they are engineered for local realities.
              </p>
              
              <div className="space-y-4">
                <CheckItem text="Built for African business realities" />
                <CheckItem text="Tools that work online + offline" />
                <CheckItem text="Fast deployment & minimal downtime" />
                <CheckItem text="Secure, enterprise-grade systems" />
                <CheckItem text="Affordable, scalable pricing models" />
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-azure/20 blur-[100px] -z-10 rounded-full" />
              <div className="bg-gradient-to-br from-gray-100 to-transparent p-1 rounded-2xl border border-gray-100 shadow-xl">
                <div className="bg-white/90 backdrop-blur-xl rounded-xl p-8 border border-gray-100">
                   <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                         <div className="h-12 w-12 bg-azure/10 rounded-full flex items-center justify-center text-azure font-bold text-xl">1</div>
                         <div>
                            <h4 className="text-slate-900 font-bold">Offline First</h4>
                            <p className="text-sm text-gray-500">Low bandwidth? No power? No problem.</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                         <div className="h-12 w-12 bg-azure/10 rounded-full flex items-center justify-center text-azure font-bold text-xl">2</div>
                         <div>
                            <h4 className="text-slate-900 font-bold">Local Support</h4>
                            <p className="text-sm text-gray-500">Support teams based in Port Harcourt & Lagos.</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="h-12 w-12 bg-azure/10 rounded-full flex items-center justify-center text-azure font-bold text-xl">3</div>
                         <div>
                            <h4 className="text-slate-900 font-bold">Simple UI</h4>
                            <p className="text-sm text-gray-500">No coding skills required. Ever.</p>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-white border border-gray-200 p-8 rounded-2xl hover:border-azure/50 hover:shadow-lg transition-all duration-300 group shadow-sm">
    <div className="h-12 w-12 bg-azure/10 rounded-xl flex items-center justify-center text-azure mb-6 group-hover:bg-azure group-hover:text-white transition-colors duration-300">
      {React.cloneElement(icon as React.ReactElement, { size: 24 } as any)}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

const CheckItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center gap-3">
    <CheckCircle2 className="text-azure h-5 w-5 flex-shrink-0" />
    <span className="text-gray-700">{text}</span>
  </div>
);

export default Home;