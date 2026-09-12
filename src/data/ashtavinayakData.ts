import mayureshwarImg from '../assets/images/Astavinayak/Astavinayak Ganapati Morgaon.jpg';
import siddhatekImg from '../assets/images/Astavinayak/Astavinayak Ganapati Siddhtek.jpg';
import ballaleshwarImg from '../assets/images/Astavinayak/Astavinayak Ganapti Pali.jpg';
import varadvinayakImg from '../assets/images/Astavinayak/Astavinayak Ganapati Mahad.jpg';
import chintamaniImg from '../assets/images/Astavinayak/Astavinayak Ganapati Theur.jpg';
import girijatmajImg from '../assets/images/Astavinayak/Astavinayak  Ganapati Lenandri.jpg';
import vighneshwarImg from '../assets/images/Astavinayak/Astavinayak Ganapati Ozar.jpg';
import mahaganapatiImg from '../assets/images/Astavinayak/Astavinayak Ganapati Ranjangaon.jpg';
import { AshtavinayakTemple } from '../types.ts';

// Cache-busting key to force browsers and PWA service workers to refresh deity images
const IMAGE_REVISION = '20260911_v2';
const withFreshCache = (url: string) => `${url}${url.includes('?') ? '&' : '?'}v=${IMAGE_REVISION}`;

