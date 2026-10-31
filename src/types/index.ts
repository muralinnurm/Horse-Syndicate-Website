export interface Horse {
  id: string;
  name: string;
  pedigree: {
    sire: string;
    dam: string;
    damsire: string;
  };
  age: string;
  gender: 'Colt' | 'Filly' | 'Gelding';
  color: string;
  stage: string;
  sharesAvailable: string;
  image: string;
  description: string;
  trainerLocation?: string;
  estimatedDebut?: string;
  highlights?: string[];
}

export interface EnquirySubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  horseInterest: string;
  shareInterest: string;
  message: string;
  submittedAt: string;
}

export interface SyndicateConfig {
  brandName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  location: string;
  instagram: string;
  twitter: string;
  linkedin: string;
}
