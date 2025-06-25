import { rawLocations } from './locations';

export type MarkerItem = {
  id: string;
  name: string;
  address: string;
  position: google.maps.LatLngLiteral;
  type: 'pin' | 'html';
  zIndex: number;
};

export function getData(): MarkerItem[] {
  return rawLocations.map((loc, index) => ({
    id: loc.id,
    name: loc.name,
    address: loc.address,
    position: { lat: loc.lat, lng: loc.lng },
    // Distinct type for Food 4 Less
    type: loc.name.toLowerCase().includes('food 4 less') ? 'pin' : 'html',
    zIndex: index,
  }));
}
