import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import CampusNavigation from '@components/CampusNavigation';
import styles from './Layout.module.scss';

export default function NavigationPage() {
  return (
    <Layout>
      <CampusNavigation />
    </Layout>
  );
}

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};