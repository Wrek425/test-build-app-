export interface Hotspot {
  id: string;
  x: number;
  y: number;
  type: 'issue' | 'note';
  title: string;
  description: string;
  createdAt: string;
  createdBy: string;
  status: 'open' | 'in-progress' | 'resolved';
}

export interface Location {
  id: string;
  name: string;
  imageUrl: string;
  coordinates: {
    x: number;
    y: number;
  };
  hotspots: Hotspot[];
}