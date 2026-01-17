import { useEffect, useState } from 'react';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const { MapContainer, TileLayer, Marker, Popup } = ReactLeaflet;

const Map = ({ children, className = '', width = '100%', height = '600px', ...rest }) => {
  const [buildings, setBuildings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBuildings = async () => {
      try {
        const data = await window.fs.readFile('buildings.json', { encoding: 'utf8' });
        setBuildings(JSON.parse(data));
        setLoading(false);
      } catch (err) {
        console.error('Error loading buildings:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    loadBuildings();
  }, []);

  useEffect(() => {
    delete Leaflet.Icon.Default.prototype._getIconUrl;
    Leaflet.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  if (loading) return <div>Loading map...</div>;
  if (error) return <div>Error loading buildings: {error}</div>;

  return (
    <div style={{ width, height }} className={className}>
      <MapContainer 
        center={[45.4215, -75.6972]} 
        zoom={15} 
        style={{ width: '100%', height: '100%' }}
        {...rest}
      >
        {children ? children(ReactLeaflet, Leaflet, buildings) : (
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;