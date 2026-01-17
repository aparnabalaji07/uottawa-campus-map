import Map from "@/components/Map/DynamicMap";
import buildings from "@/data/buildings.json";

export default function HomePage(){
    return (
        <div style={{ width: "100%", height: "600px" }}>
      <Map center={[45.4235, -75.684]} zoom={16}>
        {(ReactLeaflet, Leaflet) => {
          const { Marker, Popup } = ReactLeaflet;

          return buildings.map((b) => (
            <Marker
              key={b.id}
              position={[b.coordinates.lat, b.coordinates.lng]}
            >
              <Popup>
                <strong>{b.name} ({b.code})</strong>
                <br />
                {b.type}
              </Popup>
            </Marker>
          ));
        }}
      </Map>
    </div>
    )
}