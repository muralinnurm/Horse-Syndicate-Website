import { Horse, SyndicateConfig } from '../types';

export const initialSyndicateConfig: SyndicateConfig = {
  brandName: 'ELYSIAN',
  tagline: 'Thoroughbred Racing Syndicate',
  contactEmail: 'enquiries@elysianracing.com',
  contactPhone: '+1 (859) 428-7900',
  location: 'Lexington & Saratoga Springs',
  instagram: 'https://instagram.com',
  twitter: 'https://x.com',
  linkedin: 'https://linkedin.com',
};

export const syndicateImages = {
  hero: '/src/assets/images/hero_thoroughbred_gallop_1793444660502.jpg',
  aboutPortrait: '/src/assets/images/about_thoroughbred_portrait_1793444660550.jpg',
  coltConformation: '/src/assets/images/horse_prospect_colt_1793444661159.jpg',
  fillyGallop: '/src/assets/images/horse_prospect_filly_1793444662460.jpg',
  morningTrackwork: '/src/assets/images/experience_morning_trackwork_1793444662045.jpg',
  enquiryAtmosphere: '/src/assets/images/enquiry_equine_atmosphere_1793444678938.jpg',
};

export const upcomingHorses: Horse[] = [
  {
    id: 'horse-01',
    name: '2YO Chestnut Colt',
    pedigree: {
      sire: 'Curated Sire Line',
      dam: 'Stakes-Placed Dam',
      damsire: 'Championship Broodmare Sire',
    },
    age: '2 Years Old',
    gender: 'Colt',
    color: 'Rich Chestnut',
    stage: 'In Early Pre-Training',
    sharesAvailable: 'Limited Shares Available (2.5% – 10%)',
    image: syndicateImages.coltConformation,
    description:
      'An imposing physical specimen possessing fluid movement, balance, and athletic conformation. Currently undergoing foundational education with an emphasis on natural gate development and stamina.',
    trainerLocation: 'Premier Training Facility',
    estimatedDebut: 'Autumn 2-Year-Old Season',
    highlights: [
      'Athletic build with strong gaskins and deep shoulder',
      'Naturally balanced stride observed during early paddock gallops',
      'Eligible for premier sales incentive race series',
    ],
  },
  {
    id: 'horse-02',
    name: '2YO Dark Bay Filly',
    pedigree: {
      sire: 'Proven Classic Sire',
      dam: 'Group-Producing Dam',
      damsire: 'International Turf Influence',
    },
    age: '2 Years Old',
    gender: 'Filly',
    color: 'Dark Bay / Brown',
    stage: 'Spelling & Education',
    sharesAvailable: 'Expressions of Interest Open',
    image: syndicateImages.fillyGallop,
    description:
      'An exceptionally sharp, alert filly displaying natural speed and poise. Raised on rich limestone pastures, she exhibits the quintessential temperament sought in modern turf prospects.',
    trainerLocation: 'Metropolitan Training Complex',
    estimatedDebut: 'Targeting Spring Juvenile Programme',
    highlights: [
      'High cruising speed and smooth galloping action',
      'Deep female pedigree with proven black-type runners',
      'Excellent trainable temperament reported by breaking team',
    ],
  },
  {
    id: 'horse-03',
    name: 'Upcoming Yearling Prospect',
    pedigree: {
      sire: 'Selection in Progress',
      dam: 'Curated Bloodline',
      damsire: 'Foundation Broodmare Sire',
    },
    age: 'Yearling (2025 Crop)',
    gender: 'Colt',
    color: 'Bay',
    stage: 'Bloodstock Inspection Phase',
    sharesAvailable: 'Priority Syndicate Waitlist',
    image: syndicateImages.morningTrackwork,
    description:
      'Our bloodstock advisory team is currently inspecting yearlings across the marquee sales. Members of the priority waitlist receive first access to veterinary x-rays, scope reports, and share allocation.',
    trainerLocation: 'Selection Pending Final Allocation',
    estimatedDebut: 'Following 2YO Intake',
    highlights: [
      'Rigorous physical and radiographic vetting protocol',
      'Capped syndicate numbers to ensure intimate ownership experience',
      'Fixed transparent pre-training & training fee structure',
    ],
  },
];
