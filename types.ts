// Fix: Import React to resolve the 'React' namespace for the ReactNode type
import React from 'react';

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface CaseStudy {
  category: string;
  title: string;
  description: string;
  stats: {
    label: string;
    value: string;
  }[];
  imageUrl: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
}