export const ASHTAVINAYAK_TEMPLES: AshtavinayakTemple[] = [
  {
    order: 1,
    id: 'mayureshwar-morgaon',
    name: '१. श्री मयूरेश्वर (मोरेश्वर) - मोरगाव',
    deity: 'श्री मयूरेश्वर (Shree Mayureshwar)',
    location: 'Morgaon, Baramati',
    district: 'Pune District',
    description: 'The starting and concluding destination of the holy Ashtavinayak Yatra pilgrimage circuit. Built in the 14th century with majestic black stone ramparts reminiscent of an ancient fortress with four minarets symbolizing the four Yugas.',
    legend: 'Lord Ganesha mounted a celestial peacock (Mayura) and vanquished the demon Sindhu here. The self-manifested idol has three eyes and left-turned trunk embedded with precious diamonds.',
    image: withFreshCache(mayureshwarImg),
    downloadFilename: 'Astavinayak Ganapati Morgaon.jpg',
    folderFileName: 'Astavinayak Ganapati Morgaon.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Shree+Mayureshwar+Ganapati+Temple+Morgaon',
    googleCoordinates: {
      lat: 18.2755,
      lng: 74.3168
    },
    googleAddress: 'Shree Mayureshwar Temple, Morgaon, Baramati, Pune, Maharashtra 412304'
  },
  {
    order: 2,
    id: 'siddhivinayak-siddhatek',
    name: '२. श्री सिद्धिविनायक - सिद्धटेक',
    deity: 'श्री सिद्धिविनायक (Shree Siddhivinayak)',
    location: 'Siddhatek, Daund/Karjat',
    district: 'Ahilyanagar (Ahmednagar) District',
    description: 'Perched atop a hillock alongside the serene waters of the Bhima River. The shrine was constructed by the illustrious Maratha Queen Devi Ahilyabai Holkar of Indore.',
    legend: 'Lord Vishnu performed severe penance here to invoke Lord Ganesha, attaining supreme Siddhis (divine cosmic powers) before vanquishing the demons Madhu and Kaitabha. The trunk turns towards the right.',
    image: withFreshCache(siddhatekImg),
    downloadFilename: 'Astavinayak Ganapati Siddhtek.jpg',
    folderFileName: 'Astavinayak Ganapati Siddhtek.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Shree+Siddhivinayak+Temple+Siddhatek',
    googleCoordinates: {
      lat: 18.5284,
      lng: 74.8465
    },
    googleAddress: 'Shree Siddhivinayak Temple, Siddhatek, Karjat, Ahilyanagar, Maharashtra 414403'
  },
  {
    order: 3,
    id: 'ballaleshwar-pali',
    name: '३. श्री बल्लाळेश्वर - पाली',
    deity: 'श्री बल्लाळेश्वर (Shree Ballaleshwar)',
    location: 'Pali, Sudhagad',
    district: 'Raigad District',
    description: 'The only Ganesha temple in the world named after a devoted child bhakta (Ballal). Constructed in the shape of the Devanagari sacred letter "Shree" (श्री) flanked by Saraswati and Amba rivers.',
    legend: 'Young Ballal\'s pure, unwavering devotion compelled Lord Ganesha to manifest permanently as a stone murti dressed in Brahmin attire, promising that his devotee\'s name would forever precede his own.',
    image: withFreshCache(ballaleshwarImg),
    downloadFilename: 'Astavinayak Ganapti Pali.jpg',
    folderFileName: 'Astavinayak Ganapti Pali.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Shree+Ballaleshwar+Devalaya+Pali',
    googleCoordinates: {
      lat: 18.5372,
      lng: 73.2208
    },
    googleAddress: 'Shree Ballaleshwar Devasthan, Pali, Sudhagad, Raigad, Maharashtra 410205'
  },
  {
    order: 4,
    id: 'varadvinayak-mahad',
    name: '४. श्री वरदविनायक - महड',
    deity: 'श्री वरदविनायक (Shree Varadavinayak)',
    location: 'Mahad, Khalapur',
    district: 'Raigad District',
    description: 'Renowned for its holy Nandadeep – an eternal brass oil lamp that has been burning continuously without extinguishment since the year 1892. Devotees can enter the inner sanctum to personally offer worship.',
    legend: 'Prince Rukmangada worshipped Lord Ganesha here to receive forgiveness and royal boons (Varada). The east-facing idol is self-originated with a left-turned trunk.',
    image: withFreshCache(varadvinayakImg),
    downloadFilename: 'Astavinayak Ganapati Mahad.jpg',
    folderFileName: 'Astavinayak Ganapati Mahad.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Shree+Varadvinayak+Temple+Mahad',
    googleCoordinates: {
      lat: 18.8267,
      lng: 73.3072
    },
    googleAddress: 'Shree Varadvinayak Temple, Mahad, Khalapur, Raigad, Maharashtra 410203'
  },
  {
    order: 5,
    id: 'chintamani-theur',
    name: '५. श्री चिंतामणी - थेऊर',
    deity: 'श्री चिंतामणी (Shree Chintamani)',
    location: 'Theur, Haveli',
    district: 'Pune District',
    description: 'Located at the sacred confluence of the Mula, Mutha, and Bhima rivers. It served as the spiritual solace and meditation sanctuary of the revered Maratha ruler Madhavrao Peshwa I.',
    legend: 'Lord Ganesha retrieved the sacred wish-fulfilling gem (Chintamani Ratna) from the arrogant king Gana and restored it to Sage Kapila. Devotees attain supreme peace of mind and relief from all anxieties here.',
    image: withFreshCache(chintamaniImg),
    downloadFilename: 'Astavinayak Ganapati Theur.jpg',
    folderFileName: 'Astavinayak Ganapati Theur.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Shree+Chintamani+Temple+Theur',
    googleCoordinates: {
      lat: 18.5262,
      lng: 74.0537
    },
    googleAddress: 'Shree Chintamani Temple, Theur, Haveli, Pune, Maharashtra 412110'
  },
  {
    order: 6,
    id: 'girijatmaj-lenyadri',
    name: '६. श्री गिरिजात्मज - लेण्याद्री',
    deity: 'श्री गिरिजात्मज (Shree Girijatmaj)',
    location: 'Lenyadri Caves, Junnar',
    district: 'Pune District',
    description: 'The only Ashtavinayak shrine situated in a mountain rock-cut cave (Cave 7 of 30 ancient rock caves). Devotees climb 283 steep stone steps carved into the cliff face overlooking picturesque Junnar valleys.',
    legend: 'Goddess Girija (Parvati) performed 12 years of severe austerities on this mountain to give birth to Lord Ganesha as her divine son (Girijatmaj). The temple has no electrical lighting, bathed purely in natural sunlight.',
    image: withFreshCache(girijatmajImg),
    downloadFilename: 'Astavinayak  Ganapati Lenandri.jpg',
    folderFileName: 'Astavinayak  Ganapati Lenandri.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Girijatmaj+Ganapati+Temple+Lenyadri+Caves',
    googleCoordinates: {
      lat: 19.2407,
      lng: 73.8824
    },
    googleAddress: 'Girijatmaj Temple, Lenyadri Caves (Cave 7), Junnar, Pune, Maharashtra 410502'
  },
  {
    order: 7,
    id: 'vighnahar-ozar',
    name: '७. श्री विघ्नेश्वर - ओझर',
    deity: 'श्री विघ्नेश्वर (Shree Vighneshwar)',
    location: 'Ozar, Junnar',
    district: 'Pune District',
    description: 'Standing gracefully on the banks of the Kukadi River, featuring a magnificent golden dome (Shikhara) and deepastambhas (lamp towers) built by Chimaji Appa after his victory over the Portuguese at Vasai.',
    legend: 'Lord Ganesha defeated the demon of obstacles, Vighnasura, who surrendered and begged the Lord to reside here bearing his name as Vighneshwar (The Slayer of Obstacles). The idol is adorned with precious jewels in its navel and eyes.',
    image: withFreshCache(vighneshwarImg),
    downloadFilename: 'Astavinayak Ganapati Ozar.jpg',
    folderFileName: 'Astavinayak Ganapati Ozar.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Shree+Vighnahar+Ganapati+Temple+Ozar',
    googleCoordinates: {
      lat: 19.1917,
      lng: 73.9575
    },
    googleAddress: 'Shree Vighneshwar Temple, Ozar, Junnar, Pune, Maharashtra 410504'
  },
  {
    order: 8,
    id: 'mahaganapati-ranjangaon',
    name: '८. श्री महागणपती - रांजणगाव',
    deity: 'श्री महागणपती (Shree Mahaganapati)',
    location: 'Ranjangaon, Shirur',
    district: 'Pune District',
    description: 'The monumental shrine facing east, designed such that during the Uttarayan solstice the morning rays of the sun fall directly upon the divine feet of the deity.',
    legend: 'Lord Shiva invoked Mahaganapati with ten trunks and twenty arms before embarking to slay the invincible demon Tripurasura. Concludes the sacred Ashtavinayak Yatra before returning to Morgaon.',
    image: withFreshCache(mahaganapatiImg),
    downloadFilename: 'Astavinayak Ganapati Ranjangaon.jpg',
    folderFileName: 'Astavinayak Ganapati Ranjangaon.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Shree+Mahaganapati+Temple+Ranjangaon',
    googleCoordinates: {
      lat: 18.7553,
      lng: 74.2428
    },
    googleAddress: 'Shree Mahaganapati Temple, Pune-Ahmednagar Highway, Ranjangaon, Shirur, Pune, Maharashtra 412209'
  }
];
