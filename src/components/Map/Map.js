import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import data from '@/data/buildings.json';

const buildings = data.buildings;

const Map = () => {
  return (
    <MapContainer
      center={[45.4215, -75.6972]}
      zoom={15}
      style={{ width: '100%', height: '600px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {buildings.map((b) => (
        <Marker
          key={b.id}
          position={[b.coordinates.lat, b.coordinates.lng]}
        >
          <Popup>
            <strong>{b.name}</strong><br />
            {b.type}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
