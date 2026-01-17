import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import data from '@/data/buildings.json';

const buildings = data.buildings;

const Map = () => {
  // Fix for Leaflet marker icons in Next.js
  useEffect(() => {
    delete Leaflet.Icon.Default.prototype._getIconUrl;
    Leaflet.Icon.Default.mergeOptions({
      iconRetinaUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer
      center={[45.4215, -75.6824]} // slightly moved right from original
      zoom={16}
      style={{ width: '100%', height: '600px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {buildings.map((b) => (
        <Marker
          key={b.id}
          position={[b.coordinates.lat, b.coordinates.lng]}
        >
          <Popup>
            <strong>{b.name}</strong><br />
            {b.type.join(', ')}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
