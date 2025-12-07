import { Solution, BlogPost, FaqItem, NavItem } from './types';
import { 
  Bot, 
  Store, 
  ShieldCheck, 
  Video, 
  Stethoscope, 
  BarChart3, 
  Cpu, 
  Globe 
} from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Solutions', path: '/solutions' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
  { label: 'FAQ', path: '/faq' },
];

export const SOLUTIONS: Solution[] = [
  {
    id: 'fxinsight-ai',
    title: 'FXInsight AI',
    category: 'Finance & Trading',
    shortDescription: 'Professional Forex Analysis Powered by AI.',
    fullDescription: 'FXInsight AI leverages deep learning algorithms to analyze global currency markets in real-time. It processes millions of data points including news sentiment, historical price action, and economic indicators to provide actionable trading insights for African traders and financial institutions.',
    features: [
      'Real-time Market Sentiment Analysis',
      'Automated Support & Resistance Detection',
      'Economic Calendar Impact Prediction'
    ],
    benefits: [
      'Reduce emotional trading errors',
      'Save hours of manual chart analysis',
      'Access institutional-grade data'
    ],
    useCases: ['Forex Traders', 'Financial Analysts', 'Investment Firms'],
    iconName: 'BarChart3'
  },
  {
    id: 'retail-bot-pro',
    title: 'RetailBot Pro',
    category: 'Automation & Analytics',
    shortDescription: 'Inventory and customer management for offline shops.',
    fullDescription: 'Designed specifically for Nigerian retail environments with intermittent internet. RetailBot Pro tracks stock levels via camera input, predicts restock needs, and manages customer debts and loyalty programs automatically.',
    features: [
      'Offline-first architecture',
      'Visual inventory tracking',
      'WhatsApp integration for customer receipts'
    ],
    benefits: [
      'Reduce theft and shrinkage',
      'Never run out of best-selling items',
      'Modernize customer experience'
    ],
    useCases: ['Supermarkets', 'Pharmacies', 'Hardware Stores'],
    iconName: 'Store'
  },
  {
    id: 'secure-eye-africa',
    title: 'SecureEye Africa',
    category: 'Security & Surveillance',
    shortDescription: 'AI-powered surveillance for low-light conditions.',
    fullDescription: 'Enhance your existing CCTV systems with AI that detects unusual behavior, unauthorized access, and safety hazards. Optimized for low-light performance common in areas with power challenges.',
    features: [
      'Behavioral Anomaly Detection',
      'License Plate Recognition',
      'Instant SMS Alerts'
    ],
    benefits: [
      'Proactive security monitoring',
      'Reduced need for 24/7 human guard attention',
      'Evidence-ready reporting'
    ],
    useCases: ['Estates', 'Warehouses', 'Corporate Offices'],
    iconName: 'ShieldCheck'
  },
  {
    id: 'creator-studio-ai',
    title: 'Creator Studio AI',
    category: 'Media & Creator Tools',
    shortDescription: 'Automate content creation and YouTube growth.',
    fullDescription: 'Helping African creators compete globally. This tool automates video editing, generates localized captions, and optimizes thumbnails for higher click-through rates.',
    features: [
      'Auto-Edit Silence Removal',
      'Multi-language Caption Generator',
      'Trend Prediction Engine'
    ],
    benefits: [
      'Produce content 5x faster',
      'Reach global audiences with translation',
      'Data-driven topic selection'
    ],
    useCases: ['YouTubers', 'Influencers', 'Digital Marketers'],
    iconName: 'Video'
  },
  {
    id: 'med-assist-local',
    title: 'MedAssist Local',
    category: 'Healthcare Solutions',
    shortDescription: 'Diagnostic support for rural clinics.',
    fullDescription: 'An AI assistant for healthcare workers in remote areas. Input symptoms and basic vitals to get triage recommendations and possible diagnoses based on local epidemiological data.',
    features: [
      'Works via SMS/USSD fallback',
      'Local language support',
      'Offline medical database'
    ],
    benefits: [
      'Faster patient triage',
      'Standardized care protocols',
      'Continuous learning resource for nurses'
    ],
    useCases: ['Rural Clinics', 'Pharmacies', 'Telehealth Providers'],
    iconName: 'Stethoscope'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Why Nigerian Businesses Without Online Presence Need AI in 2025',
    excerpt: 'The digital divide is shrinking. Learn how AI tools are now designed to work offline and boost your physical store operations.',
    date: 'Oct 12, 2024',
    category: 'Business Strategy'
  },
  {
    id: '2',
    title: 'How AI Helps Small African Businesses Save Time and Money',
    excerpt: 'Automation isn\'t just for big tech. Discover simple tools that automate bookkeeping, inventory, and customer follow-ups.',
    date: 'Oct 15, 2024',
    category: 'Automation'
  },
  {
    id: '3',
    title: 'Best AI Tools for Retail Shops in Nigeria',
    excerpt: 'A curated list of affordable AI solutions that integrate with local payment gateways and operational styles.',
    date: 'Oct 19, 2024',
    category: 'Tools & Reviews'
  },
  {
    id: '4',
    title: 'AI Trends Transforming Africa',
    excerpt: 'From FinTech to AgriTech, see how artificial intelligence is solving unique continental challenges.',
    date: 'Oct 22, 2024',
    category: 'Trends'
  }
];

export const FAQS: FaqItem[] = [
  {
    question: 'Do you build custom AI solutions?',
    answer: 'Yes, we specialize in tailoring AI tools for specific business needs, whether you are an SME needing a simple bot or an enterprise requiring complex predictive analytics.'
  },
  {
    question: 'Can offline businesses use your tools?',
    answer: 'Absolutely. A core part of our mission is to serve the "offline economy". Many of our solutions utilize edge computing, SMS interfaces, or offline-first mobile apps to ensure you get value regardless of internet connectivity.'
  },
  {
    question: 'How affordable are these solutions?',
    answer: 'We operate on a tiered pricing model designed for the African market. We have starter packages for small businesses and comprehensive suites for larger organizations.'
  },
  {
    question: 'Do I need technical skills to use Astratrix tools?',
    answer: 'No. Our user interfaces are built for simplicity. If you can use WhatsApp or a basic POS system, you can use our AI tools.'
  }
];
