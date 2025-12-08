
import React from 'react';
import * as Icons from 'lucide-react';

// FXInsight Logo: Blue/Cyan abstract ribbons/chart
export const FXInsightLogo: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="fx_grad1" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#0EA5E9" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
      <linearGradient id="fx_grad2" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#22D3EE" />
        <stop offset="100%" stopColor="#0EA5E9" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="20" fill="#F0F9FF" />
    <path d="M20 70 L45 45 L65 55 L85 20" stroke="url(#fx_grad1)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 70 L45 45 L65 55 L85 20 L85 90 L20 90 Z" fill="url(#fx_grad2)" opacity="0.2" />
    <path d="M30 80 L50 60 L60 65 L80 40" stroke="#06B6D4" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
  </svg>
);

// RetailBot Logo: Red/Pink abstract wave/mountain
export const RetailBotLogo: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="rb_grad" x1="50" y1="0" x2="50" y2="100">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#991B1B" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="20" fill="#FEF2F2" />
    <path d="M15 65 C 30 40, 40 40, 50 55 C 60 70, 70 30, 85 45 L 85 85 L 15 85 Z" fill="url(#rb_grad)" />
    <path d="M15 65 C 30 40, 40 40, 50 55 C 60 70, 70 30, 85 45" stroke="#FCA5A5" strokeWidth="2" fill="none" />
    <circle cx="70" cy="30" r="5" fill="#EF4444" />
  </svg>
);

// SecureEye Logo: Shield/Heart lines
export const SecureEyeLogo: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#F8FAFC" />
    <path d="M50 85 C 50 85, 20 70, 20 40 L 20 25 L 50 15 L 80 25 L 80 40 C 80 70, 50 85, 50 85 Z" stroke="#334155" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M50 25 V 75" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
    <path d="M30 40 H 70" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
    <path d="M50 45 C 40 45, 35 50, 35 60" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
    <path d="M50 45 C 60 45, 65 50, 65 60" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// RAILearnin Logo: Orange Arch R
export const RAILearninLogo: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#FFF7ED" />
    <path d="M25 80 V 45 C 25 25, 35 15, 50 15 C 65 15, 75 25, 75 45 V 80" stroke="#EA580C" strokeWidth="8" strokeLinecap="round" />
    <path d="M50 15 V 80" stroke="#EA580C" strokeWidth="8" strokeLinecap="round" opacity="0.3" />
    <path d="M50 50 L 75 80" stroke="#EA580C" strokeWidth="8" strokeLinecap="round" />
  </svg>
);

// PawSome Logo: Purple Paw
export const PawSomeLogo: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#FDF4FF" />
    <g transform="translate(15, 15) scale(0.7)">
      <circle cx="20" cy="30" r="10" fill="#E879F9" />
      <circle cx="50" cy="15" r="10" fill="#D946EF" />
      <circle cx="80" cy="30" r="10" fill="#E879F9" />
      <path d="M50 40 C 30 40, 15 55, 20 75 C 25 95, 45 95, 50 85 C 55 95, 75 95, 80 75 C 85 55, 70 40, 50 40 Z" fill="#D946EF" />
      <path d="M40 55 C 40 55, 35 65, 45 65 C 55 65, 60 60, 60 60" stroke="#FDF4FF" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8"/>
    </g>
  </svg>
);

// TubeGenius Logo: Orange Triangle Play Button
export const TubeGeniusLogo: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
     <defs>
      <linearGradient id="tg_grad" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#FB923C" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="20" fill="#FFF7ED" />
    <g transform="translate(20,20) scale(0.6)">
        <path d="M20 10 L 80 50 L 20 90 Z" fill="url(#tg_grad)" stroke="#C2410C" strokeWidth="4" strokeLinejoin="round"/>
        <circle cx="45" cy="50" r="12" fill="#FFF7ED" />
    </g>
  </svg>
);

// Course Architect: Pink App Icon with Pencil
export const CourseArchitectLogo: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="ca_grad" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#DB2777" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="25" fill="url(#ca_grad)" />
    <path d="M30 70 L 40 40 L 70 30" stroke="white" strokeWidth="6" strokeLinecap="round" />
    <path d="M30 70 L 45 65 L 35 55 Z" fill="white" />
    <circle cx="70" cy="30" r="5" fill="white" />
    <path d="M55 45 L 75 25" stroke="white" strokeWidth="4" opacity="0.5" />
  </svg>
);

