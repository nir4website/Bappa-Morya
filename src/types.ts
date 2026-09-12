export interface GanapatiTemple {
  id: string;
  name: string;
  nameEn: string;
  location: string;
  district: string;
  description: string;
  historicalSignificance: string;
  image: string;
  imageAlt: string;
  downloadFilename: string;
  category: 'famous' | 'ashtavinayak' | 'coastal';
}

export interface AshtavinayakTemple {
  id: string;
  order: number;
  name: string;
  deity: string;
  location: string;
  district: string;
  description: string;
  legend: string;
  image: string;
  downloadFilename: string;
  folderFileName: string;
  googleMapsUrl: string;
  googleCoordinates: {
    lat: number;
    lng: number;
  };
  googleAddress: string;
}

export interface AartiItem {
  id: string;
  title: string;
  subTitle: string;
  category: 'ganapati' | 'devi' | 'shankar' | 'bhakti' | 'mantra';
  composer?: string;
  lyrics: string[];
  meaning?: string;
  duration?: string;
}

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info';
}
