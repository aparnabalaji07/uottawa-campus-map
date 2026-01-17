import Head from 'next/head';
import dynamic from 'next/dynamic';
import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';

const CampusNavigation = dynamic(() => import('@components/CampusNavigation'), {
  ssr: false,
  loading: () => <p>Loading navigation...</p>
});

export default function NavigatePage() {
  return (
    <Layout>
      <Head>
        <title>Campus Navigation - uOttawa</title>
        <meta name="description" content="Get walking directions across uOttawa campus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Section>
        <Container>
          <CampusNavigation />
        </Container>
      </Section>
    </Layout>
  );
}