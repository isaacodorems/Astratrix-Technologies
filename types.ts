export interface Solution {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  useCases: string[];
  iconName: string; // Linking to Lucide icons by name
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  path: string;
}