// Revisionary: Orange Folded Ribbon
export const RevisionaryLogo: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#111827" />
    <path d="M30 30 H 70 V 70 H 30 Z" fill="#F97316" opacity="0.2" />
    <path d="M30 30 L 50 50 L 30 70 V 30 Z" fill="#EA580C" />
    <path d="M30 30 L 70 30 L 50 50 L 30 30 Z" fill="#FB923C" />
    <path d="M70 30 L 70 70 L 50 50 L 70 30 Z" fill="#F97316" opacity="0.8"/>
  </svg>
);

// NexusG Logo: Gradient Headphones
export const NexusGLogo: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="nexus_grad" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="20" fill="#F3F4F6" />
    <path d="M25 55 V 45 C 25 30, 35 20, 50 20 C 65 20, 75 30, 75 45 V 55" stroke="url(#nexus_grad)" strokeWidth="8" strokeLinecap="round" />
    <path d="M25 55 C 15 55, 15 75, 25 75 H 30 V 55 H 25 Z" fill="url(#nexus_grad)" />
    <path d="M75 55 C 85 55, 85 75, 75 75 H 70 V 55 H 75 Z" fill="url(#nexus_grad)" />
    <circle cx="50" cy="50" r="10" fill="url(#nexus_grad)" opacity="0.2" />
  </svg>
);

// CareBridge Logo: Purple Wordmark/Symbol
export const CareBridgeLogo: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#4F46E5" />
    <path d="M30 50 Q 50 20, 70 50 Q 50 80, 30 50" stroke="white" strokeWidth="4" fill="none" />
    <circle cx="50" cy="50" r="8" fill="white" />
    <path d="M50 20 V 30" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <path d="M50 70 V 80" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <path d="M20 50 H 30" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <path d="M70 50 H 80" stroke="white" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

// ApexRoute Logo: Black Box with Route
export const ApexRouteLogo: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#171717" />
    <path d="M30 70 L 50 30 L 70 70" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="50" cy="30" r="6" fill="#22C55E" />
    <circle cx="30" cy="70" r="6" fill="#EF4444" />
    <circle cx="70" cy="70" r="6" fill="#EF4444" />
  </svg>
);

// CARticle Logo: Blue S/Film Strip
export const CARticleLogo: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#E0F2FE" />
    <path d="M35 30 C 35 30, 65 30, 65 50 C 65 70, 35 70, 35 70" stroke="#0284C7" strokeWidth="12" strokeLinecap="round" />
    <path d="M35 30 C 35 30, 65 30, 65 50 C 65 70, 35 70, 35 70" stroke="#7DD3FC" strokeWidth="4" strokeLinecap="round" strokeDasharray="4 6" />
    <rect x="30" y="20" width="10" height="10" fill="#0284C7" />
    <rect x="30" y="70" width="10" height="10" fill="#0284C7" />
  </svg>
);

// VitalCare Logo: Purple Figure
export const VitalCareLogo: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#F3E8FF" />
    <circle cx="50" cy="35" r="8" fill="#9333EA" />
    <path d="M50 45 C 30 45, 30 75, 50 75 C 70 75, 70 45, 50 45 Z" fill="#A855F7" />
    <path d="M30 55 Q 50 85, 70 55" stroke="#9333EA" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M40 20 L 50 15 L 60 20" stroke="#9333EA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);


// Helper function to return the correct logo component based on solution ID
export const getSolutionLogo = (id: string, className?: string, iconName?: string) => {
  switch (id) {
    case 'fxinsight-ai': return <FXInsightLogo className={className} />;
    case 'retail-bot-pro': return <RetailBotLogo className={className} />;
    case 'secure-eye-africa': return <SecureEyeLogo className={className} />;
    case 'railearnin': return <RAILearninLogo className={className} />;
    case 'pawsome-picks': return <PawSomeLogo className={className} />;
    case 'tubegenius-ai': return <TubeGeniusLogo className={className} />;
    case 'ai-course-architect': return <CourseArchitectLogo className={className} />;
    case 'revisionary-ai': return <RevisionaryLogo className={className} />;
    case 'nexus-entertainment': return <NexusGLogo className={className} />;
    case 'carebridge-ai': return <CareBridgeLogo className={className} />;
    case 'apexroute-ai': return <ApexRouteLogo className={className} />;
    case 'ai-content-generator': return <CARticleLogo className={className} />;
    case 'vitalcare-health': return <VitalCareLogo className={className} />;
    default: 
      // Fallback to a generic icon if no specific logo is defined
      const LucideIcon = (Icons as any)[iconName || 'Box'] || Icons.Box;
      return <LucideIcon className={className} />;
  }
};
