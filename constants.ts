import { Solution, BlogPost, FaqItem, NavItem } from './types';

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
    id: 'railearnin',
    title: 'RAILearnin',
    category: 'Education Technology',
    shortDescription: 'Hybrid AI-powered learning platform.',
    fullDescription: 'A hybrid AI-powered learning platform combining the best of Coursera, Udemy, and YouTube Learning. RAILearnin aggregates high-quality resources into structured learning paths tailored to your pace and goals.',
    features: [
      'Cross-platform Content Aggregation',
      'AI-generated Learning Paths',
      'Interactive Progress Quizzes'
    ],
    benefits: [
      'Access diverse learning materials in one place',
      'Personalized education adapted to your speed',
      'Cost-effective skill acquisition'
    ],
    useCases: ['Students', 'Career Switchers', 'Self-taught Developers'],
    iconName: 'GraduationCap'
  },
  {
    id: 'pawsome-picks',
    title: 'PawSome Picks',
    category: 'E-commerce & Lifestyle',
    shortDescription: 'AI shopping assistant for pet owners.',
    fullDescription: 'A delightful e-commerce store for pet owners featuring an AI shopping assistant. It helps find the perfect treats, toys, and care products for your furry friends based on their breed, age, and dietary requirements.',
    features: [
      'Breed-Specific Product Matching',
      'Dietary Requirement Filters',
      'AI Gift Finder'
    ],
    benefits: [
      'Discover healthy products faster',
      'Personalized shopping experience',
      'Reduce trial-and-error with pet food'
    ],
    useCases: ['Pet Owners', 'Veterinary Clinics', 'Pet Boutiques'],
    iconName: 'Dog'
  },
  {
    id: 'tubegenius-ai',
    title: 'TubeGenius AI',
    category: 'Media & Creator Tools',
    shortDescription: 'Faceless YouTube automation assistant.',
    fullDescription: 'A comprehensive faceless YouTube automation assistant that generates scripts, SEO metadata, thumbnails, and content strategies in seconds. Designed to help creators scale their channels without being on camera.',
    features: [
      'Instant Script Generation',
      'Thumbnail Concept Designer',
      'SEO Tag & Title Optimization'
    ],
    benefits: [
      'Launch channels in record time',
      'Consistent content production',
      'Data-driven topic selection'
    ],
    useCases: ['Faceless Content Creators', 'Digital Marketers', 'Agencies'],
    iconName: 'Clapperboard'
  },
  {
    id: 'ai-course-architect',
    title: 'AI Course Architect',
    category: 'Education Technology',
    shortDescription: 'Transform documents into course outlines.',
    fullDescription: 'An AI-powered tool that transforms documents, videos, or images into comprehensive and engaging course outlines. Upload your material, and the AI will generate a structured curriculum with learning objectives, key concepts, interactive quizzes, and a final assessment.',
    features: [
      'Document-to-Curriculum Converter',
      'Automatic Quiz Generation',
      'Learning Objective Mapping'
    ],
    benefits: [
      'Save weeks of course planning time',
      'Standardized educational quality',
      'Instantly turn raw content into lessons'
    ],
    useCases: ['Teachers', 'Corporate Trainers', 'Course Creators'],
    iconName: 'BookOpen'
  },
  {
    id: 'revisionary-ai',
    title: 'Revisionary AI',
    category: 'Business Strategy',
    shortDescription: 'AI-powered innovation strategist.',
    fullDescription: 'An AI-powered innovation strategist that researches industries, identifies key problems, and proposes cutting-edge AI solutions. It helps businesses stay ahead of the curve by identifying disruption opportunities before competitors do.',
    features: [
      'Industry Trend Analysis',
      'Problem-Solution Mapping',
      'Innovation Roadmap Generation'
    ],
    benefits: [
      'Identify new revenue streams',
      'Stay ahead of market disruptions',
      'Data-driven strategic planning'
    ],
    useCases: ['Startups', 'Business Consultants', 'R&D Departments'],
    iconName: 'Lightbulb'
  },
  {
    id: 'nexus-entertainment',
    title: 'Nexus Entertainment Generator',
    category: 'Entertainment & Creative',
    shortDescription: 'AI-driven entertainment concept generator.',
    fullDescription: 'A powerful AI-driven tool that fuses unexpected activities, spaces, and equipment into groundbreaking entertainment business concepts. Perfect for event planners and entrepreneurs looking for the next big thing in leisure.',
    features: [
      'Concept Fusion Engine',
      'Venue & Equipment Matching',
      'Experience Blueprinting'
    ],
    benefits: [
      'Create unique market differentiators',
      'Rapid brainstorming of event ideas',
      'Novel business model generation'
    ],
    useCases: ['Event Planners', 'Theme Park Designers', 'Entrepreneurs'],
    iconName: 'Sparkles'
  },
  {
    id: 'carebridge-ai',
    title: 'CareBridge AI',
    category: 'Healthcare Solutions',
    shortDescription: 'AI-augmented telehealth platform.',
    fullDescription: 'A secure, AI-augmented telehealth platform expanding access to quality care across Nigeria. It connects patients with doctors and uses AI triage to prioritize critical cases and assist with preliminary diagnosis.',
    features: [
      'AI Symptom Triage',
      'Secure Video Consultations',
      'Digital Health Record Management'
    ],
    benefits: [
      'Access to doctors from remote areas',
      'Reduced waiting times',
      'Lower healthcare costs'
    ],
    useCases: ['Rural Clinics', 'Patients', 'Health Providers'],
    iconName: 'Heart'
  },
  {
    id: 'apexroute-ai',
    title: 'ApexRoute AI',
    category: 'Logistics & Operations',
    shortDescription: 'Enterprise-grade logistics optimization.',
    fullDescription: 'Enterprise-grade logistics optimization platform for Nigeria featuring AI-driven route planning, fleet management, and real-time analytics. Optimizes delivery routes based on local traffic patterns and road conditions.',
    features: [
      'Smart Route Optimization',
      'Fleet Maintenance Prediction',
      'Real-time Delivery Tracking'
    ],
    benefits: [
      'Reduce fuel consumption',
      'Improve delivery timeliness',
      'Maximize fleet utilization'
    ],
    useCases: ['Logistics Companies', 'Delivery Fleets', 'Supply Chain Managers'],
    iconName: 'MapPin'
  },
  {
    id: 'ai-content-generator',
    title: 'AI Content & Article Generator',
    category: 'Media & Creator Tools',
    shortDescription: 'Transform documents into engaging content.',
    fullDescription: 'An AI-powered application that transforms document text into engaging social media content or well-researched, long-form articles with cited sources. Streamlines the content marketing workflow for businesses and writers.',
    features: [
      'Document-to-Social Converter',
      'Long-form Article Writer',
      'Source Citation Manager'
    ],
    benefits: [
      'Repurpose existing content easily',
      'Maintain consistent posting schedules',
      'High-quality, researched output'
    ],
    useCases: ['Content Marketers', 'Writers', 'Social Media Managers'],
    iconName: 'FileText'
  },
  {
    id: 'vitalcare-health',
    title: 'VitalCare Health & Wellness App',
    category: 'Healthcare Solutions',
    shortDescription: 'Personalized health & supplement recommendations.',
    fullDescription: 'A comprehensive health and wellness application that monitors user health data and provides personalized VitalCare supplement recommendations powered by Gemini. Tracks vitals and suggests lifestyle changes for better living.',
    features: [
      'Personalized Supplement Plans',
      'Health Vitals Tracking',
      'AI Wellness Coaching'
    ],
    benefits: [
      'Tailored health advice',
      'Proactive wellness management',
      'Data-driven supplement choices'
    ],
    useCases: ['Individuals', 'Wellness Coaches', 'Nutritionists'],
    iconName: 'Activity'
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