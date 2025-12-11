
import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { 
  AIAutomationLogo, 
  DigitalPresenceLogo, 
  SecuritySurveillanceLogo, 
  CreatorAutomationLogo, 
  HealthEdTechLogo, 
  PredictiveAnalyticsLogo 
} from '../components/SolutionLogos';

// Simple hook for intersection observer
const useOnScreen = (ref: React.RefObject<HTMLElement>) => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger only once
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return isIntersecting;
};

// Component for scroll-triggered animations
const FadeInWhenVisible: React.FC<{ children: React.ReactNode, delay?: number }> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-azure/5 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/4" />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left z-10">
              <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-azure/10 border border-azure/20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="text-azure text-sm font-semibold tracking-wide uppercase">Powering Africa's Future</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 leading-tight mb-8 tracking-tight animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
                AI Solutions Built for <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-azure to-ocean">
                  African Businesses
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                We help organizations—especially offline and traditional businesses—unlock growth with modern AI tools, automation, analytics, and education.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
                <NavLink 
                  to="/contact" 
                  className="w-full sm:w-auto px-8 py-4 bg-azure text-white rounded-full font-bold text-lg hover:bg-ocean transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-azure/40 flex justify-center items-center group"
                >
                  Get a Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </NavLink>
                <NavLink 
                  to="/solutions" 
                  className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-slate-900 rounded-full font-bold text-lg hover:bg-gray-50 hover:border-azure/30 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-lg hover:scale-105"
                >
                  Explore Our AI Tools
                </NavLink>
              </div>
            </div>

            {/* Hero Image with Parallax */}
            <div className="relative hidden lg:block h-[600px] w-full">
              <div 
                className="absolute inset-0 bg-azure/20 rounded-[2.5rem] transform rotate-6 scale-95 blur-2xl transition-transform duration-100"
                style={{ transform: `rotate(6deg) translateY(${scrollY * 0.05}px)` }}
              ></div>
              <div 
                className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/50 h-full w-full transform transition-transform duration-100 ease-out"
                style={{ transform: `translateY(${scrollY * 0.1}px)` }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000" 
                  alt="Futuristic AI Technology Node" 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 text-white z-20">
                   <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                      <p className="text-xs font-mono uppercase tracking-widest text-green-400">System Online</p>
                   </div>
                   <p className="font-display font-bold text-3xl">Next-Gen Intelligence</p>
                   <p className="text-sm opacity-90 mt-1 max-w-xs text-gray-300">Deploying neural networks to the edge.</p>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div 
                className="absolute -bottom-10 -left-10 bg-white p-5 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-4 animate-bounce z-30" 
                style={{ animationDuration: '4s' }}
              >
                 <div className="bg-azure/10 p-3 rounded-xl">
                    <CheckCircle2 className="h-8 w-8 text-azure" />
                 </div>
                 <div>
                    <p className="font-bold text-slate-900 text-lg">Offline Ready</p>
                    <p className="text-sm text-gray-500">Works without internet</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 bg-seagreen relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">What We Do</h2>
            <div className="h-1.5 w-24 bg-azure mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
               Comprehensive technology solutions designed to bridge the digital divide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<AIAutomationLogo className="w-12 h-12" />} 
              title="AI Automation" 
              desc="Streamline operations and gain deep insights from your data automatically."
              delay={0}
            />
            <FeatureCard 
              icon={<DigitalPresenceLogo className="w-12 h-12" />} 
              title="Digital Presence" 
              desc="Helping offline businesses establish and manage a powerful digital footprint."
              delay={100}
            />
            <FeatureCard 
              icon={<SecuritySurveillanceLogo className="w-12 h-12" />} 
              title="Security & Surveillance" 
              desc="Smart monitoring systems that protect your assets around the clock."
              delay={200}
            />
            <FeatureCard 
              icon={<CreatorAutomationLogo className="w-12 h-12" />} 
              title="Creator Automation" 
              desc="Tools to help content creators grow audiences and manage production."
              delay={300}
            />
            <FeatureCard 
              icon={<HealthEdTechLogo className="w-12 h-12" />} 
              title="Health & EdTech" 
              desc="Accessible AI systems for clinics and schools, even in remote areas."
              delay={400}
            />
            <FeatureCard 
              icon={<PredictiveAnalyticsLogo className="w-12 h-12" />} 
              title="Predictive Analytics" 
              desc="Forecast market trends and customer behaviors with high accuracy."
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <FadeInWhenVisible>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-8 leading-tight">
                  Why Businesses <br/> <span className="text-azure">Choose Astratrix</span>
                </h2>
              </FadeInWhenVisible>
              
              <FadeInWhenVisible delay={100}>
                <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                  We understand the unique challenges of the African market. Our solutions aren't just copy-pasted from Silicon Valley; they are engineered for local realities like intermittent power and data constraints.
                </p>
              </FadeInWhenVisible>
              
              <div className="space-y-6">
                <FadeInWhenVisible delay={200}><CheckItem text="Built for African business realities" /></FadeInWhenVisible>
                <FadeInWhenVisible delay={300}><CheckItem text="Tools that work online + offline" /></FadeInWhenVisible>
                <FadeInWhenVisible delay={400}><CheckItem text="Fast deployment & minimal downtime" /></FadeInWhenVisible>
                <FadeInWhenVisible delay={500}><CheckItem text="Secure, enterprise-grade systems" /></FadeInWhenVisible>
                <FadeInWhenVisible delay={600}><CheckItem text="Affordable, scalable pricing models" /></FadeInWhenVisible>
              </div>
            </div>
            
            <div className="relative order-1 lg:order-2">
              <div className="absolute inset-0 bg-azure/20 blur-[100px] -z-10 rounded-full" />
              
              {/* Visual Grid of Benefits */}
              <div className="grid grid-cols-2 gap-6">
                  <FadeInWhenVisible delay={200}>
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center text-2xl mb-4 shadow-sm">⚡</div>
                        <h4 className="font-bold text-slate-900 text-lg">Fast Deploy</h4>
                        <p className="text-sm text-gray-500 mt-1">Up in 48 hours</p>
                    </div>
                  </FadeInWhenVisible>
                  
                  <FadeInWhenVisible delay={300}>
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 mt-12">
                        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-2xl mb-4 shadow-sm">📶</div>
                        <h4 className="font-bold text-slate-900 text-lg">Offline Mode</h4>
                        <p className="text-sm text-gray-500 mt-1">No internet needed</p>
                    </div>
                  </FadeInWhenVisible>

                  <FadeInWhenVisible delay={400}>
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-2xl mb-4 shadow-sm">🛡️</div>
                        <h4 className="font-bold text-slate-900 text-lg">Secure</h4>
                        <p className="text-sm text-gray-500 mt-1">Enterprise grade</p>
                    </div>
                  </FadeInWhenVisible>

                  <FadeInWhenVisible delay={500}>
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 mt-12">
                        <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-2xl mb-4 shadow-sm">🤝</div>
                        <h4 className="font-bold text-slate-900 text-lg">Local</h4>
                        <p className="text-sm text-gray-500 mt-1">Support in NG</p>
                    </div>
                  </FadeInWhenVisible>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, desc: string, delay: number }> = ({ icon, title, desc, delay }) => (
  <FadeInWhenVisible delay={delay}>
    <div className="bg-white border border-gray-200 p-8 rounded-[2rem] hover:border-azure/30 hover:shadow-2xl hover:shadow-azure/10 transition-all duration-300 group shadow-sm flex flex-col items-center text-center md:items-start md:text-left h-full">
      <div className="h-20 w-20 bg-azure/5 rounded-2xl flex items-center justify-center text-azure mb-8 group-hover:bg-azure/10 group-hover:scale-110 transition-all duration-300 p-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-azure transition-colors">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-base">{desc}</p>
    </div>
  </FadeInWhenVisible>
);

const CheckItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center gap-4 group cursor-default">
    <div className="bg-azure/10 p-1.5 rounded-full group-hover:bg-azure group-hover:text-white transition-colors duration-300">
       <CheckCircle2 className="text-azure h-5 w-5 flex-shrink-0 group-hover:text-white transition-colors" />
    </div>
    <span className="text-gray-700 font-medium text-lg group-hover:text-slate-900 transition-colors">{text}</span>
  </div>
);

export default Home;
