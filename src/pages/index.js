import Head from 'next/head';
import dynamic from 'next/dynamic';
import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import styles from '@styles/Home.module.scss';
import buildingsData from '../data/buildings.json';

// Import Map with SSR disabled
const Map = dynamic(() => import('@components/Map'), {
  ssr: false,
  loading: () => <p>Loading map...</p>
});

// Import CampusNavigation with SSR disabled
const CampusNavigation = dynamic(() => import('@components/CampusNavigation'), {
  ssr: false,
  loading: () => <p>Loading navigation...</p>
});

const DEFAULT_CENTER = [45.4235, -75.684];

export default function Home() {
  const buildings = buildingsData.buildings;
  
  return (
    <Layout>
      <Head>
        <title>uOttawa Campus Map</title>
        <meta name="description" content="University of Ottawa Campus Buildings Map" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Navigation Section */}
      <Section>
        <Container>
          <h1 className={styles.title}>
            University of Ottawa Campus
          </h1>
          <CampusNavigation />
        </Container>
      </Section>

      {/* Map Section */}
      <Section>
        <Container>
          <h2 className={styles.title}>Campus Map</h2>
          <Map 
            className={styles.homeMap} 
            width="100%" 
            height="600px" 
            center={DEFAULT_CENTER} 
            zoom={16}
          >
            {({ TileLayer, Marker, Popup }) => (
              <>
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
                      <strong>{b.name} ({b.abbreviation})</strong>
                      <br />
                      {b.type.join(", ")}
                      <br />
                      <small>{b.description}</small>
                    </Popup>
                  </Marker>
                ))}
              </>
            )}
          </Map>
        </Container>
      </Section>
    </Layout>
  );
}