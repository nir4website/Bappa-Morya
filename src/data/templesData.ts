import uploadedSiddhivinayakImg from '../assets/images/siddhivinayak_darshan_1787407465421.jpg';
import dagadushethImg from '../assets/images/dagadusheth_pune_1787480048878.jpg';
import brassGanapatiImg from '../assets/images/brass_ganapati_idol_1789210694979.jpg';
import divineGaneshImg from '../assets/images/divine_ganesh_murti_1789210710553.jpg';
import panchdhatuGaneshImg from '../assets/images/panchdhatu_ganesh_1789210724692.jpg';
import { GanapatiTemple } from '../types.ts';

export interface HeroImageChoice {
  id: string;
  name: string;
  nameMr: string;
  tag: string;
  url: string;
  caption: string;
}

export const HERO_CHOICES: HeroImageChoice[] = [
  {
    id: 'brass-pooja',
    name: 'Antique Brass Ganapati (पितळी गणपती)',
    nameMr: 'पारंपरिक पितळी गणपती मूर्ती',
    tag: 'Household Brass',
    url: brassGanapatiImg,
    caption: 'Devghar Pooja Brass Murti with Hibiscus & Diya'
  },
  {
    id: 'panchdhatu-mandir',
    name: 'Panchdhatu Mandir Idol (पंचधातू)',
    nameMr: 'पंचधातू गणेश मूर्ती',
    tag: 'Panchdhatu Metal',
    url: panchdhatuGaneshImg,
    caption: 'Sacred Sanctum Panchdhatu Antique Brass Murti'
  },
  {
    id: 'divine-utsav',
    name: 'Divine Utsav Murti (उत्सव मूर्ती)',
    nameMr: 'दिव्य गणेश उत्सव मूर्ती',
    tag: 'Festival Idol',
    url: divineGaneshImg,
    caption: 'Majestic Festival Ganesha Adorned in Flowers'
  },
  {
    id: 'siddhivinayak-mumbai',
    name: 'Shree Siddhivinayak (सिद्धिविनायक)',
    nameMr: 'श्री सिद्धिविनायक मुंबई दर्शन',
    tag: 'Temple Darshan',
    url: uploadedSiddhivinayakImg,
    caption: 'Sacred Prabhadevi Navasacha Ganapati'
  },
  {
    id: 'dagadusheth-pune',
    name: 'Dagadusheth Halwai (दगडूशेठ पुणे)',
    nameMr: 'श्रीमंत दगडूशेठ हलवाई पुणे',
    tag: 'Pune Sovereign',
    url: dagadushethImg,
    caption: 'Golden Shreemant Dagadusheth Halwai Ganapati'
  }
];

export const HERO_GANAPATI_IMAGE = brassGanapatiImg;

export const FAMOUS_TEMPLES: GanapatiTemple[] = [
  {
    id: 'siddhivinayak-mumbai',
    name: 'श्री सिद्धिविनायक गणपती (मुंबई)',
    nameEn: 'Shree Siddhivinayak Temple (Mumbai)',
    location: 'Prabhadevi, Mumbai',
    district: 'Mumbai City',
    description: 'One of the most revered and sacred pilgrimage centers in India. The sanctum houses the magnificent self-originated saffron stone idol with a right-sided trunk (Navasacha Ganapati), flanked by Goddesses Riddhi and Siddhi, fulfilling the heartfelt wishes of millions of devotees.',
    historicalSignificance: 'Originally consecrated on 19 November 1801 by Laxman Vithu and funded by Deubai Patil. Millions of pilgrims offer worship every Tuesday and during Angarki Sankashti Chaturthi.',
    image: uploadedSiddhivinayakImg,
    imageAlt: 'Shree Siddhivinayak Ganapati Prabhadevi Mumbai',
    downloadFilename: 'siddhivinayak-ganapati-prabhadevi-mumbai.jpg',
    category: 'famous'
  },
  {
    id: 'dagadusheth-pune',
    name: 'श्रीमंत दगडूशेठ हलवाई गणपती (पुणे)',
    nameEn: 'Shreemant Dagadusheth Halwai Ganapati (Pune)',
    location: 'Budhwar Peth, Pune',
    district: 'Pune District',
    description: 'One of the most famous and opulent Ganesha shrines in India, visited by lakhs of devotees especially during the 10-day Ganeshotsav festival.',
    historicalSignificance: 'Established in 1893 by the sweetmaker and merchant Dagadusheth Gadve and his wife Laxmibai after receiving solace from their guru. Lokmanya Tilak actively supported it during the public Ganesh Utsav movement.',
    image: dagadushethImg,
    imageAlt: 'Shreemant Dagadusheth Halwai Ganapati Pune',
    downloadFilename: 'dagadusheth-halwai-ganapati-pune.jpg',
    category: 'famous'
  }
];
